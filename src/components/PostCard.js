import { formatTimeAgo } from '../helpers/time.js';
import { escapeHTML } from '../helpers/formatters.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { getUserFontFamily } from '../constants/fonts.js';

export function createPostCardHTML(post, author, isLiked = false) {
  const name = author?.name ? escapeHTML(author.name) : 'Anonymous Student';
  const username = author?.username ? escapeHTML(author.username) : 'student';
  const verified = author?.verifiedStudent || author?.role === 'staff' || author?.role === 'admin';
  const fontStyle = getUserFontFamily(author);

  const avatarHTML = renderUserAvatar(author, 44, 'border: 1px solid var(--border-color);');

  return `
    <article class="post-card fade-in" data-post-id="${post.postId}">
      ${avatarHTML}
      <div style="flex: 1; min-width: 0;">
        <div class="post-header">
          <div class="author-meta">
            <span class="author-name" style="font-family: ${fontStyle};">${name}</span>
            ${verified ? `<span class="material-symbols-outlined verified-icon" title="Verified Member">verified</span>` : ''}
            <span class="author-handle">@${username}</span>
            <span class="post-dot">·</span>
            <span class="post-time">${formatTimeAgo(post.timestamp)}</span>
          </div>
          <button class="btn-ghost" style="padding: 4px;" title="Options">
            <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
          </button>
        </div>
        
        <div class="post-body" style="font-family: ${fontStyle};">
          ${escapeHTML(post.content)}
        </div>
        
        <div class="post-actions">
          <button class="action-btn reply-btn">
            <span class="material-symbols-outlined">chat_bubble</span>
            <span>${post.replyCount || 0}</span>
          </button>
          
          <button class="action-btn like-btn ${isLiked ? 'liked heart-pop' : ''}" data-post-id="${post.postId}">
            <span class="material-symbols-outlined">${isLiked ? 'favorite' : 'favorite'}</span>
            <span class="like-count">${post.likes || 0}</span>
          </button>
          
          <button class="action-btn">
            <span class="material-symbols-outlined">repeat</span>
            <span>0</span>
          </button>

          <button class="action-btn">
            <span class="material-symbols-outlined">bookmark</span>
          </button>
        </div>
      </div>
    </article>
  `;
}
