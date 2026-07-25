import { ROUTES } from '../constants/routes.js';
import { auth, db } from '../firebase/firebase.js';
import { ref, get } from 'firebase/database';
import { logoutUser } from '../services/authService.js';
import { searchCampusUsers, toggleAddFriend, isFriend } from '../services/searchService.js';
import { escapeHTML } from '../helpers/formatters.js';

function isRoute(route) {
  return window.location.hash.split('?')[0] === route || (route === ROUTES.HOME && (!window.location.hash || window.location.hash === '#/'));
}

export function createLayout(mainContentHTML, currentRoute = '', userRole = 'student') {
  const currentUser = auth.currentUser;
  const userName = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : 'Student';
  const avatarInitial = userName.charAt(0).toUpperCase();

  return `
    <div class="app-layout">
      <!-- Left Navigation Sidebar -->
      <aside class="sidebar-container">
        <div class="sidebar-top">
          <!-- Backbench Brand Header -->
          <a href="${ROUTES.HOME}" class="brand-header" style="text-decoration: none;">
            <div class="brand-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4.5C4 3.67157 4.67157 3 5.5 3H14C17.0376 3 19.5 5.46243 19.5 8.5C19.5 10.4571 18.4776 12.1751 16.9453 13.1362C18.7758 14.0734 20 15.9821 20 18.1667C20 21.3883 17.3883 24 14.1667 24H5.5C4.67157 24 4 23.3284 4 22.5V4.5Z" fill="url(#brandGrad)" />
                <path d="M8 6.5H13.5C14.6046 6.5 15.5 7.39543 15.5 8.5C15.5 9.60457 14.6046 10.5 13.5 10.5H8V6.5Z" fill="#FFFFFF" />
                <path d="M8 14.5H14C15.3807 14.5 16.5 15.6193 16.5 17C16.5 18.3807 15.3807 19.5 14 19.5H8V14.5Z" fill="#FFFFFF" opacity="0.9" />
                <defs>
                  <linearGradient id="brandGrad" x1="4" y1="3" x2="20" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#1D9BF0"/>
                    <stop offset="1" stop-color="#004477"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="brand-text-container" style="display: flex; flex-direction: column;">
              <span class="brand-title" style="font-size: 19px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; line-height: 1.1;">Backbench</span>
              <span class="brand-badge" style="font-size: 10px; font-weight: 700; background: var(--bg-tertiary); color: var(--accent-primary); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(29, 155, 240, 0.2); width: fit-content; margin-top: 2px;">SJC 2026</span>
            </div>
          </a>

          <!-- Main Navigation Menu Links -->
          <nav class="sidebar-nav">
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
            
            ${userRole === 'admin' ? `
              <a href="${ROUTES.ADMIN}" class="nav-item ${isRoute(ROUTES.ADMIN) ? 'active' : ''}">
                <span class="material-symbols-outlined">admin_panel_settings</span>
                <span class="sidebar-label">Admin</span>
              </a>
            ` : userRole === 'staff' ? `
              <a href="${ROUTES.ADMIN}" class="nav-item ${isRoute(ROUTES.ADMIN) ? 'active' : ''}">
                <span class="material-symbols-outlined">shield_person</span>
                <span class="sidebar-label">Staff</span>
              </a>
            ` : ''}
          </nav>
          
          <button class="btn sidebar-post-btn" id="sidebar-open-composer">
            <span class="material-symbols-outlined">edit</span>
            <span class="sidebar-post-text">Post</span>
          </button>
        </div>

        <!-- Bottom Left User Profile Pill (Twitter Style) -->
        <div class="sidebar-user-profile" id="user-menu-btn" title="View Profile">
          <div class="user-mini-info">
            <div class="avatar" style="width: 38px; height: 38px; font-size: 15px;">${avatarInitial}</div>
            <div style="display: flex; flex-direction: column;">
              <span class="user-mini-name">${escapeHTML(userName)}</span>
              <span class="user-mini-handle">@${escapeHTML(userName.toLowerCase().replace(/\s+/g, ''))}</span>
            </div>
          </div>
          <button id="logout-btn" class="btn-ghost" title="Logout" style="padding: 6px;">
            <span class="material-symbols-outlined" style="font-size: 20px;">logout</span>
          </button>
        </div>
      </aside>

      <!-- Centered Feed (Max 650px) -->
      <main class="main-content">
        ${mainContentHTML}
      </main>

      <!-- Right Sidebar (Widgets & Global Campus Search) -->
      <aside class="right-sidebar">
        <!-- Search Input Box with Live Dropdown -->
        <div style="position: relative;" class="search-box">
          <span class="material-symbols-outlined">search</span>
          <input type="text" id="right-sidebar-search-input" placeholder="Search campus users (min 3 chars).." />
          
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
    </div>
  `;
}

export function attachLayoutListeners() {
  const userMenuBtn = document.getElementById('user-menu-btn');
  if (userMenuBtn) {
    userMenuBtn.addEventListener('click', (e) => {
      if (!e.target.closest('#logout-btn')) {
        window.location.hash = ROUTES.PROFILE;
      }
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm('Are you sure you want to log out of Backbench?')) {
        await logoutUser();
        window.location.hash = '#/login';
      }
    });
  }

  // Sidebar Post composer button trigger
  const sidebarPostBtn = document.getElementById('sidebar-open-composer');
  const mobileFab = document.getElementById('mobile-fab-composer');
  
  const handleComposerClick = () => {
    if (window.location.hash !== ROUTES.HOME) {
      window.location.hash = ROUTES.HOME;
    }
    setTimeout(() => {
      const input = document.getElementById('post-input');
      if (input) input.focus();
    }, 150);
  };

  if (sidebarPostBtn) sidebarPostBtn.addEventListener('click', handleComposerClick);
  if (mobileFab) mobileFab.addEventListener('click', handleComposerClick);

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
          const pfpHTML = u.profilePicture
            ? `<img src="${u.profilePicture}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />`
            : `<div class="avatar" style="width: 36px; height: 36px; font-size: 14px;">${initial}</div>`;

          html += `
            <div class="search-result-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 8px; cursor: pointer; transition: background 0.15s ease;" data-username="${escapeHTML(u.username)}">
              <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                ${pfpHTML}
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

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        dropdown.style.display = 'none';
      }
    });
  }
}
