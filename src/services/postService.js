import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, query, orderByChild, limitToLast, onValue, off, remove, runTransaction } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';

export async function createPost(content) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const postRef = push(ref(db, PATHS.POSTS));
  const postData = {
    postId: postRef.key,
    authorId: user.uid,
    content: content,
    timestamp: new Date().toISOString(),
    edited: false,
    likes: 0,
    replyCount: 0
  };

  await set(postRef, postData);
  return postData;
}

export function subscribeToFeed(limit, callback) {
  const postsQuery = query(
    ref(db, PATHS.POSTS),
    orderByChild('timestamp'),
    limitToLast(limit)
  );

  const listener = onValue(postsQuery, (snapshot) => {
    const posts = [];
    snapshot.forEach((childSnap) => {
      posts.push(childSnap.val());
    });
    // Reverse because limitToLast gets oldest first among the last N
    callback(posts.reverse());
  });

  return () => off(postsQuery, 'value', listener);
}

// Caching user profiles to avoid refetching
const userCache = {};

export async function getUserProfile(uid) {
  if (userCache[uid]) return userCache[uid];
  
  const snap = await get(ref(db, `${PATHS.USERS}/${uid}`));
  if (snap.exists()) {
    userCache[uid] = snap.val();
    return userCache[uid];
  }
  return null;
}

export async function isPostLikedByUser(postId, uid) {
  if (!uid || !postId) return false;
  const snap = await get(ref(db, `${PATHS.POST_LIKES}/${postId}/${uid}`));
  return snap.exists();
}

export async function toggleLikePost(postId) {
  const user = auth.currentUser;
  if (!user) return { liked: false, likes: 0 };

  const likeRef = ref(db, `${PATHS.POST_LIKES}/${postId}/${user.uid}`);
  const postRef = ref(db, `${PATHS.POSTS}/${postId}`);
  const snap = await get(likeRef);

  let nowLiked = false;

  if (snap.exists()) {
    // Already liked -> remove like (Unlike)
    await remove(likeRef);
    nowLiked = false;
  } else {
    // Not liked -> add like (Single vote per user)
    await set(likeRef, true);
    nowLiked = true;
  }

  // Transaction to update per-post likes count atomically
  let updatedLikes = 0;
  await runTransaction(postRef, (post) => {
    if (post) {
      if (nowLiked) {
        post.likes = (post.likes || 0) + 1;
      } else {
        post.likes = Math.max(0, (post.likes || 0) - 1);
      }
      updatedLikes = post.likes;
    }
    return post;
  });

  return { liked: nowLiked, likes: updatedLikes };
}
