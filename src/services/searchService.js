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


