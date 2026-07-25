import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, query, orderByChild, limitToLast, onValue, off, runTransaction } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';

export async function createPoll(question, optionTexts) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  if (!question || question.trim().length === 0) {
    throw new Error('Poll question cannot be empty');
  }

  const validOptions = optionTexts.filter(opt => opt && opt.trim().length > 0);
  if (validOptions.length < 2 || validOptions.length > 4) {
    throw new Error('Polls must have between 2 and 4 options');
  }

  const pollRef = push(ref(db, PATHS.POLLS));
  const pollData = {
    pollId: pollRef.key,
    creatorId: user.uid,
    question: question.trim(),
    options: validOptions.map((text, idx) => ({
      id: idx,
      text: text.trim(),
      votes: 0
    })),
    timestamp: new Date().toISOString(),
    totalVotes: 0,
    active: true
  };

  await set(pollRef, pollData);
  return pollData;
}

export async function getUserVote(pollId, uid) {
  if (!uid) return null;
  const voteSnap = await get(ref(db, `${PATHS.POLL_VOTES}/${pollId}/${uid}`));
  if (voteSnap.exists()) {
    return voteSnap.val(); // Returns option index e.g. 0, 1, 2...
  }
  return null;
}

export async function voteInPoll(pollId, optionIndex) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const voteRef = ref(db, `${PATHS.POLL_VOTES}/${pollId}/${user.uid}`);
  const existingVoteSnap = await get(voteRef);

  if (existingVoteSnap.exists()) {
    throw new Error('You have already voted in this poll');
  }

  // Record vote for this user
  await set(voteRef, optionIndex);

  // Update option vote count & total votes via transaction
  const pollRef = ref(db, `${PATHS.POLLS}/${pollId}`);
  await runTransaction(pollRef, (currentPoll) => {
    if (currentPoll) {
      if (!currentPoll.options) currentPoll.options = [];
      if (currentPoll.options[optionIndex]) {
        currentPoll.options[optionIndex].votes = (currentPoll.options[optionIndex].votes || 0) + 1;
      }
      currentPoll.totalVotes = (currentPoll.totalVotes || 0) + 1;
    }
    return currentPoll;
  });
}

export function subscribeToPolls(limit = 20, callback) {
  const pollsQuery = query(
    ref(db, PATHS.POLLS),
    orderByChild('timestamp'),
    limitToLast(limit)
  );

  const listener = onValue(pollsQuery, (snapshot) => {
    const polls = [];
    snapshot.forEach((childSnap) => {
      polls.push(childSnap.val());
    });
    callback(polls.reverse());
  });

  return () => off(pollsQuery, 'value', listener);
}
