import { db, auth } from '../firebase/firebase.js';
import { ref, get, set, remove, update } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { ROLES } from '../constants/roles.js';
import { invalidateUserCache } from './postService.js';

export async function getCampusAnalyticsStats() {
  try {
    const usersSnap = await get(ref(db, PATHS.USERS));
    const postsSnap = await get(ref(db, PATHS.POSTS));
    const repliesSnap = await get(ref(db, PATHS.REPLIES));
    const likesSnap = await get(ref(db, PATHS.POST_LIKES));
    const petitionsSnap = await get(ref(db, PATHS.PETITIONS));
    const pollsSnap = await get(ref(db, PATHS.POLLS));

    const totalUsers = usersSnap.exists() ? Object.keys(usersSnap.val()).length : 0;
    const totalPosts = postsSnap.exists() ? Object.keys(postsSnap.val()).length : 0;

    let totalReplies = 0;
    if (repliesSnap.exists()) {
      const allReplies = repliesSnap.val();
      Object.values(allReplies).forEach(postReplies => {
        totalReplies += Object.keys(postReplies).length;
      });
    }

    let totalLikes = 0;
    if (likesSnap.exists()) {
      const allLikes = likesSnap.val();
      Object.values(allLikes).forEach(postLikes => {
        totalLikes += Object.keys(postLikes).length;
      });
    }

    const totalPetitions = petitionsSnap.exists() ? Object.keys(petitionsSnap.val()).length : 0;
    const totalPolls = pollsSnap.exists() ? Object.keys(pollsSnap.val()).length : 0;

    return {
      totalUsers,
      totalPosts,
      totalReplies,
      totalLikes,
      totalPetitions,
      totalPolls
    };
  } catch (err) {
    console.error('Error getting analytics stats:', err);
    return { totalUsers: 0, totalPosts: 0, totalReplies: 0, totalLikes: 0, totalPetitions: 0, totalPolls: 0 };
  }
}

export async function getAllUsersRoster() {
  try {
    const snap = await get(ref(db, PATHS.USERS));
    if (snap.exists()) {
      const usersMap = snap.val();
      const usersList = Object.values(usersMap);
      usersList.sort((a, b) => new Date(b.joinedDate || 0) - new Date(a.joinedDate || 0));
      return usersList;
    }
  } catch (err) {
    console.error('Error getting users roster:', err);
  }
  return [];
}

export async function setUserRole(targetUid, newRole) {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) throw new Error('Not authenticated');

  // Verify current user is admin
  const adminSnap = await get(ref(db, `${PATHS.USERS}/${currentUid}`));
  const currentUser = adminSnap.exists() ? adminSnap.val() : null;

  if (!currentUser || currentUser.role !== ROLES.ADMIN) {
    throw new Error('Unauthorized: Only Master Admin can appoint or demote staff.');
  }

  await update(ref(db, `${PATHS.USERS}/${targetUid}`), { role: newRole });
  invalidateUserCache(targetUid);
  return true;
}

export async function toggleUserSuspension(targetUid) {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) throw new Error('Not authenticated');

  const userSnap = await get(ref(db, `${PATHS.USERS}/${targetUid}`));
  if (!userSnap.exists()) throw new Error('User not found');

  const targetUser = userSnap.val();
  const newSuspended = !targetUser.isSuspended;

  await update(ref(db, `${PATHS.USERS}/${targetUid}`), { isSuspended: newSuspended });
  invalidateUserCache(targetUid);
  return newSuspended;
}

export async function deletePostAsStaff(postId) {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) throw new Error('Not authenticated');

  const staffSnap = await get(ref(db, `${PATHS.USERS}/${currentUid}`));
  const staffUser = staffSnap.exists() ? staffSnap.val() : null;

  if (!staffUser || (staffUser.role !== ROLES.STAFF && staffUser.role !== ROLES.ADMIN)) {
    throw new Error('Unauthorized: Staff power required to put down posts.');
  }

  // Remove post node and post replies
  await remove(ref(db, `${PATHS.POSTS}/${postId}`));
  await remove(ref(db, `${PATHS.REPLIES}/${postId}`));
  await remove(ref(db, `${PATHS.POST_LIKES}/${postId}`));
  await remove(ref(db, `${PATHS.POST_RESHARES}/${postId}`));
  return true;
}

export async function deleteReplyAsStaff(postId, replyId) {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) throw new Error('Not authenticated');

  const staffSnap = await get(ref(db, `${PATHS.USERS}/${currentUid}`));
  const staffUser = staffSnap.exists() ? staffSnap.val() : null;

  if (!staffUser || (staffUser.role !== ROLES.STAFF && staffUser.role !== ROLES.ADMIN)) {
    throw new Error('Unauthorized: Staff power required to put down replies.');
  }

  await remove(ref(db, `${PATHS.REPLIES}/${postId}/${replyId}`));
  return true;
}
