import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { createAnnouncement, subscribeToAnnouncements, deleteAnnouncementAsStaff, editAnnouncement } from '../services/announcementService.js';
import { getUserProfile } from '../services/postService.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML, renderFormattedContent } from '../helpers/formatters.js';
import { formatTimeAgo } from '../helpers/time.js';
import { showContextMenu } from '../components/ContextMenu.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

let announcementsUnsubscribe = null;

export async function renderAnnouncements(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  const currentUser = auth.currentUser;
  const userProfile = await getUserProfile(currentUser.uid);
  const isStaff = userProfile?.role === 'staff' || userProfile?.role === 'admin';

  let createFormHTML = '';
  if (isStaff) {
    createFormHTML = `
      <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
        <div class="card" style="padding: 20px; border-left: 4px solid var(--accent-primary);">
          <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: var(--accent-primary);">campaign</span>
            Publish Campus Announcement
          </h3>
          <form id="create-announcement-form" style="display: flex; flex-direction: column;">
            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Title</label>
            <input type="text" id="announcement-title" class="input-field" placeholder="e.g. Mid-Semester Exam Schedule" required />

            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Severity Level</label>
            <select id="announcement-severity" class="input-field" style="background: var(--bg-primary);">
              <option value="info">Info (Standard Update)</option>
              <option value="warning">Warning (Important Notice)</option>
              <option value="alert">Alert (Urgent/Critical)</option>
            </select>

            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Content</label>
            <textarea id="announcement-content" class="input-field" rows="4" style="resize: none;" placeholder="Details of the announcement..." required></textarea>

            <div id="announcement-error" class="error-text" style="display: none; margin-bottom: 8px;"></div>

            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" id="submit-announcement-btn" class="btn" style="font-weight: 700;">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Official Announcements</h1>
    </header>

    ${createFormHTML}

    <!-- Active Announcements Feed -->
    <div id="announcements-feed-container" style="padding: 16px;">
      ${renderFeedSkeletons(3)}
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.ANNOUNCEMENTS);
  const layoutCleanup = attachLayoutListeners();

  const form = document.getElementById('create-announcement-form');
  const errorDiv = document.getElementById('announcement-error');
  const submitBtn = document.getElementById('submit-announcement-btn');
  const feedContainer = document.getElementById('announcements-feed-container');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';

      const title = document.getElementById('announcement-title').value.trim();
      const severity = document.getElementById('announcement-severity').value;
      const statement = document.getElementById('announcement-content').value.trim();

      submitBtn.disabled = true;
      submitBtn.textContent = 'Publishing...';

      try {
        await createAnnouncement({ title, content: statement, severity });
        form.reset();
      } catch (err) {
        errorDiv.textContent = err.message || 'Failed to create announcement.';
        errorDiv.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Publish';
      }
    });
  }

  // Subscribe to Realtime Announcements Feed
  if (announcementsUnsubscribe) announcementsUnsubscribe();

  announcementsUnsubscribe = subscribeToAnnouncements(30, async (announcements) => {
    if (!feedContainer) return;

    if (announcements.length === 0) {
      feedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">campaign</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No Announcements</h3>
          <p style="font-size: 14px;">There are no official campus announcements at this time.</p>
        </div>
      `;
      return;
    }

    let html = '';

    try {
      for (const item of announcements) {
        const author = await getUserProfile(item.authorId);
        const authorName = author?.name ? escapeHTML(author.name) : 'Staff';
        const authorAvatar = renderUserAvatar(author, 36, 'border: 1px solid var(--border-color);');
        
        let severityColor = 'var(--accent-primary)';
        let severityBg = 'rgba(29, 155, 240, 0.1)';
        let severityIcon = 'info';

        if (item.severity === 'warning') {
          severityColor = '#F59E0B';
          severityBg = 'rgba(245, 158, 11, 0.1)';
          severityIcon = 'warning';
        } else if (item.severity === 'alert') {
          severityColor = 'var(--error-color)';
          severityBg = 'rgba(244, 33, 46, 0.1)';
          severityIcon = 'error';
        }

        html += `
          <div class="card fade-in" style="margin-bottom: 16px; padding: 16px; border-radius: var(--border-radius); border-left: 4px solid ${severityColor};" data-id="${item.id}">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div style="display: flex; gap: 8px; align-items: center;">
                <span class="material-symbols-outlined" style="color: ${severityColor}; font-size: 20px;">${severityIcon}</span>
                <span class="brand-badge" style="font-size: 11px; color: ${severityColor}; background: ${severityBg}; border-color: ${severityColor}; text-transform: uppercase;">${item.severity}</span>
                <span class="time-ago" data-timestamp="${item.timestamp}" style="font-size: 13px; color: var(--text-secondary);">${formatTimeAgo(item.timestamp)}</span>
                ${item.edited ? `<span style="font-size: 11px; color: var(--text-secondary); font-style: italic;">(edited)</span>` : ''}
              </div>
              
              ${isStaff ? `
                <button class="btn-ghost announcement-options-btn" style="padding: 4px;" title="Options" data-id="${item.id}" data-author-id="${item.authorId}">
                  <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
                </button>
              ` : ''}
            </div>

            <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; line-height: 1.3;">
              ${escapeHTML(item.title)}
            </h2>

            <div style="font-size: 15px; color: var(--text-primary); line-height: 1.5; margin-bottom: 16px;">
              ${renderFormattedContent(item.content)}
            </div>

            <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
              ${authorAvatar}
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${authorName}</div>
                <div style="font-size: 11px; color: var(--text-secondary);">Official Campus Communication</div>
              </div>
            </div>
          </div>
        `;
      }
      feedContainer.innerHTML = html;
    } catch (err) {
      console.error('Error rendering announcements:', err);
      feedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--error-color);">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px;">error_outline</span>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">Failed to load announcements</h3>
        </div>
      `;
    }

    if (isStaff) {
      feedContainer.querySelectorAll('.announcement-options-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          const authorId = btn.dataset.authorId;

          showContextMenu(btn, {
            itemId: id,
            authorId: authorId,
            currentUid: currentUser.uid,
            isStaff: true,
            itemType: 'announcement',
            onDelete: async (itemId) => {
              try {
                await deleteAnnouncementAsStaff(itemId);
                const card = btn.closest('.card');
                if (card) {
                  card.style.opacity = '0.3';
                  card.style.pointerEvents = 'none';
                }
              } catch (err) {
                alert(err.message || 'Failed to delete announcement.');
              }
            },
            onEdit: async (itemId) => {
              const card = btn.closest('.card');
              const h2 = card.querySelector('h2');
              const contentEl = card.querySelector('div[style*="line-height: 1.5; margin-bottom: 16px;"]');
              if (!h2 || !contentEl) return;
              
              const currentTitle = h2.innerText;
              const currentText = contentEl.innerText;
              
              const newTitle = prompt('Edit title:', currentTitle);
              if (newTitle === null) return;
              
              const newText = prompt('Edit content:', currentText);
              if (newText === null) return;

              if (newTitle.trim() !== currentTitle.trim() || newText.trim() !== currentText.trim()) {
                try {
                  await editAnnouncement(itemId, newTitle, newText);
                } catch (err) {
                  alert(err.message || 'Failed to edit announcement.');
                }
              }
            }
          });
        });
      });
    }
  });

  return () => {
    if (layoutCleanup) layoutCleanup();
    if (announcementsUnsubscribe) { announcementsUnsubscribe(); announcementsUnsubscribe = null; }
  };
}
