import { reconcileFeed } from '../utils/dom.js';
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
  attachLayoutListeners();

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

  const updateCombinedFeed = async () => {
    if (!feedContainer) return;

    const currentUid = auth.currentUser?.uid;
    if (!currentUid) return;

    let friendUids = [];

    if (activeTabMode === 'friends') {
      friendUids = await getFriendUids(currentUid);
      // Include current user in friends feed so they see their own posts
      friendUids.push(currentUid);
    }

    // Filter items based on active tab & excluded held moderation posts
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

    const htmlMap = new Map();
    const orderedKeys = [];

    for (const item of combined) {
      try {
        let cardHtml = '';
        let id = '';
        if (item._type === 'post') {
          id = `post-${item.postId}`;
          const author = await getUserProfile(item.authorId);
          const isLiked = await isPostLikedByUser(item.postId, currentUid);
          const isReshared = await isPostResharedByUser(item.postId, currentUid);
          const isSaved = await isPostSaved(item.postId);
          cardHtml = createPostCardHTML(item, author, isLiked, isReshared, isSaved);
        } else if (item._type === 'poll') {
          id = `poll-${item.pollId}`;
          const author = await getUserProfile(item.creatorId);
          const userVote = await getUserVote(item.pollId, currentUid);
          const pollLiked = await isPollLikedByUser(item.pollId, currentUid);
          const pollReshared = await isPollResharedByUser(item.pollId, currentUid);
          cardHtml = createPollCardHTML(item, author, userVote, pollLiked, pollReshared);
        } else if (item._type === 'petition') {
          id = `petition-${item.petitionId}`;
          const author = await getUserProfile(item.creatorId);
          const isSigned = await hasUserSignedPetition(item.petitionId, currentUid);
          cardHtml = createPetitionCardHTML(item, author, isSigned);
        }
        
        if (cardHtml) {
          htmlMap.set(id, cardHtml);
          orderedKeys.push(id);
        }
      } catch (err) {
        console.error('Failed to render item:', item, err);
      }
    }

    reconcileFeed(feedContainer, htmlMap, orderedKeys);

    // Append IntersectionObserver Trigger
    if (combined.length >= 15) { // Only add trigger if we have enough items
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

    // Attach Saves for Posts
    feedContainer.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const postId = btn.dataset.postId;
        btn.disabled = true;

        try {
          const isSaved = await toggleSavedPost(postId);
          if (isSaved) {
            btn.classList.add('saved');
            btn.style.color = 'var(--accent-primary)';
          } else {
            btn.classList.remove('saved');
            btn.style.color = '';
          }
        } catch (err) {
          console.error(err);
        } finally {
          btn.disabled = false;
        }
      });
    });

    // Attach Post Options Context Menu
    feedContainer.querySelectorAll('.post-options-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const postId = btn.dataset.postId;
        const authorId = btn.dataset.authorId;
        const userProfile = await getUserProfile(currentUid);
        const isStaff = userProfile?.role === 'staff' || userProfile?.role === 'admin';

        showContextMenu(btn, {
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
              smoothRemoveCard(btn.closest('.post-card'));
            } catch (err) {
              alert(err.message || 'Failed to delete post.');
            }
          },
          onReport: async (id, reason) => {
            try {
              const res = await reportPost(id, reason);
              if (res.autoTakenDown) {
                alert('Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.');
                smoothRemoveCard(btn.closest('.post-card'));
              } else {
                alert('Thank you for reporting. Your report has been submitted to SJC Moderation.');
              }
            } catch (err) {
              alert(err.message || 'Failed to submit report.');
            }
          },
          onEdit: async (id) => {
            const card = btn.closest('.post-card');
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
      });
    });

    // Attach Poll Options Context Menu
    feedContainer.querySelectorAll('.poll-options-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const pollId = btn.dataset.pollId;
        const creatorId = btn.dataset.creatorId;
        const userProfile = await getUserProfile(currentUid);
        const isStaff = userProfile?.role === 'staff' || userProfile?.role === 'admin';

        showContextMenu(btn, {
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
              smoothRemoveCard(btn.closest('.poll-card'));
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
      });
    });

    // Attach Petition Options Context Menu
    feedContainer.querySelectorAll('.petition-options-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const petitionId = btn.dataset.petitionId;
        const authorId = btn.dataset.authorId;
        const userProfile = await getUserProfile(currentUid);
        const isStaff = userProfile?.role === 'staff' || userProfile?.role === 'admin';

        showContextMenu(btn, {
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
              smoothRemoveCard(btn.closest('.petition-card'));
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
      });
    });

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

    // Attach Poll Likes
    feedContainer.querySelectorAll('.poll-like-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const pollId = btn.dataset.pollId;
        btn.disabled = true;
        try {
          const result = await toggleLikePoll(pollId);
          if (result.liked) {
            btn.classList.add('liked', 'heart-pop');
          } else {
            btn.classList.remove('liked', 'heart-pop');
          }
          const countSpan = btn.querySelector('.poll-like-count');
          if (countSpan) countSpan.textContent = result.likes;
        } catch (err) {
          console.error(err);
        } finally {
          btn.disabled = false;
        }
      });
    });

    // Attach Poll Reshares
    feedContainer.querySelectorAll('.poll-reshare-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const pollId = btn.dataset.pollId;
        btn.disabled = true;
        try {
          const result = await toggleResharePoll(pollId);
          if (result.reshared) {
            btn.classList.add('reshared');
            btn.style.color = '#00BA7C';
          } else {
            btn.classList.remove('reshared');
            btn.style.color = '';
          }
          const countSpan = btn.querySelector('.poll-reshare-count');
          if (countSpan) countSpan.textContent = result.reshares;
        } catch (err) {
          console.error(err);
        } finally {
          btn.disabled = false;
        }
      });
    });

    // Poll Reply button opens Poll Detail (reuses post detail route with poll prefix)
    feedContainer.querySelectorAll('.poll-reply-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pollId = btn.dataset.pollId;
        if (pollId) {
          window.location.hash = `#/poll?id=${pollId}`;
        }
      });
    });

    // Clicking post card opens Full Post Detail Page
    feedContainer.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn') && !e.target.closest('.btn-ghost') && !e.target.closest('a')) {
          const postId = card.dataset.postId;
          if (postId) {
            window.location.hash = `${ROUTES.POST_DETAIL}?id=${postId}`;
          }
        }
      });
    });

    // Clicking poll card opens Poll Detail Page
    feedContainer.querySelectorAll('.poll-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn') && !e.target.closest('.btn-ghost') && !e.target.closest('.poll-option-btn') && !e.target.closest('a')) {
          const pollId = card.dataset.pollId;
          if (pollId) {
            window.location.hash = `#/poll?id=${pollId}`;
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

    // Attach Petition Sign buttons
    feedContainer.querySelectorAll('.sign-petition-feed-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const petitionId = btn.dataset.petitionId;
        btn.disabled = true;
        btn.textContent = 'Signing...';
        try {
          await signPetition(petitionId);
          btn.textContent = '✓ Signed';
        } catch (err) {
          alert(err.message || 'Failed to sign petition.');
          btn.disabled = false;
          btn.textContent = '✍️ Sign';
        }
      });
    });

    // Copy Petition Frame Link
    feedContainer.querySelectorAll('.copy-petition-frame-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const petitionId = btn.dataset.petitionId;
        const frameLink = `${window.location.origin}${window.location.pathname}#/petition-frame?id=${petitionId}`;
        navigator.clipboard.writeText(frameLink).then(() => {
          const originalHTML = btn.innerHTML;
          btn.textContent = '✓ Copied!';
          setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
        });
      });
    });
  };

  if (feedUnsubscribe) feedUnsubscribe();
  if (pollsUnsubscribe) pollsUnsubscribe();
  if (petitionsUnsubscribe) petitionsUnsubscribe();

  window.postLimit = 15;

  feedUnsubscribe = subscribeToFeed(window.postLimit, (posts) => {
    latestPosts = posts;
    updateCombinedFeed();
  });

  pollsUnsubscribe = subscribeToPolls(20, (polls) => {
    latestPolls = polls;
    updateCombinedFeed();
  });

  petitionsUnsubscribe = subscribeToPetitions(20, (petitions) => {
    latestPetitions = petitions;
    updateCombinedFeed();
  });
}
