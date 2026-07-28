import { recon    feedContainer.removeEventListener('click', handleFeedClick);
cileFeed } from '../utils/dom.js';
import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { subscribeToFeed, createPost, getUserProfile, toggleLikePost, isPostLikedByUser, isPostResharedByUser, toggleResharePost, deleteOwnPost, toggleSavedPost, isPostSaved, editPost } from '../services/postService.js';
import { createPoll, subscribeToPolls, getUserVote, voteInPoll, toggleLikePoll, isPollLikedByUser, toggleResharePoll, isPollResharedByUser, deleteOwnPoll, deletePollAsStaff } from '../services/pollService.js';
import { getFriendUids } from '../services/friendService.js';
import { deletePostAsStaff, deletePetitionAsStaff } from '../services/adminService.js';
import { reportPost } from '../services/reportService.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { createPostCardHTML } from '../components/PostCard.js';
import { createPollCardHTML } from '../components/PollCard.js';
import { createPetitionCardHTML } from '../components/PetitionCard.js';
import { showContextMenu } from '../components/ContextMenu.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { LIMITS } from '../constants/limits.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';
import { subscribeToPetitions, hasUserSignedPetition, signPetition, deleteOwnPetition } from '../services/petitionService.js';

let feedUnsubscribe = null;
let pollsUnsubscribe = null;
let petitionsUnsubscribe = null;

/** Smoothly animate a card out of the feed and remove from DOM */
function smoothRemoveCard(cardEl) {
  if (!cardEl) return;
  const wrapper = cardEl.closest('.feed-item-wrapper') || cardEl;
  wrapper.style.transition = 'opacity 0.3s ease, transform 0.3s ease, max-height 0.4s ease 0.1s, margin 0.4s ease 0.1s, padding 0.4s ease 0.1s';
  wrapper.style.overflow = 'hidden';
  wrapper.style.maxHeight = wrapper.offsetHeight + 'px';
  // Force reflow
  wrapper.offsetHeight;
  wrapper.style.opacity = '0';
  wrapper.style.transform = 'scale(0.95)';
  wrapper.style.maxHeight = '0px';
  wrapper.style.marginTop = '0px';
  wrapper.style.marginBottom = '0px';
  wrapper.style.paddingTop = '0px';
  wrapper.style.paddingBottom = '0px';
  setTimeout(() => wrapper.remove(), 450);
}

export function renderHome(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  const currentUser = auth.currentUser;
  const avatarHTML = `<div id="composer-avatar-container">${renderUserAvatar(currentUser.photoURL || '', 40)}</div>`;

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

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
            <button type="button" id="inline-add-opt-btn" class="btn btn-outline" style="font-size: 12px; padding: 4px 10px;">
              + Add Option (Max 13)
            </button>
          </div>
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

          <div class="composer-right" style="display: flex; align-items: center; gap: 12px;">
            <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); cursor: pointer;">
              <input type="checkbox" id="post-anonymous-checkbox" style="width: 14px; height: 14px; accent-color: var(--accent-primary); cursor: pointer;" />
              Anonymous
            </label>
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

  // Render Immediately Synchronously
  container.innerHTML = createLayout(content, ROUTES.HOME);
  const layoutCleanup = attachLayoutListeners();

  // Async User Profile & Role check for sidebar & staff moderation powers
  let userRole = 'student';
  let isStaffOrAdmin = false;

  getUserProfile(currentUser.uid).then(profile => {
    if (profile) {
      userRole = profile.role || 'student';
      isStaffOrAdmin = userRole === 'staff' || userRole === 'admin';

      const composerAvatar = document.getElementById('composer-avatar-container');
      if (composerAvatar) {
        composerAvatar.innerHTML = renderUserAvatar(profile, 40);
      }
      
      // Update sidebar nav if admin or staff
      if (userRole === 'admin' || userRole === 'staff') {
        const nav = document.querySelector('.sidebar-nav');
        if (nav && !nav.querySelector('a[href="#/admin"]')) {
          const adminLink = document.createElement('a');
          adminLink.href = ROUTES.ADMIN;
          adminLink.className = 'nav-item';
          adminLink.innerHTML = `
            <span class="material-symbols-outlined">${userRole === 'admin' ? 'admin_panel_settings' : 'shield_person'}</span>
            <span class="sidebar-label">${userRole === 'admin' ? 'Admin' : 'Staff'}</span>
          `;
          nav.appendChild(adminLink);
        }
      }
    }
  }).catch(err => console.error(err));

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
        const isAnonymous = document.getElementById('post-anonymous-checkbox').checked;
        
        if (isPollActive) {
          const optInputs = inlinePollOptsContainer.querySelectorAll('.inline-opt-input');
          const optionTexts = Array.from(optInputs).map(i => i.value.trim()).filter(Boolean);
          
          if (optionTexts.length < 2) {
            alert('A poll must have at least 2 valid options.');
            postBtn.disabled = false;
            postBtn.textContent = 'Post';
            return;
          }
          
          await createPoll(text, optionTexts, isAnonymous);
          
          isPollActive = false;
          inlinePollBuilder.style.display = 'none';
          inlinePollOptsContainer.innerHTML = `
            <input type="text" class="input-field inline-opt-input" placeholder="Option 1" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
            <input type="text" class="input-field inline-opt-input" placeholder="Option 2" style="margin-bottom: 0; padding: 8px 12px; font-size: 14px;" />
          `;
          inlineAddOptBtn.style.display = 'inline-block';
        } else {
          await createPost(text, isAnonymous);
        }

        document.getElementById('post-anonymous-checkbox').checked = false;
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

  // Realtime Combined Timeline Feed (Posts + Polls + Petitions)
  let latestPosts = [];
  let latestPolls = [];
  let latestPetitions = [];

  const loadFeedData = async (combined, currentUid) => {
    const promises = combined.map(async (item) => {
      try {
        if (item._type === 'post') {
          const [author, isLiked, isReshared, isSaved] = await Promise.all([
            getUserProfile(item.authorId),
            isPostLikedByUser(item.postId, currentUid),
            isPostResharedByUser(item.postId, currentUid),
            isPostSaved(item.postId)
          ]);
          return { ...item, author, isLiked, isReshared, isSaved };
        } else if (item._type === 'poll') {
          const [author, userVote, pollLiked, pollReshared] = await Promise.all([
            getUserProfile(item.creatorId),
            getUserVote(item.pollId, currentUid),
            isPollLikedByUser(item.pollId, currentUid),
            isPollResharedByUser(item.pollId, currentUid)
          ]);
          return { ...item, author, userVote, pollLiked, pollReshared };
        } else if (item._type === 'petition') {
          const [author, isSigned] = await Promise.all([
            getUserProfile(item.creatorId),
            hasUserSignedPetition(item.petitionId, currentUid)
          ]);
          return { ...item, author, isSigned };
        }
      } catch (err) {
        console.error('Failed to load data for item:', item, err);
        return null;
      }
    });
    const results = await Promise.all(promises);
    return results.filter(Boolean);
  };

  const renderFeedHtml = (data) => {
    const htmlMap = new Map();
    const orderedKeys = [];

    for (const item of data) {
      let cardHtml = '';
      let id = '';
      if (item._type === 'post') {
        id = `post-${item.postId}`;
        cardHtml = createPostCardHTML(item, item.author, item.isLiked, item.isReshared, item.isSaved);
      } else if (item._type === 'poll') {
        id = `poll-${item.pollId}`;
        cardHtml = createPollCardHTML(item, item.author, item.userVote, item.pollLiked, item.pollReshared);
      } else if (item._type === 'petition') {
        id = `petition-${item.petitionId}`;
        cardHtml = createPetitionCardHTML(item, item.author, item.isSigned);
      }
      
      if (cardHtml) {
        htmlMap.set(id, cardHtml);
        orderedKeys.push(id);
      }
    }
    return { htmlMap, orderedKeys };
  };

  const updateCombinedFeed = async () => {
    if (!feedContainer) return;

    const currentUid = auth.currentUser?.uid;
    if (!currentUid) return;

    let friendUids = [];

    if (activeTabMode === 'friends') {
      friendUids = await getFriendUids(currentUid);
      friendUids.push(currentUid);
    }

    const filteredPosts = activeTabMode === 'friends' 
      ? latestPosts.filter(p => friendUids.includes(p.authorId) && p.status !== 'AWAITING_MODERATION')
      : latestPosts.filter(p => p.status !== 'AWAITING_MODERATION');

    const filteredPolls = activeTabMode === 'friends'
      ? latestPolls.filter(p => friendUids.includes(p.creatorId))
      : latestPolls;

    const filteredPetitions = activeTabMode === 'friends'
      ? latestPetitions.filter(p => friendUids.includes(p.creatorId))
      : latestPetitions;

    const combined = [
      ...filteredPosts.map(p => ({ ...p, _type: 'post' })),
      ...filteredPolls.map(p => ({ ...p, _type: 'poll' })),
      ...filteredPetitions.map(p => ({ ...p, _type: 'petition' }))
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

    const loadedData = await loadFeedData(combined, currentUid);
    const { htmlMap, orderedKeys } = renderFeedHtml(loadedData);

    reconcileFeed(feedContainer, htmlMap, orderedKeys);

    if (combined.length >= 15) {
      let trigger = document.getElementById('load-more-trigger');
      if (!trigger) {
        trigger = document.createElement('div');
        trigger.id = 'load-more-trigger';
        trigger.style.height = '20px';
        trigger.style.width = '100%';
        feedContainer.appendChild(trigger);
      }
      
      if (window.feedObserver) window.feedObserver.disconnect();
      window.feedObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          window.feedObserver.disconnect();
          window.postLimit += 15;
          if (feedUnsubscribe) feedUnsubscribe();
          feedUnsubscribe = subscribeToFeed(window.postLimit, (posts) => {
            latestPosts = posts;
            updateCombinedFeed();
          });
        }
      }, { rootMargin: '200px' });
      
      window.feedObserver.observe(trigger);
    }
  };

  const handleFeedClick = async (e) => {
    const currentUid = auth.currentUser?.uid;
    if (!currentUid) return;

    // Post Like
    const likeBtn = e.target.closest('.like-btn');
    if (likeBtn) {
      e.stopPropagation();
      const postId = likeBtn.dataset.postId;
      likeBtn.disabled = true;
      try {
        const result = await toggleLikePost(postId);
        if (result.liked) {
          likeBtn.classList.add('liked', 'heart-pop');
        } else {
          likeBtn.classList.remove('liked', 'heart-pop');
        }
        const countSpan = likeBtn.querySelector('.like-count');
        if (countSpan) countSpan.textContent = result.likes;
      } catch (err) {
        console.error(err);
      } finally {
        likeBtn.disabled = false;
      }
      return;
    }

    // Post Reshare
    const reshareBtn = e.target.closest('.reshare-btn');
    if (reshareBtn) {
      e.stopPropagation();
      const postId = reshareBtn.dataset.postId;
      reshareBtn.disabled = true;
      try {
        const result = await toggleResharePost(postId);
        if (result.reshared) {
          reshareBtn.classList.add('reshared');
          reshareBtn.style.color = '#00BA7C';
        } else {
          reshareBtn.classList.remove('reshared');
          reshareBtn.style.color = '';
        }
        const countSpan = reshareBtn.querySelector('.reshare-count');
        if (countSpan) countSpan.textContent = result.reshares;
      } catch (err) {
        console.error(err);
      } finally {
        reshareBtn.disabled = false;
      }
      return;
    }

    // Post Save
    const saveBtn = e.target.closest('.save-btn');
    if (saveBtn) {
      e.stopPropagation();
      const postId = saveBtn.dataset.postId;
      saveBtn.disabled = true;
      try {
        const isSaved = await toggleSavedPost(postId);
        if (isSaved) {
          saveBtn.classList.add('saved');
          saveBtn.style.color = 'var(--accent-primary)';
        } else {
          saveBtn.classList.remove('saved');
          saveBtn.style.color = '';
        }
      } catch (err) {
        console.error(err);
      } finally {
        saveBtn.disabled = false;
      }
      return;
    }

    // Post Options
    const postOptionsBtn = e.target.closest('.post-options-btn');
    if (postOptionsBtn) {
      e.stopPropagation();
      const postId = postOptionsBtn.dataset.postId;
      const authorId = postOptionsBtn.dataset.authorId;
      const userProfile = await getUserProfile(currentUid);
      const isStaff = userProfile?.role === 'staff' || userProfile?.role === 'admin';

      showContextMenu(postOptionsBtn, {
        itemId: postId,
        authorId: authorId,
        currentUid: currentUid,
        isStaff: isStaff,
        itemType: 'post',
        onDelete: async (id) => {
          try {
            if (currentUid === authorId) {
              await deleteOwnPost(id);
            } else if (isStaff) {
              await deletePostAsStaff(id);
            }
            smoothRemoveCard(postOptionsBtn.closest('.post-card'));
          } catch (err) {
            alert(err.message || 'Failed to delete post.');
          }
        },
        onReport: async (id, reason) => {
          try {
            const res = await reportPost(id, reason);
            if (res.autoTakenDown) {
              alert('Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.');
              smoothRemoveCard(postOptionsBtn.closest('.post-card'));
            } else {
              alert('Thank you for reporting. Your report has been submitted to SJC Moderation.');
            }
          } catch (err) {
            alert(err.message || 'Failed to submit report.');
          }
        },
        onEdit: async (id) => {
          const card = postOptionsBtn.closest('.post-card');
          const bodyEl = card.querySelector('.post-body');
          if (!bodyEl) return;
          const currentText = bodyEl.innerText;
          const newText = prompt('Edit your post:', currentText);
          if (newText !== null && newText.trim() !== currentText.trim()) {
            try {
              await editPost(id, newText);
            } catch (err) {
              alert(err.message || 'Failed to edit post.');
            }
          }
        }
      });
      return;
    }

    // Poll Options
    const pollOptionsBtn = e.target.closest('.poll-options-btn');
    if (pollOptionsBtn) {
      e.stopPropagation();
      const pollId = pollOptionsBtn.dataset.pollId;
      const creatorId = pollOptionsBtn.dataset.creatorId;
      const userProfile = await getUserProfile(currentUid);
      const isStaff = userProfile?.role === 'staff' || userProfile?.role === 'admin';

      showContextMenu(pollOptionsBtn, {
        itemId: pollId,
        authorId: creatorId,
        currentUid: currentUid,
        isStaff: isStaff,
        itemType: 'poll',
        onDelete: async (id) => {
          try {
            if (currentUid === creatorId) {
              await deleteOwnPoll(id);
            } else if (isStaff) {
              await deletePollAsStaff(id);
            }
            smoothRemoveCard(pollOptionsBtn.closest('.poll-card'));
          } catch (err) {
            alert(err.message || 'Failed to delete poll.');
          }
        },
        onReport: async (id, reason) => {
          try {
            alert('Thank you for reporting. Your report has been submitted to SJC Moderation.');
          } catch (err) {
            alert(err.message || 'Failed to submit report.');
          }
        }
      });
      return;
    }

    // Petition Options
    const petitionOptionsBtn = e.target.closest('.petition-options-btn');
    if (petitionOptionsBtn) {
      e.stopPropagation();
      const petitionId = petitionOptionsBtn.dataset.petitionId;
      const authorId = petitionOptionsBtn.dataset.authorId;
      const userProfile = await getUserProfile(currentUid);
      const isStaff = userProfile?.role === 'staff' || userProfile?.role === 'admin';

      showContextMenu(petitionOptionsBtn, {
        itemId: petitionId,
        authorId: authorId,
        currentUid: currentUid,
        isStaff: isStaff,
        itemType: 'petition',
        onDelete: async (id) => {
          try {
            if (currentUid === authorId) {
              await deleteOwnPetition(id);
            } else if (isStaff) {
              await deletePetitionAsStaff(id);
            }
            smoothRemoveCard(petitionOptionsBtn.closest('.petition-card'));
          } catch (err) {
            alert(err.message || 'Failed to delete petition.');
          }
        },
        onReport: async (id, reason) => {
          try {
            alert('Thank you for reporting. Your report has been submitted to SJC Moderation.');
          } catch (err) {
            alert(err.message || 'Failed to submit report.');
          }
        }
      });
      return;
    }

    // Poll Voting
    const pollOptionBtn = e.target.closest('.poll-option-btn');
    if (pollOptionBtn) {
      e.stopPropagation();
      const pollId = pollOptionBtn.dataset.pollId;
      const optionIndex = parseInt(pollOptionBtn.dataset.optionIndex);

      pollOptionBtn.disabled = true;
      pollOptionBtn.textContent = 'Recording vote...';

      try {
        await voteInPoll(pollId, optionIndex);
      } catch (err) {
        alert(err.message || 'Failed to record vote');
      }
      return;
    }

    // Poll Like
    const pollLikeBtn = e.target.closest('.poll-like-btn');
    if (pollLikeBtn) {
      e.stopPropagation();
      const pollId = pollLikeBtn.dataset.pollId;
      pollLikeBtn.disabled = true;
      try {
        const result = await toggleLikePoll(pollId);
        if (result.liked) {
          pollLikeBtn.classList.add('liked', 'heart-pop');
        } else {
          pollLikeBtn.classList.remove('liked', 'heart-pop');
        }
        const countSpan = pollLikeBtn.querySelector('.like-count');
        if (countSpan) countSpan.textContent = result.likes;
      } catch (err) {
        console.error(err);
      } finally {
        pollLikeBtn.disabled = false;
      }
      return;
    }

    // Poll Reshare
    const pollReshareBtn = e.target.closest('.poll-reshare-btn');
    if (pollReshareBtn) {
      e.stopPropagation();
      const pollId = pollReshareBtn.dataset.pollId;
      pollReshareBtn.disabled = true;
      try {
        const result = await toggleResharePoll(pollId);
        if (result.reshared) {
          pollReshareBtn.classList.add('reshared');
          pollReshareBtn.style.color = '#00BA7C';
        } else {
          pollReshareBtn.classList.remove('reshared');
          pollReshareBtn.style.color = '';
        }
        const countSpan = pollReshareBtn.querySelector('.reshare-count');
        if (countSpan) countSpan.textContent = result.reshares;
      } catch (err) {
        console.error(err);
      } finally {
        pollReshareBtn.disabled = false;
      }
      return;
    }

    // Petition Sign
    const petitionSignBtn = e.target.closest('.petition-sign-btn');
    if (petitionSignBtn) {
      e.stopPropagation();
      const petitionId = petitionSignBtn.dataset.petitionId;
      petitionSignBtn.disabled = true;
      try {
        const result = await toggleSignPetition(petitionId);
        if (result.signed) {
          petitionSignBtn.classList.add('signed');
          petitionSignBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">draw</span> Signed`;
          petitionSignBtn.style.background = 'var(--accent-soft)';
          petitionSignBtn.style.color = 'var(--accent-primary)';
          petitionSignBtn.style.border = '1px solid var(--accent-primary)';
        } else {
          petitionSignBtn.classList.remove('signed');
          petitionSignBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">draw</span> Sign Petition`;
          petitionSignBtn.style.background = 'var(--paper-raised)';
          petitionSignBtn.style.color = 'var(--text-primary)';
          petitionSignBtn.style.border = '1px solid var(--border-color)';
        }
        const card = petitionSignBtn.closest('.petition-card');
        const countSpan = card.querySelector('.signature-count');
        if (countSpan) {
          countSpan.innerHTML = `<b>${result.signatures}</b> signatures`;
        }
      } catch (err) {
        console.error(err);
      } finally {
        petitionSignBtn.disabled = false;
      }
      return;
    }
  };

  feedContainer.addEventListener('click', handleFeedClick);

