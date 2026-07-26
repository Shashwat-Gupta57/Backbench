import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, onValue, off, remove, runTransaction } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';

export async function createPoll(question, options) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  if (!question || question.trim() === '') {
    throw new Error('Poll question is required.');
  }

  if (!options || !Array.isArray(options) || options.length < 2) {
    throw new Error('At least 2 poll options are required.');
  }

  const pollRef = push(ref(db, PATHS.POLLS));
  const formattedOptions = options.map((optText, index) => ({
    id: index,
    text: optText,
    votes: 0
  }));

  const pollData = {
    pollId: pollRef.key,
    creatorId: user.uid,
    question: question,
    options: formattedOptions,
    totalVotes: 0,
    likes: 0,
    reshares: 0,
    replyCount: 0,
    timestamp: new Date().toISOString()
  };

  await set(pollRef, pollData);
  return pollData;
}

export async function getUserVote(pollId, uid) {
  if (!uid || !pollId) return null;
  const voteRef = ref(db, `${PATHS.POLL_VOTES}/${pollId}/${uid}`);
  const snap = await get(voteRef);
  if (snap.exists()) {
    return snap.val(); // Returns option index
  }
  return null;
}

export async function voteInPoll(pollId, optionIndex) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const voteRef = ref(db, `${PATHS.POLL_VOTES}/${pollId}/${user.uid}`);
  const snap = await get(voteRef);

  if (snap.exists()) {
    throw new Error('You have already voted in this poll.');
  }

  // Record user vote
  await set(voteRef, optionIndex);

  // Atomically increment option vote & total votes
  const pollRef = ref(db, `${PATHS.POLLS}/${pollId}`);
  await runTransaction(pollRef, (currentPoll) => {
    if (currentPoll) {
      if (currentPoll.options && currentPoll.options[optionIndex]) {
        currentPoll.options[optionIndex].votes = (currentPoll.options[optionIndex].votes || 0) + 1;
      }
      currentPoll.totalVotes = (currentPoll.totalVotes || 0) + 1;
    }
    return currentPoll;
  });
}

export function subscribeToPolls(limit = 20, callback) {
  const pollsRef = ref(db, PATHS.POLLS);

  const fetchPolls = async () => {
    try {
      const snapshot = await get(pollsRef);
      const polls = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnap) => {
          const p = childSnap.val();
          if (p) polls.push(p);
        });
      }
      polls.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
      callback(polls.slice(0, limit));
    } catch (err) {
      console.error('Error fetching polls:', err);
    }
  };

  fetchPolls();
  const intervalId = setInterval(fetchPolls, 10000);

  return () => clearInterval(intervalId);
}

// ---- Poll Like / Reshare / Reply ----

export async function toggleLikePoll(pollId) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const likeRef = ref(db, `${PATHS.POLL_LIKES}/${pollId}/${user.uid}`);
  const snap = await get(likeRef);
  let isLiked = false;

  if (snap.exists()) {
    await remove(likeRef);
    isLiked = false;
  } else {
    await set(likeRef, true);
    isLiked = true;
  }

  const pollRef = ref(db, `${PATHS.POLLS}/${pollId}`);
  let newLikes = 0;
  await runTransaction(pollRef, (poll) => {
    if (poll) {
      poll.likes = isLiked ? (poll.likes || 0) + 1 : Math.max(0, (poll.likes || 0) - 1);
      newLikes = poll.likes;
    }
    return poll;
  });

  return { liked: isLiked, likes: newLikes };
}

export async function isPollLikedByUser(pollId, uid) {
  if (!uid || !pollId) return false;
  const snap = await get(ref(db, `${PATHS.POLL_LIKES}/${pollId}/${uid}`));
  return snap.exists();
}

export async function toggleResharePoll(pollId) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const reshareRef = ref(db, `${PATHS.POLL_RESHARES}/${pollId}/${user.uid}`);
  const snap = await get(reshareRef);
  let isReshared = false;

  if (snap.exists()) {
    await remove(reshareRef);
    isReshared = false;
  } else {
    await set(reshareRef, new Date().toISOString());
    isReshared = true;
  }

  const pollRef = ref(db, `${PATHS.POLLS}/${pollId}`);
  let newReshares = 0;
  await runTransaction(pollRef, (poll) => {
    if (poll) {
      poll.reshares = isReshared ? (poll.reshares || 0) + 1 : Math.max(0, (poll.reshares || 0) - 1);
      newReshares = poll.reshares;
    }
    return poll;
  });

  return { reshared: isReshared, reshares: newReshares };
}

export async function isPollResharedByUser(pollId, uid) {
  if (!uid || !pollId) return false;
  const snap = await get(ref(db, `${PATHS.POLL_RESHARES}/${pollId}/${uid}`));
  return snap.exists();
}

export async function createPollReply(pollId, content) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const text = content ? content.trim() : '';
  if (!text) throw new Error('Reply cannot be empty.');

  const replyRef = push(ref(db, `${PATHS.POLL_REPLIES}/${pollId}`));
  const replyData = {
    replyId: replyRef.key,
    parentPoll: pollId,
    authorId: user.uid,
    content: text,
    timestamp: new Date().toISOString(),
    likes: 0
  };

  await set(replyRef, replyData);

  const pollRef = ref(db, `${PATHS.POLLS}/${pollId}`);
  await runTransaction(pollRef, (poll) => {
    if (poll) {
      poll.replyCount = (poll.replyCount || 0) + 1;
    }
    return poll;
  });

  return replyData;
}

export function subscribeToPollReplies(pollId, callback) {
  const repliesRef = ref(db, `${PATHS.POLL_REPLIES}/${pollId}`);
  const listener = onValue(repliesRef, (snapshot) => {
    const replies = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnap) => {
        const item = childSnap.val();
        if (item) replies.push(item);
      });
    }
    replies.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
    callback(replies);
  });

  return () => off(repliesRef, 'value', listener);
}

export async function deleteOwnPoll(pollId) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const pollSnap = await get(ref(db, `${PATHS.POLLS}/${pollId}`));
  if (!pollSnap.exists()) throw new Error('Poll not found');

  const poll = pollSnap.val();
  if (poll.creatorId !== user.uid) {
    throw new Error('Unauthorized: You can only delete your own polls.');
  }

  await remove(ref(db, `${PATHS.POLLS}/${pollId}`));
  await remove(ref(db, `${PATHS.POLL_VOTES}/${pollId}`));
  await remove(ref(db, `${PATHS.POLL_LIKES}/${pollId}`));
  await remove(ref(db, `${PATHS.POLL_RESHARES}/${pollId}`));
  await remove(ref(db, `${PATHS.POLL_REPLIES}/${pollId}`));
  return true;
}

export async function deletePollAsStaff(pollId) {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) throw new Error('Not authenticated');

  const staffSnap = await get(ref(db, `${PATHS.USERS}/${currentUid}`));
  const staffUser = staffSnap.exists() ? staffSnap.val() : null;

  if (!staffUser || (staffUser.role !== 'staff' && staffUser.role !== 'admin')) {
    throw new Error('Unauthorized: Staff power required to put down polls.');
  }

  await remove(ref(db, `${PATHS.POLLS}/${pollId}`));
  await remove(ref(db, `${PATHS.POLL_VOTES}/${pollId}`));
  await remove(ref(db, `${PATHS.POLL_LIKES}/${pollId}`));
  await remove(ref(db, `${PATHS.POLL_RESHARES}/${pollId}`));
  await remove(ref(db, `${PATHS.POLL_REPLIES}/${pollId}`));
  return true;
}

export async function getPollById(pollId) {
  if (!pollId) return null;
  try {
    const snap = await get(ref(db, `${PATHS.POLLS}/${pollId}`));
    if (snap.exists()) {
      return snap.val();
    }
  } catch (err) {
    console.error('Error fetching poll by ID:', err);
  }
  return null;
}


