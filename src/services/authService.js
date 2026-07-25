import { auth, db } from '../firebase/firebase.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { ROLES } from '../constants/roles.js';
import { deleteCookie } from '../helpers/cookie.js';

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
    
    const userRef = ref(db, `${PATHS.USERS}/${user.uid}`);
    const snap = await get(userRef);
    
    if (!snap.exists()) {
      const profileData = {
        uid: user.uid,
        username: user.email.split('@')[0] + '_' + Math.floor(Math.random() * 1000),
        name: user.displayName || 'Google User',
        admissionNumber: 'N/A',
        class: 'N/A',
        mobile: user.phoneNumber || '',
        email: user.email,
        bio: '',
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
    }
    
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Google Sign-In error:', error);
    return { success: false, error: error.message };
  }
}
