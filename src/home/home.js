import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { subscribeToFeed, createPost, getUserProfile, toggleLikePost, isPostLikedByUser } from '../services/postService.js';
import { createPoll } from '../services/pollService.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { createPostCardHTML } from '../components/PostCard.js';
import { LIMITS } from '../constants/limits.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

let feedUnsubscribe = null;

export function renderHome(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  const currentUser = auth.currentUser;
  const avatarInitial = currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'S';

  const content = `
    <!-- Sticky Blur Header -->
    <header class="sticky-header">
      <h1 class="header-title">Home</h1>
      <button class="btn-ghost" title="Refresh Feed" onclick="window.location.reload()">
        <span class="material-symbols-outlined" style="font-size: 20px;">refresh</span>
      </button>
    </header>

    <!-- Top Feed Tabs -->
    <div class="header-tabs">
      <button class="tab-button active">For You</button>
      <button class="tab-button">SJC Campus</button>
    </div>

    <!-- Expanding Composer -->
    <div class="composer">
      <div class="avatar">${avatarInitial}</div>
      <div class="composer-main">
        <textarea id="post-input" placeholder="What's happening at SJC?" rows="2"></textarea>

        <!-- Inline Poll Builder (Hidden by default) -->
        <div id="inline-poll-builder" style="display: none; margin-top: 12px; padding: 12px; background: var(--bg-secondary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);" class="fade-in">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--accent-primary);">Attach Campus Poll</span>
            <button type="button" id="close-poll-btn" class="btn-ghost" style="padding: 2px;" title="Remove Poll">
              <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
            </button>
          </div>
          <input type="text" id="inline-opt-1" class="input-field" placeholder="Option 1" style="margin-bottom: 6px; padding: 8px 12px; font-size: 14px;" />
          <input type="text" id="inline-opt-2" class="input-field" placeholder="Option 2" style="margin-bottom: 6px; padding: 8px 12px; font-size: 14px;" />
          <input type="text" id="inline-opt-3" class="input-field" placeholder="Option 3 (Optional)" style="margin-bottom: 6px; padding: 8px 12px; font-size: 14px;" />
          <input type="text" id="inline-opt-4" class="input-field" placeholder="Option 4 (Optional)" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
        </div>

        <div class="composer-toolbar">
          <div class="composer-icons">
            <button class="composer-icon-btn" title="Add Image (Text-only campus rules)">
              <span class="material-symbols-outlined" style="font-size: 20px;">image</span>
            </button>
            <button class="composer-icon-btn" id="toggle-poll-btn" title="Create Poll">
              <span class="material-symbols-outlined" style="font-size: 20px;">poll</span>
            </button>
            <button class="composer-icon-btn" title="Add Emoji">
              <span class="material-symbols-outlined" style="font-size: 20px;">sentiment_satisfied</span>
            </button>
          </div>

          <div class="composer-right">
            <span id="char-counter" class="char-ring">0 / ${LIMITS.POST_MAX_LENGTH}</span>
            <button id="post-btn" class="btn" disabled>Post</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Feed Container -->
    <div id="feed-container">
      ${renderFeedSkeletons(4)}
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.HOME);
  attachLayoutListeners();

  const postInput = document.getElementById('post-input');
  const charCounter = document.getElementById('char-counter');
  const postBtn = document.getElementById('post-btn');
  const feedContainer = document.getElementById('feed-container');
  const togglePollBtn = document.getElementById('toggle-poll-btn');
  const closePollBtn = document.getElementById('close-poll-btn');
  const inlinePollBuilder = document.getElementById('inline-poll-builder');

  let isPollActive = false;

  togglePollBtn.addEventListener('click', () => {
    isPollActive = !isPollActive;
    inlinePollBuilder.style.display = isPollActive ? 'block' : 'none';
    checkCanPost();
  });

  closePollBtn.addEventListener('click', () => {
    isPollActive = false;
    inlinePollBuilder.style.display = 'none';
    checkCanPost();
  });

  function checkCanPost() {
    const len = postInput.value.length;
    charCounter.textContent = `${len} / ${LIMITS.POST_MAX_LENGTH}`;

    if (len > LIMITS.POST_MAX_LENGTH) {
      charCounter.style.color = 'var(--error-color)';
      postBtn.disabled = true;
    } else if (isPollActive) {
      const opt1 = document.getElementById('inline-opt-1').value.trim();
      const opt2 = document.getElementById('inline-opt-2').value.trim();
      postBtn.disabled = !(len > 0 && opt1.length > 0 && opt2.length > 0);
      charCounter.style.color = 'var(--accent-primary)';
    } else if (len === 0 || postInput.value.trim() === '') {
      charCounter.style.color = 'var(--text-secondary)';
      postBtn.disabled = true;
    } else {
      charCounter.style.color = 'var(--accent-primary)';
      postBtn.disabled = false;
    }
  }

  postInput.addEventListener('input', () => {
    postInput.style.height = 'auto';
    postInput.style.height = Math.max(54, postInput.scrollHeight) + 'px';
    checkCanPost();
  });

  ['inline-opt-1', 'inline-opt-2', 'inline-opt-3', 'inline-opt-4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', checkCanPost);
  });

  // Post Submission
  postBtn.addEventListener('click', async () => {
    const text = postInput.value.trim();
    if (text.length > 0 && text.length <= LIMITS.POST_MAX_LENGTH) {
      postBtn.disabled = true;
      postBtn.textContent = 'Posting...';

      try {
        if (isPollActive) {
          const opt1 = document.getElementById('inline-opt-1').value.trim();
          const opt2 = document.getElementById('inline-opt-2').value.trim();
          const opt3 = document.getElementById('inline-opt-3').value.trim();
          const opt4 = document.getElementById('inline-opt-4').value.trim();
          await createPoll(text, [opt1, opt2, opt3, opt4].filter(Boolean));
          isPollActive = false;
          inlinePollBuilder.style.display = 'none';
        } else {
          await createPost(text);
        }

        postInput.value = '';
        postInput.style.height = '54px';
        postInput.dispatchEvent(new Event('input'));
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to submit post.');
      } finally {
        postBtn.textContent = 'Post';
      }
    }
  });

  // Subscribe to Realtime Feed
  if (feedUnsubscribe) feedUnsubscribe();

  const currentUid = auth.currentUser.uid;

  feedUnsubscribe = subscribeToFeed(LIMITS.FEED_PAGINATION_INITIAL, async (posts) => {
    if (posts.length === 0) {
      feedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">forum</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No posts yet</h3>
          <p style="font-size: 14px;">Be the first student to start the conversation on Backbench!</p>
        </div>
      `;
      return;
    }

    let html = '';
    for (const post of posts) {
      const author = await getUserProfile(post.authorId);
      const isLiked = await isPostLikedByUser(post.postId, currentUid);
      html += createPostCardHTML(post, author, isLiked);
    }

    feedContainer.innerHTML = html;

    // Attach click events for Likes with Atomic Transaction updates
    feedContainer.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const postId = btn.dataset.postId;
        btn.disabled = true;

        try {
          const result = await toggleLikePost(postId);
          if (result.liked) {
            btn.classList.add('liked', 'heart-pop');
          } else {
            btn.classList.remove('liked', 'heart-pop');
          }
          const countSpan = btn.querySelector('.like-count');
          if (countSpan) countSpan.textContent = result.likes;
        } catch (err) {
          console.error(err);
        } finally {
          btn.disabled = false;
        }
      });
    });

    // Clicking post card opens Full Post Detail Page
    feedContainer.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn') && !e.target.closest('.btn-ghost')) {
          const postId = card.dataset.postId;
          if (postId) {
            window.location.hash = `${ROUTES.POST_DETAIL}?id=${postId}`;
          }
        }
      });
    });

    // Clicking reply icon button opens Full Post Detail Page
    feedContainer.querySelectorAll('.reply-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.post-card');
        const postId = card?.dataset.postId;
        if (postId) {
          window.location.hash = `${ROUTES.POST_DETAIL}?id=${postId}`;
        }
      });
    });
  });
}
