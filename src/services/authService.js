import { auth, db } from '../firebase/firebase.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { ROLES } from '../constants/roles.js';
import { deleteCookie } from '../helpers/cookie.js';
import { invalidateUserCache } from './postService.js';

export function isProfileComplete(profile) {
  if (!profile) return false;
  const username = profile.username;
  const admNo = profile.admissionNumber;
  const clss = profile.class || profile.userClass;

  if (!username || username.trim() === '') return false;
  if (!admNo || admNo === 'N/A' || admNo.trim() === '') return false;
  if (!clss || clss === 'N/A' || clss.trim() === '') return false;
  return true;
}

export async function registerUser(data) {
  try {
    const { email, password, username, name, admissionNumber, userClass, mobile } = data;
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const profileData = {
      uid: user.uid,
      username: username,
      name: name,
      admissionNumber: admissionNumber,
      class: userClass,
      mobile: mobile,
      email: email,
      bio: '',
      tagline: '',
      joinedDate: new Date().toISOString(),
      verifiedStudent: false,
      role: ROLES.STUDENT,
      postCount: 0,
      replyCount: 0,
      likeCount: 0,
      isSuspended: false,
      profilePicture: ''
    };
    
    await set(ref(db, `${PATHS.USERS}/${user.uid}`), profileData);
    invalidateUserCache(user.uid);
    return { success: true, user: profileData };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

export async function logoutUser() {
  try {
    deleteCookie('backbench_token');
    deleteCookie('backbench_uid');
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user's email was registered via password auth previously
    if (user.email) {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, user.email);
        if (methods.includes('password') && !user.providerData.some(p => p.providerId === 'google.com')) {
          await signOut(auth);
          return {
            success: false,
            error: 'An account already exists with this email address using Email & Password. Please log in with your email and password instead.'
          };
        }
      } catch (e) {
        // Ignore fetch methods error if restricted by project rules
      }
    }
    
    const userRef = ref(db, `${PATHS.USERS}/${user.uid}`);
    const snap = await get(userRef);
    let profileData = null;

    if (snap.exists()) {
      profileData = snap.val();
    } else {
      const cleanUsername = user.email.split('@')[0].replace(/[^a-zA-Z0-9_.]/g, '');
      profileData = {
        uid: user.uid,
        username: cleanUsername,
        name: user.displayName || 'Google User',
        admissionNumber: 'N/A',
        class: 'N/A',
        mobile: user.phoneNumber || '',
        email: user.email,
        bio: '',
        tagline: '',
        joinedDate: new Date().toISOString(),
        verifiedStudent: false,
        role: ROLES.STUDENT,
        postCount: 0,
        replyCount: 0,
        likeCount: 0,
        isSuspended: false,
        profilePicture: user.photoURL || ''
      };
      await set(userRef, profileData);
      invalidateUserCache(user.uid);
    }
    
    const complete = isProfileComplete(profileData);
    return { success: true, user, needsOnboarding: !complete };
  } catch (error) {
    console.error('Google Sign-In error:', error);
    if (error.code === 'auth/account-exists-with-different-credential') {
      return {
        success: false,
        error: 'An account already exists with this email address using Email & Password. Please log in with your email and password instead.'
      };
    }
    return { success: false, error: error.message };
  }
}
