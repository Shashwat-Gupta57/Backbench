import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { subscribeToFeed, createPost, getUserProfile, toggleLikePost, isPostLikedByUser, isPostResharedByUser, toggleResharePost } from '../services/postService.js';
import { createPoll, subscribeToPolls, getUserVote, voteInPoll } from '../services/pollService.js';
import { getFriendUids } from '../services/friendService.js';
import { deletePostAsStaff } from '../services/adminService.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { createPostCardHTML } from '../components/PostCard.js';
import { createPollCardHTML } from '../components/PollCard.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { LIMITS } from '../constants/limits.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

let feedUnsubscribe = null;
let pollsUnsubscribe = null;

export async function renderHome(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  const currentUser = auth.currentUser;
  const userProfile = await getUserProfile(currentUser.uid);
  const userRole = userProfile?.role || 'student';
  const isStaffOrAdmin = userRole === 'staff' || userRole === 'admin';

  const avatarHTML = renderUserAvatar(currentUser.photoURL || '', 40);

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
      <button class="tab-button active" id="tab-for-you">For You</button>
      <button class="tab-button" id="tab-friends">SJC Friends</button>
    </div>

    <!-- Expanding Composer -->
    <div class="composer">
      ${avatarHTML}
      <div class="composer-main">
        <textarea id="post-input" placeholder="What's happening at SJC?" rows="2"></textarea>

        <!-- Inline Dynamic Poll Builder (Up to 13 Options) -->
        <div id="inline-poll-builder" style="display: none; margin-top: 12px; padding: 14px; background: var(--bg-secondary); border-radius: var(--border-radius-sm); border: 1px solid var(--border-color);" class="fade-in">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--accent-primary);">Attach Campus Poll (Up to 13 options)</span>
            <button type="button" id="close-poll-btn" class="btn-ghost" style="padding: 2px;" title="Remove Poll">
              <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
            </button>
          </div>
          
          <div id="inline-poll-options-container" style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px;">
            <input type="text" class="input-field inline-opt-input" placeholder="Option 1" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
            <input type="text" class="input-field inline-opt-input" placeholder="Option 2" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
          </div>

          <button type="button" id="inline-add-opt-btn" class="btn btn-outline" style="font-size: 12px; padding: 4px 10px; margin-top: 4px;">
            + Add Option (Max 13)
          </button>
        </div>

        <div class="composer-toolbar">
          <div class="composer-icons">
            <button class="composer-icon-btn" title="Add Image">
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

    <!-- Combined Home Feed Container (Posts + Polls) -->
    <div id="feed-container">
      ${renderFeedSkeletons(4)}
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.HOME, userRole);
  attachLayoutListeners();

  const postInput = document.getElementById('post-input');
  const charCounter = document.getElementById('char-counter');
  const postBtn = document.getElementById('post-btn');
  const feedContainer = document.getElementById('feed-container');
  const togglePollBtn = document.getElementById('toggle-poll-btn');
  const closePollBtn = document.getElementById('close-poll-btn');
  const inlinePollBuilder = document.getElementById('inline-poll-builder');
  const inlinePollOptsContainer = document.getElementById('inline-poll-options-container');
  const inlineAddOptBtn = document.getElementById('inline-add-opt-btn');
  const tabForYou = document.getElementById('tab-for-you');
  const tabFriends = document.getElementById('tab-friends');

  let isPollActive = false;
  let activeTabMode = 'for-you'; // 'for-you' | 'friends'

  tabForYou.addEventListener('click', () => {
    activeTabMode = 'for-you';
    tabForYou.classList.add('active');
    tabFriends.classList.remove('active');
    updateCombinedFeed();
  });

  tabFriends.addEventListener('click', () => {
    activeTabMode = 'friends';
    tabFriends.classList.add('active');
    tabForYou.classList.remove('active');
    updateCombinedFeed();
  });

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

  inlineAddOptBtn.addEventListener('click', () => {
    const currentInputs = inlinePollOptsContainer.querySelectorAll('.inline-opt-input');
    if (currentInputs.length < 13) {
      const nextIdx = currentInputs.length + 1;
      const newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.className = 'input-field inline-opt-input fade-in';
      newInput.placeholder = `Option ${nextIdx}`;
      newInput.style.marginBottom = '0';
      newInput.style.padding = '8px 12px';
      newInput.style.fontSize = '14px';
      newInput.addEventListener('input', checkCanPost);
      inlinePollOptsContainer.appendChild(newInput);

      if (currentInputs.length + 1 === 13) {
        inlineAddOptBtn.style.display = 'none';
      }
    }
  });

  function checkCanPost() {
    const len = postInput.value.length;
    charCounter.textContent = `${len} / ${LIMITS.POST_MAX_LENGTH}`;

    if (len > LIMITS.POST_MAX_LENGTH) {
      charCounter.style.color = 'var(--error-color)';
      postBtn.disabled = true;
    } else if (isPollActive) {
      const optInputs = inlinePollOptsContainer.querySelectorAll('.inline-opt-input');
      const validOpts = Array.from(optInputs).filter(i => i.value.trim().length > 0);
      postBtn.disabled = !(len > 0 && validOpts.length >= 2);
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

  inlinePollOptsContainer.querySelectorAll('.inline-opt-input').forEach(inp => {
    inp.addEventListener('input', checkCanPost);
  });

  // Submission Handler
  postBtn.addEventListener('click', async () => {
    const text = postInput.value.trim();
    if (text.length > 0 && text.length <= LIMITS.POST_MAX_LENGTH) {
      postBtn.disabled = true;
      postBtn.textContent = 'Posting...';

      try {
        if (isPollActive) {
          const optInputs = inlinePollOptsContainer.querySelectorAll('.inline-opt-input');
          const optionTexts = Array.from(optInputs).map(i => i.value.trim()).filter(Boolean);
          await createPoll(text, optionTexts);
          isPollActive = false;
          inlinePollBuilder.style.display = 'none';
          inlinePollOptsContainer.innerHTML = `
            <input type="text" class="input-field inline-opt-input" placeholder="Option 1" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
            <input type="text" class="input-field inline-opt-input" placeholder="Option 2" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
          `;
          inlineAddOptBtn.style.display = 'inline-block';
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

  // Realtime Combined Timeline Feed (Posts + Polls)
  let latestPosts = [];
  let latestPolls = [];

  const updateCombinedFeed = async () => {
    if (!feedContainer) return;

    const currentUid = auth.currentUser.uid;
    let friendUids = [];

    if (activeTabMode === 'friends') {
      friendUids = await getFriendUids(currentUid);
      // Include current user in friends feed so they see their own posts
      friendUids.push(currentUid);
    }

    // Filter items based on active tab
    const filteredPosts = activeTabMode === 'friends' 
      ? latestPosts.filter(p => friendUids.includes(p.authorId))
      : latestPosts;

    const filteredPolls = activeTabMode === 'friends'
      ? latestPolls.filter(p => friendUids.includes(p.creatorId))
      : latestPolls;

    const combined = [
      ...filteredPosts.map(p => ({ ...p, _type: 'post' })),
      ...filteredPolls.map(p => ({ ...p, _type: 'poll' }))
    ];

    combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (combined.length === 0) {
      feedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">${activeTabMode === 'friends' ? 'group_off' : 'forum'}</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">${activeTabMode === 'friends' ? 'No activity from friends' : 'No campus activity yet'}</h3>
          <p style="font-size: 14px;">${activeTabMode === 'friends' ? 'Add more classmates as friends to see their activity here!' : 'Be the first student to post or create a poll on Backbench!'}</p>
        </div>
      `;
      return;
    }

    let html = '';

    for (const item of combined) {
      if (item._type === 'post') {
        const author = await getUserProfile(item.authorId);
        const isLiked = await isPostLikedByUser(item.postId, currentUid);
        const isReshared = await isPostResharedByUser(item.postId, currentUid);
        html += createPostCardHTML(item, author, isLiked, isReshared);
      } else if (item._type === 'poll') {
        const author = await getUserProfile(item.creatorId);
        const userVote = await getUserVote(item.pollId, currentUid);
        html += createPollCardHTML(item, author, userVote);
      }
    }

    feedContainer.innerHTML = html;

    // Attach Likes for Posts
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

    // Attach Reshares for Posts
    feedContainer.querySelectorAll('.reshare-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const postId = btn.dataset.postId;
        btn.disabled = true;

        try {
          const result = await toggleResharePost(postId);
          if (result.reshared) {
            btn.classList.add('reshared');
            btn.style.color = '#00BA7C';
          } else {
            btn.classList.remove('reshared');
            btn.style.color = '';
          }
          const countSpan = btn.querySelector('.reshare-count');
          if (countSpan) countSpan.textContent = result.reshares;
        } catch (err) {
          console.error(err);
        } finally {
          btn.disabled = false;
        }
      });
    });

    // Attach Staff Takedown Powers
    if (isStaffOrAdmin) {
      feedContainer.querySelectorAll('.post-card').forEach(card => {
        const optionsBtn = card.querySelector('.btn-ghost[title="Options"]');
        if (optionsBtn) {
          optionsBtn.title = "Staff Takedown Powers";
          optionsBtn.style.color = "var(--error-color)";
          optionsBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const postId = card.dataset.postId;
            if (confirm('🛡️ Staff Moderation Action:\nDo you want to put down (delete) this post from Backbench?')) {
              try {
                await deletePostAsStaff(postId);
                card.style.opacity = '0.3';
                card.style.pointerEvents = 'none';
              } catch (err) {
                alert(err.message || 'Failed to delete post.');
              }
            }
          });
        }
      });
    }

    // Attach Poll Voting for Polls on Home Feed
    feedContainer.querySelectorAll('.poll-option-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const pollId = btn.dataset.pollId;
        const optionIndex = parseInt(btn.dataset.optionIndex);

        btn.disabled = true;
        btn.textContent = 'Recording vote...';

        try {
          await voteInPoll(pollId, optionIndex);
        } catch (err) {
          alert(err.message || 'Failed to record vote');
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

    // Reply button opens Post Detail
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
  };

  if (feedUnsubscribe) feedUnsubscribe();
  if (pollsUnsubscribe) pollsUnsubscribe();

  feedUnsubscribe = subscribeToFeed(LIMITS.FEED_PAGINATION_INITIAL, (posts) => {
    latestPosts = posts;
    updateCombinedFeed();
  });

  pollsUnsubscribe = subscribeToPolls(20, (polls) => {
    latestPolls = polls;
    updateCombinedFeed();
  });
}
