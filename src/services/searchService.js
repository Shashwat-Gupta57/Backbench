import { db, auth } from '../firebase/firebase.js';
import { ref, get, set, remove } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';

export async function searchCampusUsers(rawQuery) {
  if (!rawQuery) return [];

  // Edge case handling: trim, lowercase, remove leading '@', strip extra spaces
  const cleaned = rawQuery
    .trim()
    .toLowerCase()
    .replace(/^@+/, '')
    .replace(/\s+/g, ' ');

  // Require at least 3 characters before filtering
  if (cleaned.length < 3) return [];

  const usersSnap = await get(ref(db, PATHS.USERS));
  if (!usersSnap.exists()) return [];

  const results = [];
  const currentUid = auth.currentUser?.uid;

  usersSnap.forEach((childSnap) => {
    const user = childSnap.val();
    if (!user || user.uid === currentUid) return; // Exclude self

    const name = (user.name || '').toLowerCase();
    const username = (user.username || '').toLowerCase();
    const admNo = (user.admissionNumber || '').toLowerCase();
    const userClass = (user.class || '').toLowerCase();

    if (
      name.includes(cleaned) ||
      username.includes(cleaned) ||
      admNo.includes(cleaned) ||
      userClass.includes(cleaned)
    ) {
      results.push(user);
    }
  });

  return results;
}

export async function toggleAddFriend(targetUid) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const friendRef = ref(db, `friends/${user.uid}/${targetUid}`);
  const snap = await get(friendRef);

  if (snap.exists()) {
    await remove(friendRef);
    return false; // Friended status = false
  } else {
    await set(friendRef, true);
    return true; // Friended status = true
  }
}

export async function isFriend(targetUid) {
  const user = auth.currentUser;
  if (!user || !targetUid) return false;
  const snap = await get(ref(db, `friends/${user.uid}/${targetUid}`));
  return snap.exists();
}
