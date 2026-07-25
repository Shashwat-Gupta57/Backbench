import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, query, orderByChild, onValue, off, remove, runTransaction } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { LIMITS } from '../constants/limits.js';

export async function getPostById(postId) {
  if (!postId) return null;
  const snap = await get(ref(db, `${PATHS.POSTS}/${postId}`));
  if (snap.exists()) {
    return snap.val();
  }
  return null;
}

export async function createReply(postId, content) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const text = content ? content.trim() : '';
  if (!text) throw new Error('Reply cannot be empty');
  if (text.length > LIMITS.REPLY_MAX_LENGTH) {
    throw new Error(`Reply cannot exceed ${LIMITS.REPLY_MAX_LENGTH} characters`);
  }

  // Push reply into replies/{postId}/{replyId}
  const replyRef = push(ref(db, `${PATHS.REPLIES}/${postId}`));
  const replyData = {
    replyId: replyRef.key,
    parentPost: postId,
    parentReply: null,
    authorId: user.uid,
    content: text,
    timestamp: new Date().toISOString(),
    likes: 0
  };

  await set(replyRef, replyData);

  // Increment replyCount on posts/{postId}
  const postRef = ref(db, `${PATHS.POSTS}/${postId}`);
  await runTransaction(postRef, (post) => {
    if (post) {
      post.replyCount = (post.replyCount || 0) + 1;
    }
    return post;
  });

  return replyData;
}

export function subscribeToReplies(postId, callback) {
  const repliesQuery = query(
    ref(db, `${PATHS.REPLIES}/${postId}`),
    orderByChild('timestamp')
  );

  const listener = onValue(repliesQuery, (snapshot) => {
    const replies = [];
    snapshot.forEach((childSnap) => {
      replies.push(childSnap.val());
    });
    // Most recent replies at the bottom or top depending on convention (Twitter shows oldest first under thread)
    callback(replies);
  });

  return () => off(repliesQuery, 'value', listener);
}

export async function toggleLikeReply(replyId) {
  const user = auth.currentUser;
  if (!user) return;

  const likeRef = ref(db, `${PATHS.REPLY_LIKES}/${replyId}/${user.uid}`);
  const snap = await get(likeRef);

  if (snap.exists()) {
    await remove(likeRef);
  } else {
    await set(likeRef, true);
  }
}
