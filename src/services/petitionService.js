import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, onValue, off, runTransaction } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { getUserProfile } from './postService.js';

export async function createPetition(data) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const { title, statement, category, targetRecipient, goalSignatures } = data;

  if (!title || title.trim().length === 0) {
    throw new Error('Petition title is required.');
  }

  if (!statement || statement.trim().length === 0) {
    throw new Error('Formal petition statement is required.');
  }

  const petitionRef = push(ref(db, PATHS.PETITIONS));
  const petitionData = {
    petitionId: petitionRef.key,
    creatorId: user.uid,
    title: title.trim(),
    statement: statement.trim(),
    category: category || 'Student Welfare',
    targetRecipient: targetRecipient?.trim() || "St. Joseph's College Administration",
    goalSignatures: parseInt(goalSignatures) || 100,
    signatureCount: 0,
    timestamp: new Date().toISOString(),
    status: 'ACTIVE'
  };

  await set(petitionRef, petitionData);
  return petitionData;
}

export function subscribeToPetitions(limit = 20, callback) {
  const petitionsRef = ref(db, PATHS.PETITIONS);

  const listener = onValue(petitionsRef, (snapshot) => {
    const petitions = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnap) => {
        const item = childSnap.val();
        if (item) petitions.push(item);
      });
    }
    petitions.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
    callback(petitions.slice(0, limit));
  });

  return () => off(petitionsRef, 'value', listener);
}

export async function getPetitionById(petitionId) {
  if (!petitionId) return null;
  try {
    const snap = await get(ref(db, `${PATHS.PETITIONS}/${petitionId}`));
    if (snap.exists()) {
      return snap.val();
    }
  } catch (err) {
    console.error('Error fetching petition:', err);
  }
  return null;
}

export async function hasUserSignedPetition(petitionId, uid) {
  if (!uid || !petitionId) return false;
  try {
    const snap = await get(ref(db, `${PATHS.PETITION_VOTES}/${petitionId}/${uid}`));
    return snap.exists();
  } catch (err) {
    return false;
  }
}

export async function signPetition(petitionId) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const voteRef = ref(db, `${PATHS.PETITION_VOTES}/${petitionId}/${user.uid}`);
  const existingSnap = await get(voteRef);

  if (existingSnap.exists()) {
    throw new Error('You have already signed this petition.');
  }

  const userProfile = await getUserProfile(user.uid);
  const signatureData = {
    uid: user.uid,
    name: userProfile?.name || user.displayName || 'Student',
    username: userProfile?.username || 'student',
    class: userProfile?.class || 'N/A',
    admissionNumber: userProfile?.admissionNumber || 'N/A',
    timestamp: new Date().toISOString()
  };

  // Record digital signature
  await set(voteRef, signatureData);

  // Increment signature count atomically
  const petitionRef = ref(db, `${PATHS.PETITIONS}/${petitionId}`);
  let updatedCount = 0;

  await runTransaction(petitionRef, (current) => {
    if (current) {
      current.signatureCount = (current.signatureCount || 0) + 1;
      if (current.signatureCount >= (current.goalSignatures || 100)) {
        current.status = 'GOAL ACHIEVED';
      }
      updatedCount = current.signatureCount;
    }
    return current;
  });

  return { signed: true, signatureCount: updatedCount };
}

export async function getPetitionSignatories(petitionId) {
  if (!petitionId) return [];
  try {
    const snap = await get(ref(db, `${PATHS.PETITION_VOTES}/${petitionId}`));
    if (snap.exists()) {
      const votes = snap.val();
      const signatories = Object.values(votes);
      signatories.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
      return signatories;
    }
  } catch (err) {
    console.error('Error fetching petition signatories:', err);
  }
  return [];
}

export async function deleteOwnPetition(petitionId) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const petitionRef = ref(db, `${PATHS.PETITIONS}/${petitionId}`);
  const snap = await get(petitionRef);

  if (snap.exists()) {
    const data = snap.val();
    if (data.creatorId !== user.uid) {
      throw new Error('Unauthorized: You can only delete your own petitions.');
    }
    
    await set(petitionRef, null);
    await set(ref(db, `${PATHS.PETITION_VOTES}/${petitionId}`), null);
  }
}
