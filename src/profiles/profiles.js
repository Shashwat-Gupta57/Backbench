import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { auth, db } from '../firebase/firebase.js';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { getUserProfile } from '../services/postService.js';
import { escapeHTML } from '../helpers/formatters.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';

export async function renderProfile(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  // Initial loading skeleton
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Profile</h1>
      </div>
    </header>
    ${renderFeedSkeletons(2)}
  `);

  const hash = window.location.hash;
  let targetUsername = null;

  if (hash.includes('?u=')) {
    targetUsername = hash.split('?u=')[1];
  }

  let userProfile = null;

  if (targetUsername) {
    const usersRef = ref(db, PATHS.USERS);
    const q = query(usersRef, orderByChild('username'), equalTo(targetUsername));
    const snap = await get(q);

    if (snap.exists()) {
      const data = snap.val();
      userProfile = Object.values(data)[0];
    }
  } else {
    userProfile = await getUserProfile(auth.currentUser.uid);
  }

  if (!userProfile) {
    container.innerHTML = createLayout(`
      <header class="sticky-header">
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="btn-ghost" onclick="window.history.back()">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="header-title">Profile</h1>
        </div>
      </header>
      <div style="padding: 60px 20px; text-align: center;" class="fade-in">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">person_off</span>
        <h2 style="font-size: 20px; font-weight: 800;">User not found</h2>
        <p style="color: var(--text-secondary); margin-top: 4px;">The student profile you are looking for does not exist on Backbench.</p>
      </div>
    `);
    attachLayoutListeners();
    return;
  }

  const avatarInitial = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : '?';
  const isSelf = userProfile.uid === auth.currentUser.uid;
  const verified = userProfile.verifiedStudent || userProfile.role === 'staff' || userProfile.role === 'admin';

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 class="header-title" style="display: flex; align-items: center; gap: 4px;">
            ${escapeHTML(userProfile.name)}
            ${verified ? `<span class="material-symbols-outlined verified-icon">verified</span>` : ''}
          </h1>
          <span style="color: var(--text-secondary); font-size: 13px;">${userProfile.postCount || 0} posts</span>
        </div>
      </div>
    </header>

    <!-- Hero Cover Banner -->
    <div style="height: 140px; background: linear-gradient(135deg, #1D9BF0 0%, #004477 100%); position: relative;"></div>

    <!-- Profile Info Box -->
    <div style="padding: 0 16px 16px 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: -50px; margin-bottom: 16px;">
        <div class="avatar" style="width: 100px; height: 100px; font-size: 42px; border: 4px solid var(--bg-primary); box-shadow: 0 6px 20px rgba(0,0,0,0.5);">
          ${avatarInitial}
        </div>

        ${isSelf ? 
          '<button class="btn btn-outline" style="border-radius: 9999px; font-weight: 700;">Edit Profile</button>' : 
          '<button class="btn" style="border-radius: 9999px;">Follow</button>'
        }
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        <h2 style="font-size: 22px; font-weight: 800; display: flex; align-items: center; gap: 6px;">
          ${escapeHTML(userProfile.name)}
          ${verified ? `<span class="material-symbols-outlined verified-icon">verified</span>` : ''}
        </h2>
        <span style="color: var(--text-secondary); font-size: 15px;">@${escapeHTML(userProfile.username)}</span>
      </div>

      <p style="margin-top: 12px; font-size: 15px; line-height: 1.5; color: var(--text-primary);">
        ${escapeHTML(userProfile.bio || 'St. Joseph\'s College Student')}
      </p>

      <div style="display: flex; gap: 18px; flex-wrap: wrap; margin-top: 14px; color: var(--text-secondary); font-size: 14px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">school</span>
          <span>Class ${escapeHTML(userProfile.class || 'N/A')}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">calendar_today</span>
          <span>Joined ${new Date(userProfile.joinedDate || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      <div style="display: flex; gap: 24px; margin-top: 16px; font-size: 14px;">
        <div><strong style="color: var(--text-primary);">${userProfile.likesReceived || 0}</strong> <span style="color: var(--text-secondary);">Likes</span></div>
        <div><strong style="color: var(--text-primary);">${userProfile.replyCount || 0}</strong> <span style="color: var(--text-secondary);">Replies</span></div>
        <div><strong style="color: var(--text-primary);">${userProfile.postCount || 0}</strong> <span style="color: var(--text-secondary);">Posts</span></div>
      </div>
    </div>

    <!-- Activity Tabs -->
    <div class="header-tabs">
      <button class="tab-button active">Posts</button>
      <button class="tab-button">Replies</button>
      <button class="tab-button">Likes</button>
    </div>

    <!-- Feed Placeholder -->
    <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);">
      <p style="font-size: 14px;">Posts by @${escapeHTML(userProfile.username)} will appear here.</p>
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.PROFILE);
  attachLayoutListeners();
}
