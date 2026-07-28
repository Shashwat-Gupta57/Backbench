import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { auth } from '../firebase/firebase.js';
import { ROLES } from '../constants/roles.js';
import { getUserProfile } from '../services/postService.js';
import { getCampusAnalyticsStats, getAllUsersRoster, setUserRole, toggleUserSuspension, deletePostAsStaff } from '../services/adminService.js';
import { getReportedPostsQueue, approveAndReinstatePost } from '../services/reportService.js';
import { showConfirmModal } from '../components/Modal.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { ROUTES } from '../constants/routes.js';

export async function renderAdmin(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  // Skeleton view during initial load
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <h1 class="header-title">Admin Control Center</h1>
    </header>
    ${renderFeedSkeletons(2)}
  `, ROUTES.ADMIN);

  const currentUserProfile = await getUserProfile(auth.currentUser.uid);
  const userRole = currentUserProfile?.role || ROLES.STUDENT;

  // Access Denied guard for regular students
  if (userRole === ROLES.STUDENT) {
    container.innerHTML = createLayout(`
      <header class="sticky-header">
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="btn-ghost" onclick="window.history.back()">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="header-title">Access Denied</h1>
        </div>
      </header>
      <div style="padding: 60px 20px; text-align: center;" class="fade-in">
        <span class="material-symbols-outlined" style="font-size: 56px; color: var(--error-color); margin-bottom: 12px;">lock</span>
        <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary);">Restricted Area</h2>
        <p style="color: var(--text-secondary); margin-top: 6px; font-size: 15px;">
          The Admin Control Center is restricted exclusively to St. Joseph's College Administrators and Appointed Staff Members.
        </p>
      </div>
    `, ROUTES.HOME, userRole);
    const layoutCleanup = attachLayoutListeners();
    return () => {
      if (layoutCleanup) layoutCleanup();
    };
  }

  // Fetch live stats, roster & reported queue
  const stats = await getCampusAnalyticsStats();
  const usersRoster = await getAllUsersRoster();
  const reportedQueue = await getReportedPostsQueue();

  const isAdmin = userRole === ROLES.ADMIN;

  const content = `
    <!-- Sticky Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">
          ${isAdmin ? 'admin_panel_settings' : 'shield_person'}
        </span>
        <h1 class="header-title">${isAdmin ? 'Master Admin Control Center' : 'Staff Moderation Center'}</h1>
      </div>
    </header>

    <div style="padding: 20px;" class="fade-in">
      
      <!-- Analytics Overview Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: var(--accent-primary);">groups</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${stats.totalUsers}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Total Users</span>
        </div>

        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: #00BA7C;">post</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${stats.totalPosts}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Total Posts</span>
        </div>

        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: #FFD700;">forum</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${stats.totalReplies}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Total Replies</span>
        </div>

        <div class="card" style="padding: 16px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 28px; color: var(--error-color);">flag</span>
          <div style="font-size: 22px; font-weight: 800; color: var(--error-color); margin-top: 4px;">${reportedQueue.length}</div>
          <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Held Reports</span>
        </div>
      </div>

      <!-- Reported Posts Validation Queue Card -->
      <div class="card" style="padding: 24px; border-radius: 20px; border: 1px solid var(--border-color); margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: var(--error-color);">gavel</span>
              Reported Posts Moderation Queue (${reportedQueue.length})
            </h3>
            <span style="font-size: 13px; color: var(--text-secondary);">Posts accumulating 2+ community reports are held here awaiting Staff review.</span>
          </div>
        </div>

        ${reportedQueue.length === 0 ? `
          <div style="padding: 24px; text-align: center; color: var(--text-secondary); font-size: 14px;">
            ✓ No reported posts awaiting validation. The campus feed is clean!
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${reportedQueue.map(async p => {
              const author = await getUserProfile(p.authorId);
              const authorName = author?.name ? escapeHTML(author.name) : 'Student';
              const count = p.reportCount || 0;

              return `
                <div class="card fade-in" style="padding: 16px; border-radius: 14px; background: var(--bg-primary); border: 1px solid var(--border-color);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="brand-badge" style="font-size: 11px; background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);">
                        ${count} REPORT${count === 1 ? '' : 'S'} · AWAITING VALIDATION
                      </span>
                      <span style="font-size: 13px; color: var(--text-secondary);">Posted by <strong>${authorName}</strong> (@${escapeHTML(author?.username || 'student')})</span>
                    </div>

                    <a href="#/post?id=${p.postId}" class="btn btn-outline" style="font-size: 11px; padding: 4px 10px;">
                      View Full Post
                    </a>
                  </div>

                  <div style="font-size: 15px; color: var(--text-primary); font-weight: 500; margin-bottom: 12px; line-height: 1.4;">
                    "${escapeHTML(p.content)}"
                  </div>

                  <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn approve-post-btn" data-post-id="${p.postId}" style="font-size: 12px; padding: 6px 14px; background: #00BA7C; font-weight: 700;">
                      ✓ Approve & Reinstate Post
                    </button>
                    
                    <button class="btn delete-reported-btn" data-post-id="${p.postId}" style="font-size: 12px; padding: 6px 14px; background: var(--error-color); font-weight: 700;">
                      🗑️ Delete Post Permanently
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- User Management Roster Card -->
      <div class="card" style="padding: 24px; border-radius: 20px; border: 1px solid var(--border-color);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary);">
              Campus User Roster (${usersRoster.length})
            </h3>
            <span style="font-size: 13px; color: var(--text-secondary);">Manage student roles, appoint staff, and handle account suspensions.</span>
          </div>

          <div style="display: flex; gap: 8px;">
            <input type="text" id="roster-search-input" class="input-field" placeholder="Filter roster..." style="margin-bottom: 0; padding: 8px 14px; font-size: 13px; width: 180px;" />
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; min-width: 600px;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                <th style="padding: 12px 10px;">Student</th>
                <th style="padding: 12px 10px;">Class & Admission</th>
                <th style="padding: 12px 10px;">Role</th>
                <th style="padding: 12px 10px; text-align: right;">Admin Actions</th>
              </tr>
            </thead>
            <tbody id="roster-tbody">
              ${usersRoster.map(u => {
                const avatarHTML = renderUserAvatar(u, 38);
                const isTargetAdmin = u.role === ROLES.ADMIN;
                const isTargetStaff = u.role === ROLES.STAFF;
                const isSuspended = u.isSuspended || false;

                return `
                  <tr class="roster-row" data-name="${escapeHTML(u.name)}" data-username="${escapeHTML(u.username)}" style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px 10px;">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        ${avatarHTML}
                        <div style="display: flex; flex-direction: column;">
                          <span style="font-weight: 700; color: var(--text-primary); font-size: 14px; display: flex; align-items: center; gap: 4px;">
                            ${escapeHTML(u.name)}
                            ${isTargetAdmin ? `<span class="material-symbols-outlined" style="font-size: 16px; color: var(--error-color);" title="Master Admin">shield</span>` : ''}
                            ${isTargetStaff ? `<span class="material-symbols-outlined verified-icon" title="Appointed Staff Moderator">verified</span>` : ''}
                          </span>
                          <span style="font-size: 12px; color: var(--text-secondary);">@${escapeHTML(u.username)}</span>
                        </div>
                      </div>
                    </td>

                    <td style="padding: 12px 10px; color: var(--text-secondary); font-size: 13px;">
                      <div>Class ${escapeHTML(u.class || 'N/A')}</div>
                      <div style="font-size: 11px; opacity: 0.8;">Adm: ${escapeHTML(u.admissionNumber || 'N/A')}</div>
                    </td>

                    <td style="padding: 12px 10px;">
                      <span class="brand-badge" style="font-size: 11px; font-weight: 700; ${isTargetAdmin ? 'background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);' : isTargetStaff ? 'background: rgba(29, 155, 240, 0.2); color: var(--accent-primary); border-color: var(--accent-primary);' : ''}">
                        ${isTargetAdmin ? 'MASTER ADMIN' : isTargetStaff ? 'STAFF MODERATOR' : 'STUDENT'}
                      </span>
                    </td>

                    <td style="padding: 12px 10px; text-align: right;">
                      ${isTargetAdmin ? `
                        <span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">System Protected</span>
                      ` : `
                        <div style="display: flex; gap: 6px; justify-content: flex-end;">
                          ${isAdmin ? `
                            <button class="btn ${isTargetStaff ? 'btn-outline' : ''} role-toggle-btn" data-uid="${u.uid}" data-current-role="${u.role}" style="font-size: 11px; padding: 4px 10px;">
                              ${isTargetStaff ? 'Remove Staff' : '+ Make Staff'}
                            </button>
                          ` : ''}
                          
                          <button class="btn btn-outline suspend-toggle-btn" data-uid="${u.uid}" style="font-size: 11px; padding: 4px 10px; border-color: ${isSuspended ? '#00BA7C' : 'var(--error-color)'}; color: ${isSuspended ? '#00BA7C' : 'var(--error-color)'};">
                            ${isSuspended ? 'Unsuspend' : 'Suspend'}
                          </button>
                        </div>
                      `}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.ADMIN, userRole);
  const layoutCleanup = attachLayoutListeners();

  // Approve & Reinstate Post Handler
  container.querySelectorAll('.approve-post-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const postId = btn.dataset.postId;
      btn.disabled = true;
      btn.textContent = 'Reinstating...';

      try {
        await approveAndReinstatePost(postId);
        renderAdmin(container);
      } catch (err) {
        alert(err.message || 'Failed to approve post.');
        btn.disabled = false;
      }
    });
  });

  // Delete Post Permanently Handler
  container.querySelectorAll('.delete-reported-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const postId = btn.dataset.postId;
      if (await showConfirmModal('Delete Post', 'Are you sure you want to permanently delete this reported post?')) {
        btn.disabled = true;
        btn.textContent = 'Deleting...';

        try {
          await deletePostAsStaff(postId);
          renderAdmin(container);
        } catch (err) {
          alert(err.message || 'Failed to delete post.');
          btn.disabled = false;
        }
      }
    });
  });

  // Search Filter in Roster Table
  const searchInput = document.getElementById('roster-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('.roster-row').forEach(row => {
        const name = (row.dataset.name || '').toLowerCase();
        const username = (row.dataset.username || '').toLowerCase();
        row.style.display = (name.includes(q) || username.includes(q)) ? '' : 'none';
      });
    });
  }

  // Appoint / Remove Staff Toggle Handler (Master Admin Only)
  container.querySelectorAll('.role-toggle-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetUid = btn.dataset.uid;
      const currentRole = btn.dataset.currentRole;
      const newRole = currentRole === ROLES.STAFF ? ROLES.STUDENT : ROLES.STAFF;

      btn.disabled = true;
      btn.textContent = 'Updating...';

      try {
        await setUserRole(targetUid, newRole);
        renderAdmin(container);
      } catch (err) {
        alert(err.message || 'Failed to update user role.');
        btn.disabled = false;
      }
    });
  });

  // Suspend / Unsuspend User Toggle Handler
  container.querySelectorAll('.suspend-toggle-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetUid = btn.dataset.uid;
      btn.disabled = true;

      try {
        const nowSuspended = await toggleUserSuspension(targetUid);
        btn.textContent = nowSuspended ? 'Unsuspend' : 'Suspend';
        btn.style.borderColor = nowSuspended ? '#00BA7C' : 'var(--error-color)';
        btn.style.color = nowSuspended ? '#00BA7C' : 'var(--error-color)';
      } catch (err) {
        alert(err.message || 'Failed to update user suspension state.');
      } finally {
        btn.disabled = false;
      }
    });
  });

  return () => {
    if (layoutCleanup) layoutCleanup();
  };
}
