import { auth, db } from '../firebase/firebase.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  fetchSignInMethodsForEmail,
  updatePassword
} from 'firebase/auth';
import { ref, set, get, update } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { ROLES } from '../constants/roles.js';
import { deleteCookie } from '../helpers/cookie.js';
import { invalidateUserCache } from './postService.js';
import { saveAccountSession } from './multiAccountService.js';

function formatAuthError(error) {
  const code = error?.code || '';
  const msg = error?.message || '';

  if (code === 'auth/unauthorized-domain' || msg.includes('unauthorized-domain')) {
    const domain = window.location.hostname;
    return `Unauthorized Domain Error: Please add "${domain}" to Firebase Console -> Authentication -> Settings -> Authorized domains.`;
  }
  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
    return 'Invalid email or password. Please verify your login credentials.';
  }
  if (code === 'auth/email-already-in-use') {
    return 'An account with this email address already exists. Please log in instead.';
  }
  return msg || 'Authentication failed. Please try again.';
}

export function isProfileComplete(profile) {
  if (!profile) return false;
  if (profile.role === ROLES.ADMIN) return true; // Admin account bypasses onboarding
  const username = profile.username;
  const admNo = profile.admissionNumber;
  const clss = profile.class || profile.userClass;

  if (!username || username.trim() === '') return false;
  if (!admNo || admNo === 'N/A' || admNo.trim() === '') return false;
  if (!clss || clss === 'N/A' || clss.trim() === '') return false;
  return true;
}



export async function updateUserPassword(newPassword) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  if (!newPassword || newPassword.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  try {
    await updatePassword(user, newPassword);
    return true;
  } catch (err) {
    console.error('Update password error:', err);
    if (err.code === 'auth/requires-recent-login') {
      throw new Error('Security Notice: Changing password requires a recent login session. Please log out and log in again, then update your password.');
    }
    throw new Error(err.message || 'Failed to update password.');
  }
}

export async function registerUser(data) {
  try {
    const { email, password, username, name, admissionNumber, userClass, mobile, isTeacher, role } = data;
    
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
      isTeacher: isTeacher || false,
      role: role || ROLES.STUDENT,
      bio: '',
      tagline: '',
      joinedDate: new Date().toISOString(),
      verifiedStudent: false,
      postCount: 0,
      replyCount: 0,
      likeCount: 0,
      isSuspended: false,
      profilePicture: ''
    };
    
    await set(ref(db, `${PATHS.USERS}/${user.uid}`), profileData);
    invalidateUserCache(user.uid);
    saveAccountSession(email, password, profileData);

    return { success: true, user: profileData };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: formatAuthError(error) };
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    let role = ROLES.STUDENT;

    const snap = await get(ref(db, `${PATHS.USERS}/${userCredential.user.uid}`));
    const profile = snap.exists() ? snap.val() : { uid: userCredential.user.uid, name: email.split('@')[0], username: email.split('@')[0], role: role };

    saveAccountSession(email, password, profile);

    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: formatAuthError(error) };
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
    let user;
    if (window.electronAPI && window.electronAPI.signInWithGoogle) {
      const tokens = await window.electronAPI.signInWithGoogle();
      const credential = GoogleAuthProvider.credential(tokens.idToken, tokens.accessToken);
      const result = await signInWithCredential(auth, credential);
      user = result.user;
    } else if (window.AndroidInterface) {
      window.AndroidInterface.signInWithGoogle();
      
      // Wait for the Android layer to inject the tokens globally
      const tokens = await new Promise((resolve, reject) => {
        window.onAndroidGoogleAuth = (idToken, accessToken) => {
          if (idToken) resolve({ idToken, accessToken });
          else reject(new Error("Android Google Auth Failed"));
        };
      });
      const credential = GoogleAuthProvider.credential(tokens.idToken, tokens.accessToken);
      const result = await signInWithCredential(auth, credential);
      user = result.user;
    } else {
      const result = await signInWithPopup(auth, googleProvider);
      user = result.user;
    }

    // Explicitly sync tokens to native bridges if available
    const rToken = user.refreshToken || (user.stsTokenManager && user.stsTokenManager.refreshToken);
    if (rToken) {
      if (window.AndroidInterface && window.AndroidInterface.saveAuthToken) window.AndroidInterface.saveAuthToken(rToken);
      if (window.electronAPI && window.electronAPI.saveAuthToken) window.electronAPI.saveAuthToken(rToken);
    }
    if (user.uid) {
      if (window.AndroidInterface && window.AndroidInterface.saveUserId) window.AndroidInterface.saveUserId(user.uid);
    }

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
    return { success: false, error: formatAuthError(error) };
  }
}
