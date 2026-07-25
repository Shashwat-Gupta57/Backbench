import { db, auth } from '../firebase/firebase.js';
import { ref, get, set, update, remove, runTransaction } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { sendNotification } from './notificationService.js';

export async function reportPost(postId, reason = 'Inappropriate content') {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const reportRef = ref(db, `postReports/${postId}/${user.uid}`);
  const snap = await get(reportRef);

  if (snap.exists()) {
    throw new Error('You have already reported this post.');
  }

  // Save report
  await set(reportRef, {
    uid: user.uid,
    reason: reason,
    timestamp: new Date().toISOString()
  });

  // Increment reportCount atomically on post
  const postRef = ref(db, `${PATHS.POSTS}/${postId}`);
  let newReportCount = 0;
  let authorId = null;

  await runTransaction(postRef, (post) => {
    if (post) {
      post.reportCount = (post.reportCount || 0) + 1;
      newReportCount = post.reportCount;
      authorId = post.authorId;

      // Auto-takedown threshold: >= 2 reports
      if (newReportCount >= 2) {
        post.status = 'AWAITING_MODERATION';
      }
    }
    return post;
  });

  // If auto-takedown threshold reached, notify the post author
  if (newReportCount >= 2 && authorId) {
    await sendNotification(authorId, {
      text: '⚠️ Your post has received 2 community reports and is currently held for review awaiting validation from a Staff member or Admin.',
      type: 'MODERATION',
      postId: postId
    });
  }

  return { reported: true, reportCount: newReportCount, autoTakenDown: newReportCount >= 2 };
}

export async function getReportedPostsQueue() {
  try {
    const snap = await get(ref(db, PATHS.POSTS));
    if (!snap.exists()) return [];

    const queue = [];
    snap.forEach(child => {
      const p = child.val();
      if (p.status === 'AWAITING_MODERATION' || (p.reportCount && p.reportCount > 0)) {
        queue.push(p);
      }
    });

    queue.sort((a, b) => (b.reportCount || 0) - (a.reportCount || 0));
    return queue;
  } catch (err) {
    console.error('Error fetching reported posts queue:', err);
    return [];
  }
}

export async function approveAndReinstatePost(postId) {
  const postRef = ref(db, `${PATHS.POSTS}/${postId}`);
  const snap = await get(postRef);
  if (!snap.exists()) throw new Error('Post not found');

  const post = snap.val();

  // Reset status & report count
  await update(postRef, {
    status: 'ACTIVE',
    reportCount: 0
  });

  // Clear report node
  await remove(ref(db, `postReports/${postId}`));

  // Notify author
  if (post.authorId) {
    await sendNotification(post.authorId, {
      text: '✓ Your post has been reviewed and approved by Staff. It is now active on Backbench.',
      type: 'MODERATION',
      postId: postId
    });
  }

  return true;
}
