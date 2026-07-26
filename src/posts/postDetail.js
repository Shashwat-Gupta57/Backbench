import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { getPostById, createReply, subscribeToReplies } from '../services/replyService.js';
import { getUserProfile, toggleLikePost, getRelatedPosts, deleteOwnPost } from '../services/postService.js';
import { deletePostAsStaff } from '../services/adminService.js';
import { reportPost } from '../services/reportService.js';
import { showContextMenu } from '../components/ContextMenu.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { formatTimeAgo } from '../helpers/time.js';
import { escapeHTML, renderFormattedContent } from '../helpers/formatters.js';
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
  const isTeacher = author?.isTeacher || author?.role === 'teacher';
  const verified = author?.verifiedStudent || author?.role === 'staff' || author?.role === 'admin' || isTeacher;
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
        <a href="#/profile?u=${username}" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit;" title="View @${username}'s profile">
          ${authorAvatarHTML}
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 4px; font-family: ${authorFont};">
              ${name}
              ${isTeacher ? `
                <span class="brand-badge" style="font-size: 10px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
                  <span class="material-symbols-outlined" style="font-size: 12px;">school</span> Faculty
                </span>
              ` : verified ? `
                <span class="material-symbols-outlined verified-icon">verified</span>
              ` : ''}
            </span>
            <span style="color: var(--text-secondary); font-size: 14px;">@${username}</span>
          </div>
        </a>

        <button class="btn-ghost" id="post-detail-options-btn" title="Options">
          <span class="material-symbols-outlined" style="font-size: 20px;">more_horiz</span>
        </button>
      </div>

      <!-- Main Post Content (Large Text with Clickable Hashtags) -->
      <div style="font-size: 19px; line-height: 1.5; color: var(--text-primary); margin-bottom: 16px; word-break: break-word; font-family: ${authorFont};">
        ${renderFormattedContent(post.content)}
      </div>

      <!-- Post Timestamp & Analytics Row -->
      <div style="padding: 12px 0; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary); font-size: 14px; display: flex; gap: 6px;">
        <span>${formattedTime}</span>
        <span>·</span>
        <span>${formattedDate}</span>
      </div>

      <!-- Stat Metrics Row -->
      <div style="padding: 12px 0; border-bottom: 1px solid var(--border-subtle); display: flex; gap: 20px; font-size: 14px;">
        <div><strong style="color: var(--text-primary);">${post.reshares || 0}</strong> <span style="color: var(--text-secondary);">Reshares</span></div>
        <div><strong id="post-likes-stat" style="color: var(--text-primary);">${post.likes || 0}</strong> <span style="color: var(--text-secondary);">Likes</span></div>
      </div>

      <!-- Interactive Actions Row -->
      <div style="display: flex; justify-content: space-around; padding-top: 12px; border-bottom: 1px solid var(--border-subtle);">
        <button class="action-btn" title="Reply">
          <span class="material-symbols-outlined">chat_bubble</span>
        </button>
        <button class="action-btn" title="Reshare">
          <span class="material-symbols-outlined">repeat</span>
        </button>
        <button class="action-btn like-btn" id="post-detail-like-btn" title="Like">
          <span class="material-symbols-outlined">favorite</span>
        </button>
        <button class="action-btn" title="Share">
          <span class="material-symbols-outlined">share</span>
        </button>
      </div>
    </article>

    <!-- Reply Composer -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px;" class="fade-in">
      ${currentAvatarHTML}
      <div style="flex: 1; min-width: 0;">
        <textarea id="reply-input" class="input-field" placeholder="Post your reply..." rows="2" style="resize: none; font-size: 15px; border: none; background: transparent; padding: 0; outline: none; box-shadow: none;"></textarea>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
          <span id="reply-char-counter" style="font-size: 12px; color: var(--text-secondary);">0 / ${LIMITS.REPLY_MAX_LENGTH}</span>
          <button id="submit-reply-btn" class="btn" disabled style="font-size: 14px; padding: 6px 16px;">Reply</button>
        </div>
      </div>
    </div>

    <!-- Live Replies Feed Container -->
    <div id="replies-feed-container">
      ${renderFeedSkeletons(2)}
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.HOME);
  attachLayoutListeners();

  // Load Related Campus Posts recommendation widget in right sidebar
  const rightSidebar = document.querySelector('.right-sidebar');
  if (rightSidebar) {
    getRelatedPosts(post.postId, post.hashtags || [], 3).then(async (related) => {
      if (related && related.length > 0) {
        const relatedCard = document.createElement('div');
        relatedCard.className = 'widget-card fade-in';
        let relHtml = `
          <div class="widget-title">
            <span>Related Campus Posts</span>
            <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 20px;">explore</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
        `;

        for (const rel of related) {
          const relAuthor = await getUserProfile(rel.authorId);
          const relName = relAuthor?.name ? escapeHTML(relAuthor.name) : 'Student';
          relHtml += `
            <div style="cursor: pointer; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);" onclick="window.location.hash='#${ROUTES.POST_DETAIL}?id=${rel.postId}'">
              <div style="color: var(--text-secondary); font-size: 11px; font-weight: 700;">@${escapeHTML(relAuthor?.username || 'student')}</div>
              <div style="color: var(--text-primary); font-weight: 600; line-height: 1.3; margin-top: 2px;">${escapeHTML(rel.content.substring(0, 75))}${rel.content.length > 75 ? '...' : ''}</div>
            </div>
          `;
        }
        relHtml += `</div>`;
        relatedCard.innerHTML = relHtml;
        rightSidebar.insertBefore(relatedCard, rightSidebar.children[1]);
      }
    }).catch(err => console.error(err));
  }

  const replyInput = document.getElementById('reply-input');
  const replyCounter = document.getElementById('reply-char-counter');
  const submitReplyBtn = document.getElementById('submit-reply-btn');
  const repliesContainer = document.getElementById('replies-feed-container');
  const likeBtn = document.getElementById('post-detail-like-btn');
  const likesStat = document.getElementById('post-likes-stat');

  const optionsBtn = document.getElementById('post-detail-options-btn');
  if (optionsBtn) {
    optionsBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const currentUid = auth.currentUser?.uid;
      const currentUserProfile = currentUid ? await getUserProfile(currentUid) : null;
      const isStaff = currentUserProfile?.role === 'staff' || currentUserProfile?.role === 'admin';

      showContextMenu(optionsBtn, {
        itemId: postId,
        authorId: post.authorId,
        currentUid: auth.currentUser?.uid,
        isStaff: isStaff,
        itemType: 'post',
        onDelete: async (id) => {
          try {
            if (auth.currentUser?.uid === post.authorId) {
              await deleteOwnPost(id);
            } else if (isStaff) {
              await deletePostAsStaff(id);
            }
            window.history.back();
          } catch (err) {
            alert(err.message || 'Failed to delete post.');
          }
        },
        onReport: async (id, reason) => {
          try {
            const res = await reportPost(id, reason);
            if (res.autoTakenDown) {
              alert('Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.');
              window.history.back();
            } else {
              alert('Thank you for reporting. Your report has been submitted to SJC Moderation.');
            }
          } catch (err) {
            alert(err.message || 'Failed to submit report.');
          }
        }
      });
    });
  }

  const isLikedInitially = await import('../services/postService.js').then(m => m.isPostLikedByUser(postId, auth.currentUser?.uid));
  if (likeBtn && isLikedInitially) {
    likeBtn.style.color = 'var(--error-color)';
  }

  if (likeBtn) {
    likeBtn.addEventListener('click', async () => {
      likeBtn.disabled = true;
      try {
        const res = await toggleLikePost(postId);
        if (res.liked) {
          likeBtn.style.color = 'var(--error-color)';
        } else {
          likeBtn.style.color = '';
        }
        if (likesStat) likesStat.textContent = res.likes;
      } catch (err) {
        console.error(err);
      } finally {
        likeBtn.disabled = false;
      }
    });
  }

  // Auto-expanding textarea & character limit checker
  replyInput.addEventListener('input', () => {
    const len = replyInput.value.length;
    replyCounter.textContent = `${len} / ${LIMITS.REPLY_MAX_LENGTH}`;

    if (len > LIMITS.REPLY_MAX_LENGTH) {
      replyCounter.style.color = 'var(--error-color)';
      submitReplyBtn.disabled = true;
    } else if (len === 0 || replyInput.value.trim() === '') {
      replyCounter.style.color = 'var(--text-secondary)';
      submitReplyBtn.disabled = true;
    } else {
      replyCounter.style.color = 'var(--accent-primary)';
      submitReplyBtn.disabled = false;
    }
  });

  // Reply Submit Handler
  submitReplyBtn.addEventListener('click', async () => {
    const text = replyInput.value.trim();
    if (text.length > 0 && text.length <= LIMITS.REPLY_MAX_LENGTH) {
      submitReplyBtn.disabled = true;
      submitReplyBtn.textContent = 'Replying...';

      try {
        await createReply(postId, text);
        replyInput.value = '';
        replyInput.dispatchEvent(new Event('input'));
      } catch (err) {
        console.error(err);
        alert('Failed to submit reply. Please try again.');
      } finally {
        submitReplyBtn.textContent = 'Reply';
      }
    }
  });

  // Subscribe to Realtime Replies Feed
  if (repliesUnsubscribe) repliesUnsubscribe();

  repliesUnsubscribe = subscribeToReplies(post.postId, async (replies) => {
    if (!repliesContainer) return;

    if (replies.length === 0) {
      repliesContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <p style="font-size: 14px;">No replies yet. Be the first classmate to reply!</p>
        </div>
      `;
      return;
    }

    let html = '';

    for (const reply of replies) {
      const replyAuthor = await getUserProfile(reply.authorId);
      const replyAvatar = renderUserAvatar(replyAuthor, 38, 'border: 1px solid var(--border-color);');
      const rName = replyAuthor?.name ? escapeHTML(replyAuthor.name) : 'Student';
      const rUsername = replyAuthor?.username ? escapeHTML(replyAuthor.username) : 'student';
      const rIsTeacher = replyAuthor?.isTeacher || replyAuthor?.role === 'teacher';
      const rVerified = replyAuthor?.verifiedStudent || replyAuthor?.role === 'staff' || replyAuthor?.role === 'admin' || rIsTeacher;
      const rFont = getUserFontFamily(replyAuthor);

      html += `
        <div class="fade-in" style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px;">
          ${replyAvatar}
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                <span style="font-weight: 700; font-size: 14px; color: var(--text-primary); font-family: ${rFont};">${rName}</span>
                ${rIsTeacher ? `
                  <span class="brand-badge" style="font-size: 9px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C;">Faculty</span>
                ` : rVerified ? `
                  <span class="material-symbols-outlined verified-icon" style="font-size: 14px;">verified</span>
                ` : ''}
                <span style="font-size: 13px; color: var(--text-secondary);">@${rUsername}</span>
                <span style="color: var(--text-secondary);">·</span>
                <span style="font-size: 13px; color: var(--text-secondary);">${formatTimeAgo(reply.timestamp)}</span>
              </div>
            </div>

            <div style="font-size: 15px; color: var(--text-primary); line-height: 1.4; font-family: ${rFont};">
              ${renderFormattedContent(reply.content)}
            </div>
          </div>
        </div>
      `;
    }

    repliesContainer.innerHTML = html;
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
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">error_outline</span>
      <h2 style="font-size: 20px; font-weight: 800;">Post Unavailable</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${message}</p>
    </div>
  `, ROUTES.HOME);
  attachLayoutListeners();
}
