import './styles/index.css';
import { initRouter } from './utils/router.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.js';
import { setCookie, deleteCookie, getCookie } from './helpers/cookie.js';

let isAuthInitialized = false;

function initApp() {
  const appElement = document.querySelector('#app');

  // Render initial splash loader while session token is verified from cookies/IndexedDB
  appElement.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; width: 100%;">
      <img src="/favicon.png" style="width: 56px; height: 56px; border-radius: 16px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35); object-fit: cover;" class="pulse-badge" alt="Logo" />
      <p style="margin-top: 16px; color: var(--text-secondary); font-size: 14px; font-weight: 600;">Restoring session...</p>
    </div>
  `;

  // Set up auth state listener
  onAuthStateChanged(auth, async (user) => {
    console.log('[BB-C1] onAuthStateChanged fired, user=', user ? user.uid : null);
    if (user) {
      try {
        const token = await user.getIdToken();
        console.log('[BB-C2] getIdToken() resolved, length=', token ? token.length : 0);
        const refreshToken = user.refreshToken || (user.stsTokenManager && user.stsTokenManager.refreshToken);
        console.log('[BB-C3] refreshToken resolved, present=', !!refreshToken, 'length=', refreshToken ? refreshToken.length : 0);

        // Persist token & uid in browser cookies (30 days)
        setCookie('backbench_token', token, 30);
        setCookie('backbench_uid', user.uid, 30);
        console.log('[BB-C4] cookies set (backbench_token, backbench_uid)');

        // Bridge Auth to Native Background Services
        console.log('[BB-C5] window.AndroidInterface present=', !!window.AndroidInterface, 'window.electronAPI present=', !!window.electronAPI);
        if (refreshToken) {
          if (window.AndroidInterface && typeof window.AndroidInterface.saveAuthToken === 'function') {
            console.log('[BB-C6] calling AndroidInterface.saveAuthToken()');
            window.AndroidInterface.saveAuthToken(refreshToken);
            console.log('[BB-C7] AndroidInterface.saveAuthToken() call returned');
          } else {
            console.warn('[BB-C6-SKIP] AndroidInterface.saveAuthToken not available - not running in the Android WebView, or bridge not attached yet');
          }
          if (window.electronAPI && typeof window.electronAPI.saveAuthToken === 'function') {
            console.log('[BB-C8] calling electronAPI.saveAuthToken()');
            window.electronAPI.saveAuthToken(refreshToken);
          }
        } else {
          console.warn('[BB-C3-FAIL] refreshToken is falsy - cannot bridge auth to native background services at all');
        }
        if (window.AndroidInterface && typeof window.AndroidInterface.saveUserId === 'function') {
          console.log('[BB-C9] calling AndroidInterface.saveUserId()', user.uid);
          window.AndroidInterface.saveUserId(user.uid);
          console.log('[BB-C10] AndroidInterface.saveUserId() call returned');
        } else {
          console.warn('[BB-C9-SKIP] AndroidInterface.saveUserId not available');
        }
      } catch (err) {
        console.error('[BB-C-ERR] Error retrieving ID token:', err);
      }
    } else {
      console.log('[BB-C11] user is null (signed out) - clearing cookies and native uid');
      deleteCookie('backbench_token');
      deleteCookie('backbench_uid');
      if (window.AndroidInterface && typeof window.AndroidInterface.clearUserId === 'function') {
        window.AndroidInterface.clearUserId();
      }
    }

    if (!isAuthInitialized) {
      isAuthInitialized = true;
      // Initialize router AFTER auth restoration is complete
      initRouter(appElement);
    } else {
      // Redirect unauthenticated users away from protected pages
      if (!user && window.location.hash !== '#/login' && window.location.hash !== '#/signup') {
        window.location.hash = '#/login';
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);
