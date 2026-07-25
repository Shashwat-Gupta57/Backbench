import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, onValue, off, runTransaction } from 'firebase/database';
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

  const listener = onValue(pollsRef, (snapshot) => {
    const polls = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnap) => {
        const p = childSnap.val();
        if (p) polls.push(p);
      });
    }
    polls.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
    callback(polls.slice(0, limit));
  });

  return () => off(pollsRef, 'value', listener);
}
