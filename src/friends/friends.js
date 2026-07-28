import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { auth } from '../firebase/firebase.js';
import { getFriendsProfiles, toggleAddFriend } from '../services/friendService.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { getUserFontFamily } from '../constants/fonts.js';

export async function renderFriends(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  // Skeleton view during load
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <h1 class="header-title">Friends</h1>
    </header>
    ${renderFeedSkeletons(3)}
  `, '#/friends');

  const currentUid = auth.currentUser.uid;
  const allFriends = await getFriendsProfiles(currentUid);

  const realFriends = allFriends.filter(f => f.isMutual);
  const oneSidedFriends = allFriends.filter(f => !f.isMutual);

  let activeTab = 'all'; // 'all' | 'real' | 'onesided'

  function renderFeedHTML(friendsList) {
    if (friendsList.length === 0) {
      return `
        <div style="padding: 60px 20px; text-align: center;" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 56px; color: var(--text-muted); margin-bottom: 12px;">group_off</span>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">No Friends in this category</h2>
          <p style="color: var(--text-secondary); margin-top: 6px; font-size: 14px; max-width: 360px; margin-left: auto; margin-right: auto;">
            ${activeTab === 'real' ? 'No mutual friends yet! When classmates add you back, they will appear here as Real Friends.' : 'No one-sided friends.'}
          </p>
          <a href="#/search" class="btn" style="margin-top: 16px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
            <span class="material-symbols-outlined">search</span>
            Search Campus Directory
          </a>
        </div>
      `;
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${friendsList.map(f => {
          const fontStyle = getUserFontFamily(f);
          const avatarHTML = renderUserAvatar(f, 50, 'border: 1px solid var(--border-color);');
          const name = f.name ? escapeHTML(f.name) : 'Student';
          const username = f.username ? escapeHTML(f.username) : 'student';
          const isMutual = f.isMutual;

          return `
            <div class="card fade-in friend-card" style="padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; gap: 14px;" data-username="${username}">
              <div style="display: flex; align-items: center; gap: 14px; min-width: 0;">
                ${avatarHTML}
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                    <span style="font-size: 16px; font-weight: 800; color: var(--text-primary); font-family: ${fontStyle}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${name}
                    </span>
                    ${f.verifiedStudent ? `<span class="material-symbols-outlined verified-icon" style="font-size: 16px;">verified</span>` : ''}

                    <!-- Real vs One-Sided Friend Badge -->
                    <span class="brand-badge" style="font-size: 10px; font-weight: 700; ${isMutual ? 'background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C;' : 'background: rgba(255, 170, 0, 0.2); color: #FFAA00; border-color: #FFAA00;'}">
                      ${isMutual ? '💙 Real Friend (Mutual)' : '👀 One-Sided Friend'}
                    </span>
                  </div>
                  
                  <span style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">@${username} · Class ${escapeHTML(f.class || 'N/A')}</span>
                  ${f.tagline ? `<span style="font-size: 12px; font-style: italic; color: var(--accent-primary); margin-top: 2px;">“${escapeHTML(f.tagline)}”</span>` : ''}
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                <a href="#/profile?u=${username}" class="btn btn-outline" style="font-size: 12px; padding: 6px 14px;">
                  View Profile
                </a>
                <button class="btn btn-outline remove-friend-btn" data-uid="${f.uid}" style="font-size: 12px; padding: 6px 12px; border-color: var(--error-color); color: var(--error-color);">
                  Remove
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">group</span>
          <h1 class="header-title">SJC Friends Roster (${allFriends.length})</h1>
        </div>

        <a href="#/search" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">person_add</span>
          Find Classmates
        </a>
      </div>
    </header>

    <!-- Filter Tabs (All vs Real vs One-Sided) -->
    <div class="header-tabs">
      <button class="tab-button active" id="tab-all-friends">All (${allFriends.length})</button>
      <button class="tab-button" id="tab-real-friends">💙 Real Friends (${realFriends.length})</button>
      <button class="tab-button" id="tab-onesided-friends">👀 One-Sided (${oneSidedFriends.length})</button>
    </div>

    <div style="padding: 20px;" class="fade-in" id="friends-list-container">
      ${renderFeedHTML(allFriends)}
    </div>
  `;

  container.innerHTML = createLayout(content, '#/friends');
  const layoutCleanup = attachLayoutListeners();

  const listContainer = document.getElementById('friends-list-container');
  const tabAll = document.getElementById('tab-all-friends');
  const tabReal = document.getElementById('tab-real-friends');
  const tabOneSided = document.getElementById('tab-onesided-friends');

  function attachCardListeners() {
    listContainer.querySelectorAll('.friend-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.btn')) {
          const username = card.dataset.username;
          window.location.hash = `#/profile?u=${username}`;
        }
      });
    });

    listContainer.querySelectorAll('.remove-friend-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const targetUid = btn.dataset.uid;
        btn.disabled = true;

        try {
          await toggleAddFriend(targetUid);
          renderFriends(container);
        } catch (err) {
          alert(err.message || 'Failed to remove friend.');
          btn.disabled = false;
        }
      });
    });
  }

  attachCardListeners();

  tabAll.addEventListener('click', () => {
    activeTab = 'all';
    tabAll.classList.add('active');
    tabReal.classList.remove('active');
    tabOneSided.classList.remove('active');
    listContainer.innerHTML = renderFeedHTML(allFriends);
    attachCardListeners();
  });

  tabReal.addEventListener('click', () => {
    activeTab = 'real';
    tabReal.classList.add('active');
    tabAll.classList.remove('active');
    tabOneSided.classList.remove('active');
    listContainer.innerHTML = renderFeedHTML(realFriends);
    attachCardListeners();
  });

  tabOneSided.addEventListener('click', () => {
    activeTab = 'onesided';
    tabOneSided.classList.add('active');
    tabAll.classList.remove('active');
    tabReal.classList.remove('active');
    listContainer.innerHTML = renderFeedHTML(oneSidedFriends);
    attachCardListeners();
  });

  return () => {
    if (layoutCleanup) layoutCleanup();
  };
}
