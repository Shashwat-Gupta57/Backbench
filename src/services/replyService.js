import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, onValue, off, remove, runTransaction } from 'firebase/database';
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

export async function createReply(postId, content, parentReplyId = null) {
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
    parentReply: parentReplyId,
    authorId: user.uid,
    content: text,
    timestamp: new Date().toISOString(),
    likes: 0
  };

  await set(replyRef, replyData);

  // Increment replyCount on posts/{postId}
  const postRef = ref(db, `${PATHS.POSTS}/${postId}`);
  let postAuthorId = null;
  let isAnonymous = false;

  await runTransaction(postRef, (post) => {
    if (post) {
      post.replyCount = (post.replyCount || 0) + 1;
      postAuthorId = post.authorId;
      isAnonymous = post.isAnonymous;
    }
    return post;
  });

  // Notify authors
  const { sendNotification } = await import('./notificationService.js');
  const { getUserProfile } = await import('./postService.js');
  
  let senderName = 'Someone';
  if (!isAnonymous) {
    const myProfile = await getUserProfile(user.uid);
    senderName = myProfile?.name || 'A student';
  }

  const uidsToNotify = new Set();
  
  if (postAuthorId && postAuthorId !== user.uid) {
    uidsToNotify.add(postAuthorId);
  }

  if (parentReplyId) {
    const parentReplySnap = await get(ref(db, `${PATHS.REPLIES}/${postId}/${parentReplyId}`));
    if (parentReplySnap.exists()) {
      const parentReplyAuthorId = parentReplySnap.val().authorId;
      if (parentReplyAuthorId && parentReplyAuthorId !== user.uid) {
        uidsToNotify.add(parentReplyAuthorId);
      }
    }
  }

  for (const uidToNotify of uidsToNotify) {
    await sendNotification(uidToNotify, {
      text: `${senderName} replied to your post.`,
      type: 'SYSTEM',
      postId: postId,
      senderId: user.uid
    });
  }

  return replyData;
}

export async function editReply(postId, replyId, newContent) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const text = newContent ? newContent.trim() : '';
  if (!text) throw new Error('Reply cannot be empty');

  const replySnap = await get(ref(db, `${PATHS.REPLIES}/${postId}/${replyId}`));
  if (!replySnap.exists()) throw new Error('Reply not found');

  const reply = replySnap.val();
  if (reply.authorId !== user.uid) {
    throw new Error('Unauthorized: You can only edit your own replies.');
  }

  await update(ref(db, `${PATHS.REPLIES}/${postId}/${replyId}`), {
    content: text,
    edited: true,
    updatedAt: new Date().toISOString()
  });

  return true;
}

export function subscribeToReplies(postId, callback) {
  const repliesRef = ref(db, `${PATHS.REPLIES}/${postId}`);

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

export async function getReplyById(postId, replyId) {
  try {
    const snap = await get(ref(db, `${PATHS.REPLIES}/${postId}/${replyId}`));
    return snap.exists() ? snap.val() : null;
  } catch (err) {
    return null;
  }
}

export async function isReplySaved(replyId) {
  const user = auth.currentUser;
  if (!user) return false;
  try {
    const snap = await get(ref(db, `${PATHS.SAVED_REPLIES}/${user.uid}/${replyId}`));
    return snap.exists();
  } catch (err) {
    return false;
  }
}

export async function toggleSavedReply(replyId, postId) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const savedRef = ref(db, `${PATHS.SAVED_REPLIES}/${user.uid}/${replyId}`);
  const snap = await get(savedRef);

  if (snap.exists()) {
    await remove(savedRef);
    return false;
  } else {
    await set(savedRef, {
      replyId,
      postId,
      timestamp: new Date().toISOString()
    });
    return true;
  }
}

export async function getSavedReplies(targetUid) {
  try {
    const snap = await get(ref(db, `${PATHS.SAVED_REPLIES}/${targetUid}`));
    if (!snap.exists()) return [];

    const savedMap = snap.val();
    const replyIds = Object.keys(savedMap);
    const replies = [];
    for (const rid of replyIds) {
      const pid = savedMap[rid].postId;
      const r = await getReplyById(pid, rid);
      if (r) {
        replies.push({ ...r, _savedTimestamp: savedMap[rid].timestamp });
      }
    }
    replies.sort((a, b) => new Date(b._savedTimestamp || 0) - new Date(a._savedTimestamp || 0));
    return replies;
  } catch (err) {
    console.error('Error fetching saved replies:', err);
    return [];
  }
}
