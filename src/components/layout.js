import { ROUTES } from '../constants/routes.js';
import { logoutUser } from '../services/authService.js';
import { searchCampusUsers, toggleAddFriend, isFriend } from '../services/searchService.js';
import { auth } from '../firebase/firebase.js';
import { escapeHTML } from '../helpers/formatters.js';

export function createLayout(contentHTML, currentRoute = ROUTES.HOME) {
  const user = auth.currentUser;
  const userEmail = user?.email || 'student@sjc.edu';
  const userName = user?.displayName || userEmail.split('@')[0];
  const avatarInitial = userName.charAt(0).toUpperCase();

  const isRoute = (path) => currentRoute === path || window.location.hash.startsWith(path);

  return `
    <!-- Left Sidebar (240px) -->
    <aside class="sidebar-container">
      <div>
        <div class="brand-header">
          <div class="brand-logo">B</div>
          <div style="display: flex; flex-direction: column;">
            <span class="brand-text">Backbench</span>
            <span class="brand-badge">SJC 2026</span>
          </div>
        </div>
        
        <nav class="nav-menu">
          <a href="${ROUTES.HOME}" class="nav-item ${isRoute(ROUTES.HOME) ? 'active' : ''}">
            <span class="material-symbols-outlined">home</span>
            <span class="sidebar-label">Home</span>
          </a>
          
          <a href="${ROUTES.PROFILE}" class="nav-item ${isRoute(ROUTES.PROFILE) ? 'active' : ''}">
            <span class="material-symbols-outlined">person</span>
            <span class="sidebar-label">Profile</span>
          </a>

          <a href="#/search" class="nav-item ${isRoute('#/search') ? 'active' : ''}">
            <span class="material-symbols-outlined">search</span>
            <span class="sidebar-label">Search</span>
          </a>
          
          <a href="${ROUTES.PETITIONS}" class="nav-item ${isRoute(ROUTES.PETITIONS) ? 'active' : ''}">
            <span class="material-symbols-outlined">campaign</span>
            <span class="sidebar-label">Petitions</span>
          </a>
          
          <a href="${ROUTES.POLLS}" class="nav-item ${isRoute(ROUTES.POLLS) ? 'active' : ''}">
            <span class="material-symbols-outlined">poll</span>
            <span class="sidebar-label">Polls</span>
          </a>
          
          <a href="${ROUTES.ANNOUNCEMENTS}" class="nav-item ${isRoute(ROUTES.ANNOUNCEMENTS) ? 'active' : ''}">
            <span class="material-symbols-outlined">campaign</span>
            <span class="sidebar-label">Announcements</span>
          </a>
          
          <a href="${ROUTES.EVENTS}" class="nav-item ${isRoute(ROUTES.EVENTS) ? 'active' : ''}">
            <span class="material-symbols-outlined">event</span>
            <span class="sidebar-label">Events</span>
          </a>
          
          <a href="${ROUTES.ADMIN}" class="nav-item ${isRoute(ROUTES.ADMIN) ? 'active' : ''}">
            <span class="material-symbols-outlined">admin_panel_settings</span>
            <span class="sidebar-label">Admin</span>
          </a>
        </nav>
        
        <button class="btn sidebar-post-btn" id="sidebar-open-composer">
          <span class="material-symbols-outlined">edit</span>
          <span class="sidebar-post-text">Post</span>
        </button>
      </div>

      <!-- User Mini Profile -->
      <div class="sidebar-user-profile" id="user-menu-btn" title="Account settings">
        <div class="user-mini-info">
          <div class="avatar" style="width: 38px; height: 38px; font-size: 15px;">${avatarInitial}</div>
          <div style="display: flex; flex-direction: column;">
            <span class="user-mini-name">${userName}</span>
            <span class="user-mini-handle">@${userName.toLowerCase().replace(/\s+/g, '')}</span>
          </div>
        </div>
        <button id="logout-btn" class="btn-ghost" title="Logout" style="padding: 6px;">
          <span class="material-symbols-outlined" style="font-size: 20px;">logout</span>
        </button>
      </div>
    </aside>

    <!-- Centered Feed (Max 650px) -->
    <main class="main-content">
      ${contentHTML}
    </main>

    <!-- Right Sidebar (320px) -->
    <aside class="right-sidebar">
      <div class="search-box" style="position: relative;">
        <span class="material-symbols-outlined">search</span>
        <input type="text" id="right-sidebar-search-input" placeholder="Search campus users (min 3 chars)..." autocomplete="off" />
        
        <!-- Live Search Overlay Dropdown -->
        <div id="search-results-dropdown" style="display: none; position: absolute; top: 48px; left: 0; right: 0; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.7); z-index: 100; max-height: 360px; overflow-y: auto; padding: 8px;" class="fade-in">
        </div>
      </div>

      <!-- Campus Updates Widget -->
      <div class="widget-card">
        <div class="widget-title">
          <span>SJC Campus Updates</span>
          <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 20px;">verified</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
          <div style="padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);">
            <div style="color: var(--text-secondary); font-size: 12px; font-weight: 600;">ANNOUNCEMENT · 2h ago</div>
            <div style="font-weight: 600; margin-top: 2px;">Mid-Semester Exam Timetable Released</div>
          </div>
          <div>
            <div style="color: var(--text-secondary); font-size: 12px; font-weight: 600;">CAMPUS EVENT · Tomorrow</div>
            <div style="font-weight: 600; margin-top: 2px;">Annual Inter-Class Coding Hackathon 2026</div>
          </div>
        </div>
      </div>

      <!-- Trending at SJC -->
      <div class="widget-card">
        <div class="widget-title">Trending at SJC</div>
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 14px;">
          <div>
            <span style="color: var(--text-secondary); font-size: 12px;">1 · Trending in Science Block</span>
            <div style="font-weight: 700; color: var(--text-primary);">#SJCHackathon2026</div>
            <span style="color: var(--text-secondary); font-size: 12px;">142 posts</span>
          </div>
          <div>
            <span style="color: var(--text-secondary); font-size: 12px;">2 · Student Petitions</span>
            <div style="font-weight: 700; color: var(--text-primary);">Extended Library Hours</div>
            <span style="color: var(--text-secondary); font-size: 12px;">89 supporters</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Bottom Navigation Bar (<540px) -->
    <nav class="mobile-bottom-nav">
      <a href="${ROUTES.HOME}" class="mobile-nav-item ${isRoute(ROUTES.HOME) ? 'active' : ''}">
        <span class="material-symbols-outlined">home</span>
      </a>
      <a href="#/search" class="mobile-nav-item ${isRoute('#/search') ? 'active' : ''}">
        <span class="material-symbols-outlined">search</span>
      </a>
      <a href="${ROUTES.PETITIONS}" class="mobile-nav-item ${isRoute(ROUTES.PETITIONS) ? 'active' : ''}">
        <span class="material-symbols-outlined">campaign</span>
      </a>
      <a href="${ROUTES.POLLS}" class="mobile-nav-item ${isRoute(ROUTES.POLLS) ? 'active' : ''}">
        <span class="material-symbols-outlined">poll</span>
      </a>
      <a href="${ROUTES.PROFILE}" class="mobile-nav-item ${isRoute(ROUTES.PROFILE) ? 'active' : ''}">
        <span class="material-symbols-outlined">person</span>
      </a>
    </nav>

    <!-- Mobile Floating Action Button -->
    <button class="mobile-fab" id="mobile-fab-composer" title="New Post">
      <span class="material-symbols-outlined">edit</span>
    </button>
  `;
}

export function attachLayoutListeners() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await logoutUser();
      window.location.hash = '#/login';
    });
  }

  // Sidebar post focus helper
  const sidebarPostBtn = document.getElementById('sidebar-open-composer');
  const mobileFab = document.getElementById('mobile-fab-composer');
  const focusPostInput = () => {
    const textarea = document.getElementById('post-input');
    if (textarea) {
      textarea.focus();
      textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (sidebarPostBtn) sidebarPostBtn.addEventListener('click', focusPostInput);
  if (mobileFab) mobileFab.addEventListener('click', focusPostInput);

  // Live Campus Search Logic (Filtered after 3 letters)
  const searchInput = document.getElementById('right-sidebar-search-input');
  const dropdown = document.getElementById('search-results-dropdown');

  if (searchInput && dropdown) {
    searchInput.addEventListener('input', async () => {
      const rawVal = searchInput.value;
      const cleaned = rawVal.trim().replace(/^@+/, '').replace(/\s+/g, ' ');

      if (cleaned.length < 3) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        return;
      }

      dropdown.style.display = 'block';
      dropdown.innerHTML = `<div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">Searching campus...</div>`;

      try {
        const matches = await searchCampusUsers(rawVal);
        if (matches.length === 0) {
          dropdown.innerHTML = `<div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 13px;">No student or staff found matching "${escapeHTML(cleaned)}".</div>`;
          return;
        }

        let html = '';
        for (const u of matches) {
          const friended = await isFriend(u.uid);
          const initial = u.name ? u.name.charAt(0).toUpperCase() : '?';

          html += `
            <div class="search-result-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 8px; cursor: pointer; transition: background 0.15s ease;" data-username="${escapeHTML(u.username)}">
              <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                <div class="avatar" style="width: 36px; height: 36px; font-size: 14px;">${initial}</div>
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <span style="font-size: 14px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(u.name)}</span>
                  <span style="font-size: 12px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">@${escapeHTML(u.username)} · Class ${escapeHTML(u.class || 'N/A')}</span>
                </div>
              </div>

              <button class="btn ${friended ? 'btn-outline' : ''} friend-toggle-btn" data-uid="${u.uid}" style="font-size: 12px; padding: 4px 12px;">
                ${friended ? 'Friends' : '+ Add Friend'}
              </button>
            </div>
          `;
        }

        dropdown.innerHTML = html;

        // Attach Profile Navigation & Friend Toggle Click Events
        dropdown.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', (e) => {
            if (!e.target.closest('.friend-toggle-btn')) {
              const uname = item.dataset.username;
              dropdown.style.display = 'none';
              window.location.hash = `#/profile?u=${uname}`;
            }
          });
        });

        dropdown.querySelectorAll('.friend-toggle-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const targetUid = btn.dataset.uid;
            btn.disabled = true;
            try {
              const nowFriend = await toggleAddFriend(targetUid);
              btn.textContent = nowFriend ? 'Friends' : '+ Add Friend';
              btn.className = `btn ${nowFriend ? 'btn-outline' : ''} friend-toggle-btn`;
            } catch (err) {
              console.error(err);
            } finally {
              btn.disabled = false;
            }
          });
        });

      } catch (err) {
        console.error(err);
        dropdown.innerHTML = `<div style="padding: 12px; text-align: center; color: var(--error-color); font-size: 13px;">Error searching campus.</div>`;
      }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        dropdown.style.display = 'none';
      }
    });
  }
}
