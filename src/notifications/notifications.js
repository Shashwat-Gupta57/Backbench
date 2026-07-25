import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { auth } from '../firebase/firebase.js';
import { subscribeToUserNotifications, markNotificationAsRead, markAllNotificationsAsRead, clearReadNotifications } from '../services/notificationService.js';
import { formatTimeAgo } from '../helpers/time.js';
import { escapeHTML } from '../helpers/formatters.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { ROUTES } from '../constants/routes.js';

let notifUnsubscribe = null;

export function renderNotifications(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  // Initial skeleton view
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <h1 class="header-title">Notifications</h1>
    </header>
    ${renderFeedSkeletons(3)}
  `, '#/notifications');

  const currentUid = auth.currentUser.uid;

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">notifications</span>
          <h1 class="header-title">Notifications Center</h1>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="mark-all-read-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px;">
            ✓ Mark All Read
          </button>
          <button id="clear-read-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; border-color: var(--border-color);">
            🗑️ Clear Read
          </button>
        </div>
      </div>
    </header>

    <div id="notifications-feed-container" style="padding: 16px;">
      ${renderFeedSkeletons(3)}
    </div>
  `;

  container.innerHTML = createLayout(content, '#/notifications');
  attachLayoutListeners();

  const feedContainer = document.getElementById('notifications-feed-container');
  const markAllBtn = document.getElementById('mark-all-read-btn');
  const clearReadBtn = document.getElementById('clear-read-btn');

  if (markAllBtn) {
    markAllBtn.addEventListener('click', async () => {
      markAllBtn.disabled = true;
      try {
        await markAllNotificationsAsRead(currentUid);
      } catch (err) {
        console.error(err);
      } finally {
        markAllBtn.disabled = false;
      }
    });
  }

  if (clearReadBtn) {
    clearReadBtn.addEventListener('click', async () => {
      clearReadBtn.disabled = true;
      try {
        await clearReadNotifications(currentUid);
      } catch (err) {
        console.error(err);
      } finally {
        clearReadBtn.disabled = false;
      }
    });
  }

  if (notifUnsubscribe) notifUnsubscribe();

  notifUnsubscribe = subscribeToUserNotifications(currentUid, (notifs) => {
    if (!feedContainer) return;

    if (notifs.length === 0) {
      feedContainer.innerHTML = `
        <div style="padding: 60px 20px; text-align: center;" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 56px; color: var(--text-muted); margin-bottom: 12px;">notifications_off</span>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">All Clear!</h2>
          <p style="color: var(--text-secondary); margin-top: 6px; font-size: 14px;">
            You have no notifications or report alerts at this time.
          </p>
        </div>
      `;
      return;
    }

    let html = '';
    notifs.forEach(n => {
      const isUnread = !n.read;
      const isModeration = n.type === 'MODERATION';

      html += `
        <div class="card fade-in notif-item" data-notif-id="${n.notificationId}" data-post-id="${n.postId || ''}" style="padding: 16px; border-radius: 16px; margin-bottom: 12px; border: ${isUnread ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)'}; background: ${isUnread ? 'rgba(29, 155, 240, 0.05)' : 'var(--bg-secondary)'}; cursor: pointer; transition: all 0.2s ease;">
          <div style="display: flex; gap: 12px; align-items: flex-start;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: ${isModeration ? 'rgba(244, 33, 46, 0.15)' : 'var(--bg-tertiary)'}; display: flex; align-items: center; justify-content: center; color: ${isModeration ? 'var(--error-color)' : 'var(--accent-primary)'}; flex-shrink: 0;">
              <span class="material-symbols-outlined" style="font-size: 20px;">
                ${isModeration ? 'warning' : 'notifications'}
              </span>
            </div>

            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span class="brand-badge" style="font-size: 10px; ${isModeration ? 'background: rgba(244, 33, 46, 0.2); color: var(--error-color); border-color: var(--error-color);' : ''}">
                  ${isModeration ? 'MODERATION ALERT' : 'NOTIFICATION'}
                </span>
                <span style="font-size: 12px; color: var(--text-secondary);">${formatTimeAgo(n.timestamp)}</span>
              </div>

              <div style="font-size: 14px; line-height: 1.4; color: var(--text-primary); font-weight: ${isUnread ? '700' : '400'};">
                ${escapeHTML(n.text)}
              </div>

              ${isUnread ? `
                <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                  <button class="btn btn-outline mark-read-btn" data-notif-id="${n.notificationId}" style="font-size: 11px; padding: 4px 10px;">
                    Mark as Read
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    });

    feedContainer.innerHTML = html;

    feedContainer.querySelectorAll('.notif-item').forEach(item => {
      item.addEventListener('click', async (e) => {
        if (!e.target.closest('.mark-read-btn')) {
          const notifId = item.dataset.notifId;
          const postId = item.dataset.postId;
          await markNotificationAsRead(currentUid, notifId);
          if (postId) {
            window.location.hash = `${ROUTES.POST_DETAIL}?id=${postId}`;
          }
        }
      });
    });

    feedContainer.querySelectorAll('.mark-read-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const notifId = btn.dataset.notifId;
        btn.disabled = true;
        await markNotificationAsRead(currentUid, notifId);
      });
    });
  });
}
