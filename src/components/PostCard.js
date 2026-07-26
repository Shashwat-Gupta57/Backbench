import { formatTimeAgo } from '../helpers/time.js';
import { escapeHTML, renderFormattedContent } from '../helpers/formatters.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { getUserFontFamily } from '../constants/fonts.js';

export function createPostCardHTML(post, author, isLiked = false, isReshared = false) {
  const name = author?.name ? escapeHTML(author.name) : 'Anonymous Student';
  const username = author?.username ? escapeHTML(author.username) : 'student';
  const isTeacher = author?.isTeacher || author?.role === 'teacher';
  const verified = author?.verifiedStudent || author?.role === 'staff' || author?.role === 'admin' || isTeacher;
  const fontStyle = getUserFontFamily(author);

  const avatarHTML = renderUserAvatar(author, 44, 'border: 1px solid var(--border-color);');

  return `
    <article class="post-card fade-in" data-post-id="${post.postId}" data-author-id="${post.authorId}">
      ${avatarHTML}
      <div style="flex: 1; min-width: 0;">
        <div class="post-header">
          <div class="author-meta">
            <span class="author-name" style="font-family: ${fontStyle};">${name}</span>
            ${isTeacher ? `
              <span class="brand-badge" style="font-size: 10px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
                <span class="material-symbols-outlined" style="font-size: 12px;">school</span> Faculty
              </span>
            ` : verified ? `
              <span class="material-symbols-outlined verified-icon" title="Verified Member">verified</span>
            ` : ''}
            <span class="author-handle">@${username}</span>
            <span class="post-dot">·</span>
            <span class="post-time">${formatTimeAgo(post.timestamp)}</span>
          </div>
          <button class="btn-ghost post-options-btn" style="padding: 4px;" title="Options" data-post-id="${post.postId}" data-author-id="${post.authorId}">
            <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
          </button>
        </div>
        
        <div class="post-body" style="font-family: ${fontStyle}; font-size: 15px; line-height: 1.5; color: var(--text-primary);">
          ${renderFormattedContent(post.content)}
        </div>
        
        <div class="post-actions">
          <button class="action-btn reply-btn">
            <span class="material-symbols-outlined">chat_bubble</span>
            <span>${post.replyCount || 0}</span>
          </button>
          
          <button class="action-btn reshare-btn ${isReshared ? 'reshared' : ''}" data-post-id="${post.postId}" style="${isReshared ? 'color: #00BA7C;' : ''}">
            <span class="material-symbols-outlined">repeat</span>
            <span class="reshare-count">${post.reshares || 0}</span>
          </button>

          <button class="action-btn like-btn ${isLiked ? 'liked heart-pop' : ''}" data-post-id="${post.postId}">
            <span class="material-symbols-outlined">${isLiked ? 'favorite' : 'favorite'}</span>
            <span class="like-count">${post.likes || 0}</span>
          </button>

          <button class="action-btn">
            <span class="material-symbols-outlined">bookmark</span>
          </button>
        </div>
      </div>
    </article>
  `;
}
