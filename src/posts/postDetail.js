import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { getPostById, createReply, subscribeToReplies } from '../services/replyService.js';
import { getUserProfile, toggleLikePost } from '../services/postService.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { formatTimeAgo } from '../helpers/time.js';
import { escapeHTML } from '../helpers/formatters.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { getUserFontFamily } from '../constants/fonts.js';
import { LIMITS } from '../constants/limits.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

let repliesUnsubscribe = null;

export async function renderPostDetail(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  // Skeleton view during initial load
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Post</h1>
      </div>
    </header>
    ${renderFeedSkeletons(2)}
  `, ROUTES.HOME);

  // Extract postId from URL hash e.g. #/post?id=-O1234
  const hash = window.location.hash;
  let postId = null;

  if (hash.includes('?id=')) {
    postId = hash.split('?id=')[1];
  }

  if (!postId) {
    renderNotFound(container, 'No post ID provided.');
    return;
  }

  const post = await getPostById(postId);
  if (!post) {
    renderNotFound(container, 'This post has been deleted or does not exist.');
    return;
  }

  const author = await getUserProfile(post.authorId);
  const currentUser = auth.currentUser;
  const currentAvatarHTML = renderUserAvatar(currentUser.photoURL || '', 40);

  const authorAvatarHTML = renderUserAvatar(author, 48, 'border: 1px solid var(--border-color);');
  const name = author?.name ? escapeHTML(author.name) : 'Anonymous Student';
  const username = author?.username ? escapeHTML(author.username) : 'student';
  const verified = author?.verifiedStudent || author?.role === 'staff' || author?.role === 'admin';
  const authorFont = getUserFontFamily(author);

  const postDate = new Date(post.timestamp || Date.now());
  const formattedTime = postDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const formattedDate = postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Post</h1>
      </div>
    </header>

    <!-- Main Full Post View -->
    <article class="fade-in" style="padding: 16px; border-bottom: 1px solid var(--border-color);">
      <!-- Author Meta -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          ${authorAvatarHTML}
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 4px; font-family: ${authorFont};">
              ${name}
              ${verified ? `<span class="material-symbols-outlined verified-icon">verified</span>` : ''}
            </span>
            <span style="color: var(--text-secondary); font-size: 14px;">@${username}</span>
          </div>
        </div>

        <button class="btn-ghost" title="Options">
          <span class="material-symbols-outlined" style="font-size: 20px;">more_horiz</span>
        </button>
      </div>

      <!-- Main Post Content (Large Text) -->
      <div style="font-size: 19px; line-height: 1.5; color: var(--text-primary); margin-bottom: 16px; word-break: break-word; white-space: pre-line; font-family: ${authorFont};">
        ${escapeHTML(post.content)}
      </div>

      <!-- Time & Date -->
      <div style="color: var(--text-secondary); font-size: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
        ${formattedTime} · ${formattedDate}
      </div>

      <!-- Stats Bar -->
      <div style="display: flex; gap: 20px; padding: 12px 0; border-bottom: 1px solid var(--border-subtle); font-size: 14px; color: var(--text-secondary);">
        <div><strong style="color: var(--text-primary);">${post.likes || 0}</strong> Likes</div>
        <div><strong style="color: var(--text-primary);" id="main-reply-count">${post.replyCount || 0}</strong> Replies</div>
      </div>

      <!-- Action Toolbar -->
      <div style="display: flex; justify-content: space-around; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary);">
        <button class="action-btn reply-btn" id="focus-reply-btn">
          <span class="material-symbols-outlined">chat_bubble</span>
        </button>
        <button class="action-btn like-btn" id="main-like-btn" data-post-id="${post.postId}">
          <span class="material-symbols-outlined">favorite</span>
        </button>
        <button class="action-btn">
          <span class="material-symbols-outlined">repeat</span>
        </button>
        <button class="action-btn">
          <span class="material-symbols-outlined">bookmark</span>
        </button>
      </div>
    </article>

    <!-- Reply Composer -->
    <div class="composer" style="border-bottom: 1px solid var(--border-color);">
      ${currentAvatarHTML}
      <div class="composer-main">
        <textarea id="reply-input" placeholder="Post your reply" rows="2"></textarea>

        <div class="composer-toolbar">
          <div class="composer-icons">
            <button class="composer-icon-btn" title="Add Emoji">
              <span class="material-symbols-outlined" style="font-size: 20px;">sentiment_satisfied</span>
            </button>
          </div>

          <div class="composer-right">
            <span id="reply-char-counter" class="char-ring">0 / ${LIMITS.REPLY_MAX_LENGTH}</span>
            <button id="submit-reply-btn" class="btn" disabled>Reply</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Replies Feed Container -->
    <div id="replies-feed-container">
      ${renderFeedSkeletons(2)}
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.HOME);
  attachLayoutListeners();

  const replyInput = document.getElementById('reply-input');
  const replyCharCounter = document.getElementById('reply-char-counter');
  const submitReplyBtn = document.getElementById('submit-reply-btn');
  const focusReplyBtn = document.getElementById('focus-reply-btn');
  const repliesFeedContainer = document.getElementById('replies-feed-container');
  const mainLikeBtn = document.getElementById('main-like-btn');
  const mainReplyCount = document.getElementById('main-reply-count');

  if (focusReplyBtn) {
    focusReplyBtn.addEventListener('click', () => {
      replyInput.focus();
    });
  }

  // Like Main Post
  if (mainLikeBtn) {
    mainLikeBtn.addEventListener('click', async () => {
      mainLikeBtn.classList.toggle('liked');
      mainLikeBtn.classList.add('heart-pop');
      try {
        await toggleLikePost(post.postId);
      } catch (err) {
        console.error(err);
      }
    });
  }

  // Reply Input Logic
  replyInput.addEventListener('input', () => {
    replyInput.style.height = 'auto';
    replyInput.style.height = Math.max(54, replyInput.scrollHeight) + 'px';

    const len = replyInput.value.length;
    replyCharCounter.textContent = `${len} / ${LIMITS.REPLY_MAX_LENGTH}`;

    if (len > LIMITS.REPLY_MAX_LENGTH) {
      replyCharCounter.style.color = 'var(--error-color)';
      submitReplyBtn.disabled = true;
    } else if (len === 0 || replyInput.value.trim() === '') {
      replyCharCounter.style.color = 'var(--text-secondary)';
      submitReplyBtn.disabled = true;
    } else {
      replyCharCounter.style.color = 'var(--accent-primary)';
      submitReplyBtn.disabled = false;
    }
  });

  // Submit Reply
  submitReplyBtn.addEventListener('click', async () => {
    const text = replyInput.value.trim();
    if (text.length > 0 && text.length <= LIMITS.REPLY_MAX_LENGTH) {
      submitReplyBtn.disabled = true;
      submitReplyBtn.textContent = 'Replying...';

      try {
        await createReply(post.postId, text);
        replyInput.value = '';
        replyInput.style.height = '54px';
        replyInput.dispatchEvent(new Event('input'));
        
        // Optimistically increment reply count
        const currentCount = parseInt(mainReplyCount.textContent) || 0;
        mainReplyCount.textContent = currentCount + 1;
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to submit reply.');
      } finally {
        submitReplyBtn.textContent = 'Reply';
      }
    }
  });

  // Subscribe to Realtime Replies
  if (repliesUnsubscribe) repliesUnsubscribe();

  repliesUnsubscribe = subscribeToReplies(post.postId, async (replies) => {
    if (replies.length === 0) {
      repliesFeedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 36px; margin-bottom: 8px; color: var(--text-muted);">chat_bubble_outline</span>
          <p style="font-size: 14px;">No replies yet. Be the first to reply to ${name}!</p>
        </div>
      `;
      return;
    }

    let html = '';
    for (const reply of replies) {
      const replyAuthor = await getUserProfile(reply.authorId);
      const replyAvatarHTML = renderUserAvatar(replyAuthor, 40);
      const rName = replyAuthor?.name ? escapeHTML(replyAuthor.name) : 'Student';
      const rUsername = replyAuthor?.username ? escapeHTML(replyAuthor.username) : 'student';
      const replyFont = getUserFontFamily(replyAuthor);

      html += `
        <article class="post-card fade-in" style="border-bottom: 1px solid var(--border-color);">
          ${replyAvatarHTML}
          <div style="flex: 1; min-width: 0;">
            <div class="post-header">
              <div class="author-meta">
                <span class="author-name" style="font-family: ${replyFont};">${rName}</span>
                <span class="author-handle">@${rUsername}</span>
                <span class="post-dot">·</span>
                <span class="post-time">${formatTimeAgo(reply.timestamp)}</span>
              </div>
            </div>
            
            <div style="color: var(--text-secondary); font-size: 13px; margin-bottom: 4px;">
              Replying to <span style="color: var(--accent-primary);">@${username}</span>
            </div>

            <div class="post-body" style="font-family: ${replyFont};">
              ${escapeHTML(reply.content)}
            </div>
          </div>
        </article>
      `;
    }

    repliesFeedContainer.innerHTML = html;
  });
}

function renderNotFound(container, message) {
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Post</h1>
      </div>
    </header>
    <div style="padding: 60px 20px; text-align: center;" class="fade-in">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">search_off</span>
      <h2 style="font-size: 20px; font-weight: 800;">Post Unavailable</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${message}</p>
    </div>
  `, ROUTES.HOME);
  attachLayoutListeners();
}
