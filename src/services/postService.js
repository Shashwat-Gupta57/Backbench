import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, update, query, orderByChild, equalTo, limitToLast, onValue, off, remove, runTransaction } from 'firebase/database';
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
    callback(posts.reverse());
  });

  return () => off(postsQuery, 'value', listener);
}

export function subscribeToUserPosts(uid, callback) {
  if (!uid) {
    callback([]);
    return () => {};
  }

  const postsQuery = query(
    ref(db, PATHS.POSTS),
    orderByChild('authorId'),
    equalTo(uid)
  );

  const listener = onValue(postsQuery, (snapshot) => {
    const posts = [];
    snapshot.forEach((childSnap) => {
      posts.push(childSnap.val());
    });
    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    callback(posts);
  }, (err) => {
    console.error('Error fetching user posts:', err);
    callback([]);
  });

  return () => off(postsQuery, 'value', listener);
}

// Caching user profiles to avoid unnecessary refetches
const userCache = {};

export function invalidateUserCache(uid) {
  if (uid) delete userCache[uid];
}

export async function getUserProfile(uid) {
  if (!uid) return null;
  if (userCache[uid]) return userCache[uid];

  try {
    const snap = await get(ref(db, `${PATHS.USERS}/${uid}`));
    if (snap.exists()) {
      userCache[uid] = snap.val();
      return userCache[uid];
    }
  } catch (err) {
    console.error('Error fetching user profile:', err);
  }

  // Fallback for current logged-in user if DB node hasn't been created yet
  const currentUser = auth.currentUser;
  if (currentUser && currentUser.uid === uid) {
    const fallbackProfile = {
      uid: currentUser.uid,
      username: currentUser.email ? currentUser.email.split('@')[0] : 'student',
      name: currentUser.displayName || 'Student',
      email: currentUser.email || '',
      class: 'N/A',
      admissionNumber: 'N/A',
      joinedDate: new Date().toISOString(),
      verifiedStudent: false,
      role: 'student',
      postCount: 0,
      replyCount: 0,
      likesReceived: 0,
      profilePicture: currentUser.photoURL || ''
    };
    return fallbackProfile;
  }

  return null;
}

export async function updateUserProfile(uid, updateData) {
  if (!uid) return;
  await update(ref(db, `${PATHS.USERS}/${uid}`), updateData);
  invalidateUserCache(uid);
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
    await remove(likeRef);
    nowLiked = false;
  } else {
    await set(likeRef, true);
    nowLiked = true;
  }

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
