import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { searchCampusUsers } from '../services/searchService.js';
import { toggleAddFriend, isFriend } from '../services/friendService.js';
import { escapeHTML } from '../helpers/formatters.js';

export function renderSearch(container) {
  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Campus Search & Friends</h1>
    </header>

    <!-- Search Input Area -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div class="search-box">
        <span class="material-symbols-outlined">search</span>
        <input type="text" id="dedicated-search-input" placeholder="Search by name, @username, admission no, or class..." style="font-size: 15px; padding: 14px 16px 14px 44px;" />
      </div>
      <p style="color: var(--text-secondary); font-size: 13px; margin-top: 8px; margin-left: 4px;">
        Type at least 3 characters to search St. Joseph's College campus members.
      </p>
    </div>

    <!-- Results Container -->
    <div id="dedicated-search-results" style="padding: 16px;">
      <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
        <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">person_search</span>
        <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">Search Campus</h3>
        <p style="font-size: 14px;">Find classmates, friends, and staff members across SJC.</p>
      </div>
    </div>
  `;

  container.innerHTML = createLayout(content, '#/search');
  attachLayoutListeners();

  const input = document.getElementById('dedicated-search-input');
  const resultsContainer = document.getElementById('dedicated-search-results');

  input.addEventListener('input', async () => {
    const rawVal = input.value;
    const cleaned = rawVal.trim().replace(/^@+/, '').replace(/\s+/g, ' ');

    if (cleaned.length < 3) {
      resultsContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">person_search</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">Search Campus</h3>
          <p style="font-size: 14px;">Type at least 3 characters to start filtering.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-secondary);">Searching campus database...</div>`;

    try {
      const matches = await searchCampusUsers(rawVal);
      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
            <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">no_accounts</span>
            <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No results found</h3>
            <p style="font-size: 14px;">No student or staff found matching "${escapeHTML(cleaned)}".</p>
          </div>
        `;
        return;
      }

      let html = '';
      for (const u of matches) {
        const friended = await isFriend(u.uid);
        const initial = u.name ? u.name.charAt(0).toUpperCase() : '?';

        html += `
          <div class="card fade-in" style="display: flex; align-items: center; justify-content: space-between; padding: 14px; margin-bottom: 12px; border-radius: var(--border-radius);">
            <div style="display: flex; align-items: center; gap: 14px; cursor: pointer;" class="user-profile-link" data-username="${escapeHTML(u.username)}">
              <div class="avatar" style="width: 44px; height: 44px;">${initial}</div>
              <div style="display: flex; flex-direction: column;">
                <span style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${escapeHTML(u.name)}</span>
                <span style="font-size: 14px; color: var(--text-secondary);">@${escapeHTML(u.username)} · Class ${escapeHTML(u.class || 'N/A')} · Adm ${escapeHTML(u.admissionNumber || 'N/A')}</span>
              </div>
            </div>

            <button class="btn ${friended ? 'btn-outline' : ''} friend-action-btn" data-uid="${u.uid}">
              ${friended ? 'Friends' : '+ Add Friend'}
            </button>
          </div>
        `;
      }

      resultsContainer.innerHTML = html;

      // Click event handlers
      resultsContainer.querySelectorAll('.user-profile-link').forEach(link => {
        link.addEventListener('click', () => {
          window.location.hash = `#/profile?u=${link.dataset.username}`;
        });
      });

      resultsContainer.querySelectorAll('.friend-action-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const targetUid = btn.dataset.uid;
          btn.disabled = true;
          try {
            const nowFriend = await toggleAddFriend(targetUid);
            btn.textContent = nowFriend ? 'Friends' : '+ Add Friend';
            btn.className = `btn ${nowFriend ? 'btn-outline' : ''} friend-action-btn`;
          } catch (err) {
            console.error(err);
          } finally {
            btn.disabled = false;
          }
        });
      });

    } catch (err) {
      console.error(err);
      resultsContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--error-color);">Failed to search campus.</div>`;
    }
  });
}
