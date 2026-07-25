import { ROUTES } from '../constants/routes.js';
import { auth, db } from '../firebase/firebase.js';
import { ref, get } from 'firebase/database';
import { logoutUser } from '../services/authService.js';
import { searchCampusUsers, toggleAddFriend, isFriend } from '../services/searchService.js';
import { getTrendingHashtags } from '../services/postService.js';
import { subscribeToUserNotifications } from '../services/notificationService.js';
import { getSavedAccounts, switchToAccount, removeSavedAccount, logoutAllAccounts } from '../services/multiAccountService.js';
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

            <a href="#/notifications" class="nav-item ${isRoute('#/notifications') ? 'active' : ''}" style="position: relative;">
              <span class="material-symbols-outlined">notifications</span>
              <span class="sidebar-label">Notifications</span>
              <span id="unread-notif-badge" class="brand-badge" style="display: none; position: absolute; right: 12px; background: var(--error-color); color: #fff; border: none; font-size: 11px; padding: 2px 6px;"></span>
            </a>

            <a href="#/friends" class="nav-item ${isRoute('#/friends') ? 'active' : ''}">
              <span class="material-symbols-outlined">group</span>
              <span class="sidebar-label">Friends</span>
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

            <a href="${ROUTES.SETTINGS}" class="nav-item ${isRoute(ROUTES.SETTINGS) ? 'active' : ''}">
              <span class="material-symbols-outlined">settings</span>
              <span class="sidebar-label">Settings</span>
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

        <!-- Bottom Left User Profile Pill with Multi-Account Switcher Popover -->
        <div style="position: relative; margin-top: auto;">
          <div class="sidebar-user-profile" id="user-menu-btn" title="Account Switcher">
            <div class="user-mini-info">
              <div class="avatar" style="width: 38px; height: 38px; font-size: 15px;">${avatarInitial}</div>
              <div style="display: flex; flex-direction: column;">
                <span class="user-mini-name">${escapeHTML(userName)}</span>
                <span class="user-mini-handle">@${escapeHTML(userName.toLowerCase().replace(/\s+/g, ''))}</span>
              </div>
            </div>
            <span class="material-symbols-outlined" style="font-size: 20px; color: var(--text-secondary);">unfold_more</span>
          </div>

          <!-- Multi-Account Switcher Popover -->
          <div id="multi-account-popover" style="display: none; position: absolute; bottom: 60px; left: 0; width: 260px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.8); z-index: 1000; padding: 12px;" class="fade-in">
            <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; padding: 0 4px;">
              Switch Backbench Account (Max 3)
            </div>

            <div id="saved-accounts-list" style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;">
            </div>

            <div style="border-top: 1px solid var(--border-subtle); padding-top: 8px; display: flex; flex-direction: column; gap: 4px;">
              <a href="#/login" id="add-account-link" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; justify-content: flex-start; gap: 8px; border: none; text-align: left; background: var(--bg-tertiary);">
                <span class="material-symbols-outlined" style="font-size: 16px;">person_add</span>
                Add an existing account
              </a>

              <button id="logout-current-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; justify-content: flex-start; gap: 8px; border: none; text-align: left; color: var(--error-color);">
                <span class="material-symbols-outlined" style="font-size: 16px;">logout</span>
                Log out @${escapeHTML(userName.toLowerCase().replace(/\s+/g, ''))}
              </button>

              <button id="logout-all-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; justify-content: flex-start; gap: 8px; border: none; text-align: left; color: var(--error-color);">
                <span class="material-symbols-outlined" style="font-size: 16px;">group_off</span>
                Log out of all accounts
              </button>
            </div>
          </div>
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
          <div id="trending-hashtags-container" style="display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
            <div style="color: var(--text-secondary); font-size: 13px;">Loading trending topics...</div>
          </div>
        </div>
      </aside>

      <!-- Mobile Bottom Navigation Bar (<540px) -->
      <nav class="mobile-bottom-nav">
        <a href="${ROUTES.HOME}" class="mobile-nav-item ${isRoute(ROUTES.HOME) ? 'active' : ''}">
          <span class="material-symbols-outlined">home</span>
        </a>
        <a href="#/notifications" class="mobile-nav-item ${isRoute('#/notifications') ? 'active' : ''}">
          <span class="material-symbols-outlined">notifications</span>
        </a>
        <a href="#/friends" class="mobile-nav-item ${isRoute('#/friends') ? 'active' : ''}">
          <span class="material-symbols-outlined">group</span>
        </a>
        <a href="#/search" class="mobile-nav-item ${isRoute('#/search') ? 'active' : ''}">
          <span class="material-symbols-outlined">search</span>
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
  const currentUser = auth.currentUser;
  const userMenuBtn = document.getElementById('user-menu-btn');
  const popover = document.getElementById('multi-account-popover');
  const savedAccountsList = document.getElementById('saved-accounts-list');
  const logoutCurrentBtn = document.getElementById('logout-current-btn');
  const logoutAllBtn = document.getElementById('logout-all-btn');

  // Toggle Multi-Account Popover Menu
  if (userMenuBtn && popover && savedAccountsList) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = popover.style.display === 'block';

      if (isVisible) {
        popover.style.display = 'none';
      } else {
        popover.style.display = 'block';

        // Render saved accounts list
        const accounts = getSavedAccounts();
        const currentUid = currentUser ? currentUser.uid : '';

        if (accounts.length === 0 && currentUser) {
          savedAccountsList.innerHTML = `
            <div style="padding: 8px; font-size: 13px; color: var(--text-secondary); text-align: center;">
              Log in with another account to add it to your quick switcher.
            </div>
          `;
        } else {
          let html = '';
          accounts.forEach(acc => {
            const isActive = acc.uid === currentUid;
            const initial = acc.name ? acc.name.charAt(0).toUpperCase() : '?';

            html += `
              <div class="saved-account-item ${isActive ? 'active' : ''}" data-uid="${acc.uid}" style="display: flex; align-items: center; justify-content: space-between; padding: 8px; border-radius: 10px; cursor: pointer; transition: background 0.15s ease; background: ${isActive ? 'rgba(29, 155, 240, 0.12)' : 'transparent'};">
                <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                  <div class="avatar" style="width: 32px; height: 32px; font-size: 13px;">${initial}</div>
                  <div style="display: flex; flex-direction: column; min-width: 0;">
                    <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(acc.name)}</span>
                    <span style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">@${escapeHTML(acc.username)}</span>
                  </div>
                </div>

                ${isActive ? `
                  <span class="material-symbols-outlined" style="font-size: 18px; color: var(--accent-primary);">check_circle</span>
                ` : ''}
              </div>
            `;
          });
          savedAccountsList.innerHTML = html;

          // Attach click listeners to switch account
          savedAccountsList.querySelectorAll('.saved-account-item').forEach(item => {
            item.addEventListener('click', async () => {
              const targetUid = item.dataset.uid;
              if (targetUid !== currentUid) {
                popover.style.display = 'none';
                try {
                  await switchToAccount(targetUid);
                } catch (err) {
                  alert(err.message || 'Failed to switch account.');
                }
              }
            });
          });
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#multi-account-popover') && !e.target.closest('#user-menu-btn')) {
        popover.style.display = 'none';
      }
    });
  }

  if (logoutCurrentBtn) {
    logoutCurrentBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm('Log out of current account?')) {
        if (currentUser) {
          removeSavedAccount(currentUser.uid);
        }
        await logoutUser();
        window.location.hash = '#/login';
        window.location.reload();
      }
    });
  }

  if (logoutAllBtn) {
    logoutAllBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm('Log out of ALL saved accounts on this browser?')) {
        await logoutAllAccounts();
      }
    });
  }

  // Real-time Unread Notifications Badge
  const badge = document.getElementById('unread-notif-badge');
  if (currentUser && badge) {
    subscribeToUserNotifications(currentUser.uid, (list) => {
      const unreadCount = list.filter(n => !n.read).length;
      if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
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

  // Dynamic Trending Hashtags Widget Loading
  const trendingContainer = document.getElementById('trending-hashtags-container');
  if (trendingContainer) {
    getTrendingHashtags(5).then(list => {
      if (!list || list.length === 0) {
        trendingContainer.innerHTML = `
          <div>
            <span style="color: var(--text-secondary); font-size: 12px;">1 · Campus Trending</span>
            <div style="font-weight: 700; color: var(--accent-primary); cursor: pointer;" onclick="window.location.hash='#/search?q=%23SJCHackathon2026'">#SJCHackathon2026</div>
            <span style="color: var(--text-secondary); font-size: 12px;">142 posts</span>
          </div>
        `;
        return;
      }

      let html = '';
      list.forEach((t, idx) => {
        html += `
          <div style="cursor: pointer;" onclick="window.location.hash='#/search?q=%23${encodeURIComponent(t.tag)}'">
            <span style="color: var(--text-secondary); font-size: 12px;">${idx + 1} · Trending in Campus</span>
            <div style="font-weight: 700; color: var(--accent-primary);">#${escapeHTML(t.tag)}</div>
            <span style="color: var(--text-secondary); font-size: 12px;">${t.count} post${t.count === 1 ? '' : 's'}</span>
          </div>
        `;
      });
      trendingContainer.innerHTML = html;
    }).catch(err => console.error(err));
  }

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
