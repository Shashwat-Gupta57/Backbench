import { db, auth } from '../firebase/firebase.js';
import { ref, set, get, remove } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { getUserProfile } from './postService.js';

export async function isFriend(targetUid) {
  const user = auth.currentUser;
  if (!user || !targetUid) return false;
  try {
    const snap = await get(ref(db, `${PATHS.FRIENDS}/${user.uid}/${targetUid}`));
    return snap.exists();
  } catch (err) {
    console.error('Error checking friend status:', err);
    return false;
  }
}

export async function toggleAddFriend(targetUid) {
  const user = auth.currentUser;
  if (!user || !targetUid) return false;
  if (user.uid === targetUid) throw new Error("You cannot add yourself as a friend.");

  const myFriendRef = ref(db, `${PATHS.FRIENDS}/${user.uid}/${targetUid}`);
  const targetFriendRef = ref(db, `${PATHS.FRIENDS}/${targetUid}/${user.uid}`);

  const snap = await get(myFriendRef);
  if (snap.exists()) {
    // Unfriend
    await remove(myFriendRef);
    await remove(targetFriendRef);
    return false; // Now not friends
  } else {
    // Add friend (Bi-directional record)
    const timestamp = new Date().toISOString();
    await set(myFriendRef, { timestamp });
    await set(targetFriendRef, { timestamp });
    return true; // Now friends
  }
}

export async function getFriendUids(uid) {
  if (!uid) return [];
  try {
    const snap = await get(ref(db, `${PATHS.FRIENDS}/${uid}`));
    if (snap.exists()) {
      return Object.keys(snap.val());
    }
  } catch (err) {
    console.error('Error fetching friend UIDs:', err);
  }
  return [];
}

export async function getFriendsCount(uid) {
  const uids = await getFriendUids(uid);
  return uids.length;
}

export async function getFriendsProfiles(uid) {
  const uids = await getFriendUids(uid);
  const profiles = [];
  for (const fUid of uids) {
    const p = await getUserProfile(fUid);
    if (p) profiles.push(p);
  }
  return profiles;
}
