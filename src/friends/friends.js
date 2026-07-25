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
  const friends = await getFriendsProfiles(currentUid);

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">group</span>
          <h1 class="header-title">SJC Friends (${friends.length})</h1>
        </div>

        <a href="#/search" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">person_add</span>
          Find Classmates
        </a>
      </div>
    </header>

    <div style="padding: 20px;" class="fade-in">
      ${friends.length === 0 ? `
        <div style="padding: 60px 20px; text-align: center;" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 56px; color: var(--text-muted); margin-bottom: 12px;">group_off</span>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">No Friends Added Yet</h2>
          <p style="color: var(--text-secondary); margin-top: 6px; font-size: 14px; max-width: 360px; margin-left: auto; margin-right: auto;">
            Connect with your fellow St. Joseph's College classmates to see their posts on your dedicated Friends Feed!
          </p>
          <a href="#/search" class="btn" style="margin-top: 16px; display: inline-flex; align-items: center; gap: 8px; font-weight: 700;">
            <span class="material-symbols-outlined">search</span>
            Search Campus Directory
          </a>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${friends.map(f => {
            const fontStyle = getUserFontFamily(f);
            const avatarHTML = renderUserAvatar(f, 50, 'border: 1px solid var(--border-color);');
            const name = f.name ? escapeHTML(f.name) : 'Student';
            const username = f.username ? escapeHTML(f.username) : 'student';

            return `
              <div class="card fade-in friend-card" style="padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; gap: 14px;" data-username="${username}">
                <div style="display: flex; align-items: center; gap: 14px; min-width: 0;">
                  ${avatarHTML}
                  <div style="display: flex; flex-direction: column; min-width: 0;">
                    <span style="font-size: 16px; font-weight: 800; color: var(--text-primary); font-family: ${fontStyle}; display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${name}
                      ${f.verifiedStudent ? `<span class="material-symbols-outlined verified-icon" style="font-size: 16px;">verified</span>` : ''}
                    </span>
                    <span style="font-size: 13px; color: var(--text-secondary);">@${username} · Class ${escapeHTML(f.class || 'N/A')}</span>
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
      `}
    </div>
  `;

  container.innerHTML = createLayout(content, '#/friends');
  attachLayoutListeners();

  // Friend card click -> open profile
  container.querySelectorAll('.friend-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn')) {
        const username = card.dataset.username;
        window.location.hash = `#/profile?u=${username}`;
      }
    });
  });

  // Remove Friend handler
  container.querySelectorAll('.remove-friend-btn').forEach(btn => {
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
