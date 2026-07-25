import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, update, query, orderByChild, equalTo, limitToLast, onValue, off, remove, runTransaction } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { extractHashtags } from '../helpers/formatters.js';

export async function createPost(content) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const hashtags = extractHashtags(content);
  const postRef = push(ref(db, PATHS.POSTS));

  const postData = {
    postId: postRef.key,
    authorId: user.uid,
    content: content,
    hashtags: hashtags,
    timestamp: new Date().toISOString(),
    status: 'ACTIVE',
    reportCount: 0,
    edited: false,
    likes: 0,
    reshares: 0,
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
      const p = childSnap.val();
      if (p.status !== 'AWAITING_MODERATION') {
        posts.push(p);
      }
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

export async function getTrendingHashtags(limit = 5) {
  try {
    const snap = await get(ref(db, PATHS.POSTS));
    if (!snap.exists()) return [];

    const counts = {};
    snap.forEach((childSnap) => {
      const p = childSnap.val();
      if (p.status !== 'AWAITING_MODERATION') {
        let tags = p.hashtags;
        if (!tags && p.content) {
          tags = extractHashtags(p.content);
        }
        if (tags && Array.isArray(tags)) {
          tags.forEach(t => {
            counts[t] = (counts[t] || 0) + 1;
          });
        }
      }
    });

    const list = Object.keys(counts).map(tag => ({
      tag,
      count: counts[tag]
    }));

    list.sort((a, b) => b.count - a.count);
    return list.slice(0, limit);
  } catch (err) {
    console.error('Error getting trending hashtags:', err);
    return [];
  }
}

export async function getRelatedPosts(currentPostId, currentTags = [], limit = 4) {
  try {
    const snap = await get(ref(db, PATHS.POSTS));
    if (!snap.exists()) return [];

    const related = [];
    snap.forEach((childSnap) => {
      const p = childSnap.val();
      if (p.postId !== currentPostId && p.status !== 'AWAITING_MODERATION') {
        let tags = p.hashtags;
        if (!tags && p.content) tags = extractHashtags(p.content);

        let overlap = 0;
        if (tags && Array.isArray(tags) && currentTags.length > 0) {
          overlap = tags.filter(t => currentTags.includes(t)).length;
        }

        if (overlap > 0 || related.length < limit) {
          related.push({ ...p, score: overlap });
        }
      }
    });

    related.sort((a, b) => b.score - a.score || new Date(b.timestamp) - new Date(a.timestamp));
    return related.slice(0, limit);
  } catch (err) {
    console.error('Error getting related posts:', err);
    return [];
  }
}

// Caching user profiles to avoid unnecessary refetches
const userCache = new Map();

export async function getUserProfile(uid) {
  if (userCache.has(uid)) {
    return userCache.get(uid);
  }

  const userRef = ref(db, `${PATHS.USERS}/${uid}`);
  const snap = await get(userRef);

  if (snap.exists()) {
    const data = snap.val();
    userCache.set(uid, data);
    return data;
  }

  return null;
}

export function invalidateUserCache(uid) {
  userCache.delete(uid);
}

export async function updateUserProfile(uid, data) {
  const currentUid = auth.currentUser?.uid || uid;
  if (!currentUid) throw new Error('Not authenticated');

  const cleanData = {};
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      cleanData[key] = data[key];
    }
  });

  const userRef = ref(db, `${PATHS.USERS}/${currentUid}`);
  await update(userRef, cleanData);
  userCache.delete(currentUid);
}

export async function toggleLikePost(postId) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const likeRef = ref(db, `${PATHS.POST_LIKES}/${postId}/${user.uid}`);
  const snap = await get(likeRef);

  let isLiked = false;

  if (snap.exists()) {
    await remove(likeRef);
    isLiked = false;
  } else {
    await set(likeRef, true);
    isLiked = true;
  }

  const postRef = ref(db, `${PATHS.POSTS}/${postId}`);
  let newLikes = 0;

  await runTransaction(postRef, (post) => {
    if (post) {
      post.likes = isLiked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 0) - 1);
      newLikes = post.likes;
    }
    return post;
  });

  return { liked: isLiked, likes: newLikes };
}

export async function isPostLikedByUser(postId, uid) {
  if (!uid) return false;
  const likeRef = ref(db, `${PATHS.POST_LIKES}/${postId}/${uid}`);
  const snap = await get(likeRef);
  return snap.exists();
}

export async function toggleResharePost(postId) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const reshareRef = ref(db, `${PATHS.POST_RESHARES}/${postId}/${user.uid}`);
  const snap = await get(reshareRef);

  let isReshared = false;

  if (snap.exists()) {
    await remove(reshareRef);
    isReshared = false;
  } else {
    await set(reshareRef, new Date().toISOString());
    isReshared = true;
  }

  const postRef = ref(db, `${PATHS.POSTS}/${postId}`);
  let newReshares = 0;

  await runTransaction(postRef, (post) => {
    if (post) {
      post.reshares = isReshared ? (post.reshares || 0) + 1 : Math.max(0, (post.reshares || 0) - 1);
      newReshares = post.reshares;
    }
    return post;
  });

  return { reshared: isReshared, reshares: newReshares };
}

export async function isPostResharedByUser(postId, uid) {
  if (!uid) return false;
  const reshareRef = ref(db, `${PATHS.POST_RESHARES}/${postId}/${uid}`);
  const snap = await get(reshareRef);
  return snap.exists();
}
