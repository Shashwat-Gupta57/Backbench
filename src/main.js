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
    if (user) {
      try {
        const token = await user.getIdToken();
        // Persist token & uid in browser cookies (30 days)
        setCookie('backbench_token', token, 30);
        setCookie('backbench_uid', user.uid, 30);
      } catch (err) {
        console.error('Error retrieving ID token:', err);
      }
    } else {
      deleteCookie('backbench_token');
      deleteCookie('backbench_uid');
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
