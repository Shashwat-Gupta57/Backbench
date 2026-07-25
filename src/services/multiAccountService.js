import { auth, db } from '../firebase/firebase.js';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { invalidateUserCache } from './postService.js';

const STORAGE_KEY = 'backbench_multi_accounts_v1';
const MAX_ACCOUNTS = 3;

export function getSavedAccounts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading multi-accounts:', err);
    return [];
  }
}

export function saveAccountSession(email, password, userProfile) {
  if (!email || !password || !userProfile) return;

  let list = getSavedAccounts();
  const existingIndex = list.findIndex(a => a.uid === userProfile.uid || a.email.toLowerCase() === email.toLowerCase());

  const accountEntry = {
    uid: userProfile.uid,
    email: email,
    password: btoa(password), // simple obfuscation
    name: userProfile.name || 'Student',
    username: userProfile.username || 'student',
    profilePicture: userProfile.profilePicture || '',
    role: userProfile.role || 'student',
    lastActive: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    list[existingIndex] = accountEntry;
  } else {
    if (list.length >= MAX_ACCOUNTS) {
      list.shift(); // remove oldest account if over limit of 3
    }
    list.push(accountEntry);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export async function switchToAccount(targetUid) {
  const list = getSavedAccounts();
  const target = list.find(a => a.uid === targetUid);

  if (!target) {
    throw new Error('Account session not found. Please log in again.');
  }

  const email = target.email;
  const password = atob(target.password);

  try {
    await signOut(auth);
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    invalidateUserCache(userCred.user.uid);
    window.location.hash = '#/';
    window.location.reload();
    return true;
  } catch (err) {
    console.error('Switch account error:', err);
    // Remove stale invalid credentials
    removeSavedAccount(targetUid);
    throw new Error('Session expired for this account. Please log in again.');
  }
}

export function removeSavedAccount(targetUid) {
  let list = getSavedAccounts();
  list = list.filter(a => a.uid !== targetUid);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export async function logoutAllAccounts() {
  localStorage.removeItem(STORAGE_KEY);
  await signOut(auth);
  window.location.hash = '#/login';
  window.location.reload();
}
