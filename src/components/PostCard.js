import { formatTimeAgo } from '../helpers/time.js';
import { escapeHTML, renderFormattedContent } from '../helpers/formatters.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { getUserFontFamily } from '../constants/fonts.js';

export function createPostCardHTML(post, author, isLiked = false, isReshared = false, isSaved = false) {
  const isAnon = post.isAnonymous === true;
  const name = isAnon ? 'Anonymous Student' : (author?.name ? escapeHTML(author.name) : 'Anonymous Student');
  const username = isAnon ? 'anonymous' : (author?.username ? escapeHTML(author.username) : 'student');
  const isTeacher = !isAnon && (author?.isTeacher || author?.role === 'teacher');
  const verified = !isAnon && (author?.verifiedStudent || author?.role === 'staff' || author?.role === 'admin' || isTeacher);
  const fontStyle = getUserFontFamily(author);

  const avatarHTML = isAnon 
    ? `<div class="avatar" style="width: 44px; height: 44px; font-size: 20px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`
    : renderUserAvatar(author, 44, 'border: 1px solid var(--border-color);');
    
  const avatarWrapper = isAnon
    ? `<div style="display: inline-flex;" title="Anonymous Post">${avatarHTML}</div>`
    : `<a href="#/profile?u=${username}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${username}'s profile">${avatarHTML}</a>`;

  const authorNameHTML = isAnon
    ? `<span class="author-name" style="font-family: ${fontStyle};">${name}</span>`
    : `<a href="#/profile?u=${username}" style="text-decoration: none; color: inherit;" title="View @${username}'s profile"><span class="author-name" style="font-family: ${fontStyle};">${name}</span></a>`;

  const authorHandleHTML = isAnon
    ? `<span class="author-handle">@${username}</span>`
    : `<a href="#/profile?u=${username}" style="text-decoration: none; color: inherit;" title="View @${username}'s profile"><span class="author-handle">@${username}</span></a>`;

  return `
    <article class="post-card fade-in" data-post-id="${post.postId}" data-author-id="${post.authorId}">
      ${avatarWrapper}
      <div style="flex: 1; min-width: 0;">
        <div class="post-header">
          <div class="author-meta">
            ${authorNameHTML}
            ${isTeacher ? `
              <span class="brand-badge" style="font-size: 10px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
                <span class="material-symbols-outlined" style="font-size: 12px;">school</span> Faculty
              </span>
            ` : verified ? `
              <span class="material-symbols-outlined verified-icon" title="Verified Member">verified</span>
            ` : ''}
            ${authorHandleHTML}
            <span class="post-dot">·</span>
            <span class="post-time time-ago" data-timestamp="${post.timestamp}">${formatTimeAgo(post.timestamp)}</span>
            ${post.edited ? `<span class="edited-badge" style="font-size: 11px; color: var(--text-secondary); margin-left: 4px; font-style: italic;">(edited)</span>` : ''}
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

          <button class="action-btn save-btn ${isSaved ? 'saved' : ''}" data-post-id="${post.postId}" style="${isSaved ? 'color: var(--accent-primary);' : ''}">
            <span class="material-symbols-outlined">${isSaved ? 'bookmark' : 'bookmark'}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

export function createSavedReplyCardHTML(post, postAuthor, reply, replyAuthor, isSaved = true) {
  const pName = postAuthor?.name ? escapeHTML(postAuthor.name) : 'Anonymous Student';
  const pUsername = postAuthor?.username ? escapeHTML(postAuthor.username) : 'student';
  const pAvatar = renderUserAvatar(postAuthor, 36, 'border: 1px solid var(--border-color);');
  
  const rName = replyAuthor?.name ? escapeHTML(replyAuthor.name) : 'Anonymous Student';
  const rUsername = replyAuthor?.username ? escapeHTML(replyAuthor.username) : 'student';
  const rAvatar = renderUserAvatar(replyAuthor, 36, 'border: 1px solid var(--border-color);');
  
  const rFontStyle = getUserFontFamily(replyAuthor);

  return `
    <div class="saved-reply-container fade-in" style="border-bottom: 1px solid var(--border-color); cursor: pointer;" onclick="window.location.hash = '#/post?id=${post.postId}'">
      <!-- Mini Post Context -->
      <div style="padding: 12px 16px 0 16px; display: flex; gap: 12px;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          ${pAvatar}
          <div style="width: 2px; height: 100%; background: var(--border-color); margin-top: 4px; min-height: 20px;"></div>
        </div>
        <div style="flex: 1; padding-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">${pName}</span>
            <span style="font-size: 13px; color: var(--text-secondary);">@${pUsername}</span>
            <span style="color: var(--text-secondary); font-size: 13px;">· <span class="time-ago" data-timestamp="${post.timestamp}">${formatTimeAgo(post.timestamp)}</span></span>
          </div>
          <div style="font-size: 14px; color: var(--text-secondary); margin-top: 2px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${escapeHTML(post.content).replace(/<[^>]+>/g, '')}
          </div>
        </div>
      </div>
      
      <!-- Reply Content -->
      <div style="padding: 0 16px 16px 16px; display: flex; gap: 12px;">
        <div style="display: flex; flex-direction: column; align-items: center; position: relative;">
          ${rAvatar}
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-weight: 700; font-size: 14px; color: var(--text-primary); font-family: ${rFontStyle};">${rName}</span>
              <span style="font-size: 13px; color: var(--text-secondary);">@${rUsername}</span>
              <span style="color: var(--text-secondary); font-size: 13px;">· <span class="time-ago" data-timestamp="${reply.timestamp}">${formatTimeAgo(reply.timestamp)}</span></span>
            </div>
            <button class="action-btn save-btn saved" style="color: var(--accent-primary); pointer-events: none;">
              <span class="material-symbols-outlined">bookmark</span>
            </button>
          </div>
          <div style="font-family: ${rFontStyle}; font-size: 14px; line-height: 1.5; color: var(--text-primary); margin-top: 4px;">
            ${renderFormattedContent(reply.content)}
          </div>
        </div>
      </div>
    </div>
  `;
}
