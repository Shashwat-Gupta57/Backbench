import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { auth, db } from '../firebase/firebase.js';
import { ref, get } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { ROUTES } from '../constants/routes.js';
import { PRESET_BANNERS } from '../constants/banners.js';
import { PRESET_QUOTE_STYLES, PRESET_QUOTE_FONTS, getQuoteFontFamily } from '../constants/quotes.js';
import { PRESET_USER_FONTS, getUserFontFamily } from '../constants/fonts.js';
import { getUserProfile, updateUserProfile, subscribeToUserPosts, isPostLikedByUser, toggleLikePost, isPostResharedByUser, toggleResharePost, getLikedPostsByUser, deleteOwnPost } from '../services/postService.js';
import { deletePostAsStaff } from '../services/adminService.js';
import { reportPost } from '../services/reportService.js';
import { showContextMenu } from '../components/ContextMenu.js';
import { isFriend, toggleAddFriend, getFriendsCount, getFriendsProfiles } from '../services/friendService.js';
import { processProfilePicture } from '../helpers/image.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { validateUsername } from '../helpers/validation.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { createPostCardHTML } from '../components/PostCard.js';

export async function renderProfile(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  // Initial loading skeleton
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Profile</h1>
      </div>
    </header>
    ${renderFeedSkeletons(2)}
  `, ROUTES.PROFILE);

  const hash = window.location.hash;
  let targetUsername = null;
  let rawTargetParam = '';

  if (hash.includes('?u=')) {
    rawTargetParam = hash.split('?u=')[1] || '';
    if (rawTargetParam) {
      targetUsername = decodeURIComponent(rawTargetParam).trim().replace(/^[@\-\s]+/, '');
    }
  }

  let userProfile = null;

  try {
    if (targetUsername) {
      const cleanTarget = targetUsername.toLowerCase().replace(/^[@\-\s]+/, '');
      const usersRef = ref(db, PATHS.USERS);
      const allSnap = await get(usersRef);

      if (allSnap.exists()) {
        allSnap.forEach((childSnap) => {
          if (userProfile) return;
          const u = childSnap.val();
          if (!u) return;

          const uName = (u.username || '').toLowerCase().replace(/^[@\-\s]+/, '');
          const uUid = (u.uid || '');
          const uEmail = (u.email || '').toLowerCase();
          const uFullName = (u.name || '').toLowerCase();

          if (
            uName === cleanTarget ||
            uUid === targetUsername ||
            uUid === rawTargetParam ||
            uEmail === cleanTarget ||
            (uName && cleanTarget && (uName.includes(cleanTarget) || cleanTarget.includes(uName))) ||
            (uFullName && cleanTarget && uFullName.includes(cleanTarget))
          ) {
            userProfile = u;
          }
        });
      }
    } else {
      userProfile = await getUserProfile(auth.currentUser.uid);
    }
  } catch (err) {
    console.error('Error loading profile:', err);
  }

  // Fallback to current user if lookup failed and no target parameter was provided
  if (!userProfile && !targetUsername) {
    userProfile = await getUserProfile(auth.currentUser.uid);
  }

  // If user profile is not found at all
  if (!userProfile) {
    container.innerHTML = createLayout(`
      <header class="sticky-header">
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="btn-ghost" onclick="window.history.back()">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="header-title">Profile</h1>
        </div>
      </header>
      <div style="padding: 60px 20px; text-align: center;" class="fade-in">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">person_off</span>
        <h2 style="font-size: 20px; font-weight: 800;">User not found</h2>
        <p style="color: var(--text-secondary); margin-top: 4px;">The student profile "@${escapeHTML(targetUsername || 'user')}" does not exist on Backbench.</p>
      </div>
    `, ROUTES.PROFILE);
    attachLayoutListeners();
    return;
  }

  const isOwnProfile = auth.currentUser.uid === userProfile.uid;
  const userFontFamily = getUserFontFamily(userProfile);
  const quoteFontFamily = getQuoteFontFamily(userProfile.quoteFontId);

  // Check friended status if viewing someone else's profile
  let friended = false;
  if (!isOwnProfile) {
    friended = await isFriend(userProfile.uid);
  }

  // Fetch friends count
  const friendsCount = await getFriendsCount(userProfile.uid);

  // Banner & Quote Theme Resolution
  const selectedBannerObj = PRESET_BANNERS.find(b => b.id === userProfile.bannerPreset) || PRESET_BANNERS[0];
  const bannerBg = userProfile.bannerCustom || selectedBannerObj.gradient;

  const selectedQuoteObj = PRESET_QUOTE_STYLES.find(q => q.id === userProfile.quotePreset) || PRESET_QUOTE_STYLES[0];
  const quoteBg = selectedQuoteObj.bg;
  const quoteBorder = selectedQuoteObj.border;
  const quoteAccent = selectedQuoteObj.accent;

  const initial = userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'S';
  const pfpHTML = userProfile.profilePicture
    ? `<img src="${userProfile.profilePicture}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`
    : `<div class="avatar" style="width: 100%; height: 100%; font-size: 36px; border-radius: 50%;">${initial}</div>`;

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div style="display: flex; flex-direction: column;">
          <h1 class="header-title" style="font-family: ${userFontFamily};">${escapeHTML(userProfile.name || 'Student')}</h1>
          <span style="font-size: 12px; color: var(--text-secondary);" id="profile-post-count-header">0 Posts</span>
        </div>
      </div>
    </header>

    <!-- Cover Banner -->
    <div style="height: 150px; background: ${bannerBg}; width: 100%; position: relative;"></div>

    <!-- Profile Header Info -->
    <div style="padding: 0 16px 16px 16px; position: relative;" class="fade-in">
      
      <!-- Avatar & Action Buttons Row -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: -45px; margin-bottom: 12px;">
        <div style="width: 90px; height: 90px; border-radius: 50%; border: 4px solid var(--bg-primary); background: var(--bg-secondary); overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.5);">
          ${pfpHTML}
        </div>

        <div>
          ${isOwnProfile ? `
            <button id="edit-profile-btn" class="btn btn-outline" style="font-weight: 700;">Edit Profile</button>
          ` : `
            <button id="profile-friend-btn" class="btn ${friended ? 'btn-outline' : ''}">
              ${friended ? 'Friends' : '+ Add Friend'}
            </button>
          `}
        </div>
      </div>

      <!-- Names & Badges -->
      <div style="display: flex; flex-direction: column; gap: 2px;">
        <h2 style="font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 6px; font-family: ${userFontFamily};">
          ${escapeHTML(userProfile.name || 'Student')}
          ${userProfile.isTeacher ? `
            <span class="brand-badge" style="font-size: 11px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 2px;">
              <span class="material-symbols-outlined" style="font-size: 13px;">school</span> Faculty
            </span>
          ` : (userProfile.verifiedStudent || userProfile.role === 'staff' || userProfile.role === 'admin') ? `
            <span class="material-symbols-outlined verified-icon" style="font-size: 20px;">verified</span>
          ` : ''}
        </h2>
        <span style="font-size: 14px; color: var(--text-secondary);">@${escapeHTML(userProfile.username || 'student')}</span>
      </div>

      <!-- Bio / Description -->
      ${userProfile.bio ? `
        <div style="margin-top: 10px; font-size: 14px; color: var(--text-primary); line-height: 1.4; font-family: ${userFontFamily};">
          ${escapeHTML(userProfile.bio)}
        </div>
      ` : ''}

      <!-- Custom Campus Quote Banner -->
      ${userProfile.tagline ? `
        <div style="margin-top: 12px; padding: 12px 16px; border-radius: 12px; background: ${quoteBg}; border: ${quoteBorder}; display: flex; align-items: center; gap: 10px;">
          <span class="material-symbols-outlined" style="color: ${quoteAccent}; font-size: 22px;">format_quote</span>
          <span style="font-size: 14px; font-style: italic; color: var(--text-primary); font-family: ${quoteFontFamily};">
            “${escapeHTML(userProfile.tagline)}”
          </span>
        </div>
      ` : ''}

      <!-- Meta Info Pills (Class, Admission, Mobile, Joined Date) -->
      <div style="display: flex; flex-wrap: wrap; gap: 14px; margin-top: 14px; font-size: 13px; color: var(--text-secondary);">
        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">school</span>
          <span>Class ${escapeHTML(userProfile.class || 'N/A')}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">badge</span>
          <span>Adm: ${escapeHTML(userProfile.admissionNumber || 'N/A')}</span>
        </div>

        ${userProfile.mobile ? `
          <div style="display: flex; align-items: center; gap: 4px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">call</span>
            <span>${escapeHTML(userProfile.mobile)}</span>
          </div>
        ` : ''}

        <div style="display: flex; align-items: center; gap: 4px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">calendar_today</span>
          <span>Joined ${new Date(userProfile.joinedDate || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      <!-- Friends Counter Pill -->
      <div style="margin-top: 12px; font-size: 14px; display: flex; gap: 16px;">
        <span style="color: var(--text-secondary);">
          <strong style="color: var(--text-primary);">${friendsCount}</strong> Friends
        </span>
      </div>
    </div>

    <!-- Profile Tabs -->
    <div class="header-tabs">
      <button class="tab-button active" id="profile-tab-posts">Posts</button>
      <button class="tab-button" id="profile-tab-likes">Likes</button>
    </div>

    <!-- Feed Container -->
    <div id="profile-feed-container">
      ${renderFeedSkeletons(3)}
    </div>

    <!-- Edit Profile Modal Overlay (Only rendered for own profile) -->
    ${isOwnProfile ? renderEditProfileModal(userProfile) : ''}
  `;

  container.innerHTML = createLayout(content, ROUTES.PROFILE);
  attachLayoutListeners();

  const profileFeedContainer = document.getElementById('profile-feed-container');
  const postCountHeader = document.getElementById('profile-post-count-header');
  const tabPosts = document.getElementById('profile-tab-posts');
  const tabLikes = document.getElementById('profile-tab-likes');

  // Handle Friend Toggle Action
  const friendBtn = document.getElementById('profile-friend-btn');
  if (friendBtn) {
    friendBtn.addEventListener('click', async () => {
      friendBtn.disabled = true;
      try {
        const nowFriend = await toggleAddFriend(userProfile.uid);
        friendBtn.textContent = nowFriend ? 'Friends' : '+ Add Friend';
        friendBtn.className = `btn ${nowFriend ? 'btn-outline' : ''}`;
      } catch (err) {
        alert(err.message || 'Failed to update friend status');
      } finally {
        friendBtn.disabled = false;
      }
    });
  }

  // Subscribe to User Posts Feed
  let userPostsUnsub = null;

  userPostsUnsub = subscribeToUserPosts(userProfile.uid, async (posts) => {
    if (!profileFeedContainer) return;

    if (postCountHeader) {
      postCountHeader.textContent = `${posts.length} Post${posts.length === 1 ? '' : 's'}`;
    }

    if (posts.length === 0) {
      profileFeedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">post_add</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No posts yet</h3>
          <p style="font-size: 14px;">When ${isOwnProfile ? 'you post' : 'this student posts'}, their content will appear here.</p>
        </div>
      `;
      return;
    }

    let html = '';
    const currentUid = auth.currentUser.uid;

    for (const post of posts) {
      const isLiked = await isPostLikedByUser(post.postId, currentUid);
      const isReshared = await isPostResharedByUser(post.postId, currentUid);
      html += createPostCardHTML(post, userProfile, isLiked, isReshared);
    }

    profileFeedContainer.innerHTML = html;

    // Attach Post Card Listeners
    profileFeedContainer.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn') && !e.target.closest('.btn-ghost') && !e.target.closest('a')) {
          const postId = card.dataset.postId;
          if (postId) {
            window.location.hash = `${ROUTES.POST_DETAIL}?id=${postId}`;
          }
        }
      });
    });

    profileFeedContainer.querySelectorAll('.like-btn').forEach(btn => {
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

    profileFeedContainer.querySelectorAll('.post-options-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const postId = btn.dataset.postId;
        const authorId = btn.dataset.authorId;
        const currentUid = auth.currentUser?.uid;
        const currentUserProfile = currentUid ? await getUserProfile(currentUid) : null;
        const isStaff = currentUserProfile?.role === 'staff' || currentUserProfile?.role === 'admin';

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
              const card = btn.closest('.post-card');
              if (card) {
                card.style.opacity = '0.3';
                card.style.pointerEvents = 'none';
              }
            } catch (err) {
              alert(err.message || 'Failed to delete post.');
            }
          },
          onReport: async (id, reason) => {
            try {
              const res = await reportPost(id, reason);
              if (res.autoTakenDown) {
                alert('Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.');
                const card = btn.closest('.post-card');
                if (card) {
                  card.style.opacity = '0.2';
                  card.style.pointerEvents = 'none';
                }
              } else {
                alert('Thank you for reporting. Your report has been submitted to SJC Moderation.');
              }
            } catch (err) {
              alert(err.message || 'Failed to submit report.');
            }
          }
        });
      });
    });
  });

  // Likes Tab: Show posts the profile user has liked
  let activeProfileTab = 'posts';

  async function loadLikedPosts() {
    if (!profileFeedContainer) return;
    profileFeedContainer.innerHTML = renderFeedSkeletons(3);

    const likedPosts = await getLikedPostsByUser(userProfile.uid);

    if (likedPosts.length === 0) {
      profileFeedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">favorite</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No liked posts yet</h3>
          <p style="font-size: 14px;">When ${isOwnProfile ? 'you like' : 'this student likes'} a post, it will appear here.</p>
        </div>
      `;
      return;
    }

    let html = '';
    const currentUid = auth.currentUser?.uid;

    for (const post of likedPosts) {
      const author = await getUserProfile(post.authorId);
      const isLiked = currentUid ? await isPostLikedByUser(post.postId, currentUid) : false;
      const isReshared = currentUid ? await isPostResharedByUser(post.postId, currentUid) : false;
      html += createPostCardHTML(post, author, isLiked, isReshared);
    }

    profileFeedContainer.innerHTML = html;

    // Attach liked posts listeners
    profileFeedContainer.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn') && !e.target.closest('.btn-ghost') && !e.target.closest('a')) {
          const postId = card.dataset.postId;
          if (postId) window.location.hash = `${ROUTES.POST_DETAIL}?id=${postId}`;
        }
      });
    });

    profileFeedContainer.querySelectorAll('.like-btn').forEach(btn => {
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

    profileFeedContainer.querySelectorAll('.post-options-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const postId = btn.dataset.postId;
        const authorId = btn.dataset.authorId;
        const currentUid = auth.currentUser?.uid;
        const currentUserProfile = currentUid ? await getUserProfile(currentUid) : null;
        const isStaff = currentUserProfile?.role === 'staff' || currentUserProfile?.role === 'admin';

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
              const card = btn.closest('.post-card');
              if (card) {
                card.style.opacity = '0.3';
                card.style.pointerEvents = 'none';
              }
            } catch (err) {
              alert(err.message || 'Failed to delete post.');
            }
          },
          onReport: async (id, reason) => {
            try {
              const res = await reportPost(id, reason);
              if (res.autoTakenDown) {
                alert('Thank you. This post has accumulated 2 community reports and has been automatically taken down for Staff review.');
                const card = btn.closest('.post-card');
                if (card) {
                  card.style.opacity = '0.2';
                  card.style.pointerEvents = 'none';
                }
              } else {
                alert('Thank you for reporting. Your report has been submitted to SJC Moderation.');
              }
            } catch (err) {
              alert(err.message || 'Failed to submit report.');
            }
          }
        });
      });
    });
  }

  if (tabPosts && tabLikes) {
    tabPosts.addEventListener('click', () => {
      if (activeProfileTab === 'posts') return;
      activeProfileTab = 'posts';
      tabPosts.classList.add('active');
      tabLikes.classList.remove('active');
      // Re-subscribe to user posts
      subscribeToUserPosts(userProfile.uid, async (posts) => {
        if (!profileFeedContainer) return;
        if (activeProfileTab !== 'posts') return;

        if (posts.length === 0) {
          profileFeedContainer.innerHTML = `
            <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
              <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">post_add</span>
              <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No posts yet</h3>
              <p style="font-size: 14px;">When ${isOwnProfile ? 'you post' : 'this student posts'}, their content will appear here.</p>
            </div>
          `;
          return;
        }

        let html = '';
        const currentUid = auth.currentUser?.uid;
        for (const post of posts) {
          const isLiked = currentUid ? await isPostLikedByUser(post.postId, currentUid) : false;
          const isReshared = currentUid ? await isPostResharedByUser(post.postId, currentUid) : false;
          html += createPostCardHTML(post, userProfile, isLiked, isReshared);
        }
        profileFeedContainer.innerHTML = html;
      });
    });

    tabLikes.addEventListener('click', () => {
      if (activeProfileTab === 'likes') return;
      activeProfileTab = 'likes';
      tabLikes.classList.add('active');
      tabPosts.classList.remove('active');
      loadLikedPosts();
    });
  }

  // Edit Profile Modal Logic
  if (isOwnProfile) {
    setupEditProfileModal(userProfile, container);
  }
}

function renderEditProfileModal(profile) {
  const currentBannerId = profile.bannerPreset || PRESET_BANNERS[0].id;
  const currentQuoteId = profile.quotePreset || PRESET_QUOTE_STYLES[0].id;
  const currentFontId = profile.fontId || PRESET_USER_FONTS[0].id;
  const currentQuoteFontId = profile.quoteFontId || PRESET_QUOTE_FONTS[0].id;

  const bannerSwatchesHTML = PRESET_BANNERS.map(b => `
    <div class="banner-swatch ${b.id === currentBannerId ? 'active' : ''}" data-id="${b.id}" style="background: ${b.gradient}; height: 40px; border-radius: 8px; cursor: pointer; border: 2px solid ${b.id === currentBannerId ? 'var(--accent-primary)' : 'transparent'};" title="${b.name}"></div>
  `).join('');

  const quoteSwatchesHTML = PRESET_QUOTE_STYLES.map(q => `
    <div class="quote-swatch ${q.id === currentQuoteId ? 'active' : ''}" data-id="${q.id}" style="background: ${q.bg}; border: ${q.border}; height: 40px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="${q.name}">
      <span class="material-symbols-outlined" style="color: ${q.accent}; font-size: 18px;">format_quote</span>
    </div>
  `).join('');

  const fontCardsHTML = PRESET_USER_FONTS.map(f => {
    const isSel = f.id === currentFontId;
    return `
      <div class="font-card-swatch ${isSel ? 'active' : ''}" data-id="${f.id}" style="padding: 10px; border-radius: 10px; background: var(--bg-tertiary); border: 2px solid ${isSel ? 'var(--accent-primary)' : 'transparent'}; cursor: pointer; display: flex; flex-direction: column; gap: 4px; transition: border 0.15s ease;" title="${f.name}">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary);">${f.name}</span>
        <span style="font-size: 14px; font-weight: 600; color: var(--text-primary); font-family: ${f.fontFamily}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          Ag Backbench
        </span>
      </div>
    `;
  }).join('');

  const quoteFontCardsHTML = PRESET_QUOTE_FONTS.map(f => {
    const isSel = f.id === currentQuoteFontId;
    return `
      <div class="quote-font-card-swatch ${isSel ? 'active' : ''}" data-id="${f.id}" style="padding: 10px; border-radius: 10px; background: var(--bg-tertiary); border: 2px solid ${isSel ? 'var(--accent-primary)' : 'transparent'}; cursor: pointer; display: flex; flex-direction: column; gap: 4px; transition: border 0.15s ease;" title="${f.name}">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary);">${f.name}</span>
        <span style="font-size: 13px; font-style: italic; color: var(--accent-primary); font-family: ${f.fontFamily}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          “Campus Slogan”
        </span>
      </div>
    `;
  }).join('');

  return `
    <div id="edit-profile-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; justify-content: center; align-items: center; padding: 20px;">
      <div class="card fade-in" style="width: 100%; max-width: 540px; max-height: 90vh; overflow-y: auto; padding: 24px; border-radius: 24px; box-shadow: 0 12px 40px rgba(0,0,0,0.8);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 18px; font-weight: 800;">Edit Student Profile</h2>
          <button id="close-edit-modal-btn" class="btn-ghost" style="padding: 4px;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form id="edit-profile-form">
          <!-- Profile Picture Picker -->
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; border: 2px solid var(--border-color); overflow: hidden;" id="modal-pfp-preview">
              ${profile.profilePicture ? `<img src="${profile.profilePicture}" style="width:100%;height:100%;object-fit:cover;" />` : `<div class="avatar" style="width:100%;height:100%;font-size:24px;">${profile.name ? profile.name.charAt(0).toUpperCase() : 'S'}</div>`}
            </div>
            <div>
              <label class="btn btn-outline" style="font-size: 12px; padding: 6px 12px; cursor: pointer;">
                Change Photo
                <input type="file" id="edit-pfp-input" accept="image/*" style="display: none;" />
              </label>
            </div>
          </div>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Full Name</label>
          <input type="text" id="edit-name" class="input-field" value="${escapeHTML(profile.name || '')}" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Username</label>
          <input type="text" id="edit-username" class="input-field" value="${escapeHTML(profile.username || '')}" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Bio / Description</label>
          <textarea id="edit-bio" class="input-field" rows="2" style="resize: none;">${escapeHTML(profile.bio || '')}</textarea>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Campus Motto / Quote</label>
          <input type="text" id="edit-tagline" class="input-field" value="${escapeHTML(profile.tagline || '')}" placeholder="Your personal slogan..." />

          <!-- Cover Banner Gradient Selection (24 Presets) -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-top: 6px; display: block;">Cover Banner Theme (24 Gradients)</label>
          <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 14px;" id="banner-swatches-container">
            ${bannerSwatchesHTML}
          </div>

          <!-- Quote Background Theme Selection (12 Presets) -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Quote Theme (12 Styles)</label>
          <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 14px;" id="quote-swatches-container">
            ${quoteSwatchesHTML}
          </div>

          <!-- Visual Custom User Font Cards Grid -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Profile & Post Font Theme (Visual Cards)</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px;" id="font-cards-container">
            ${fontCardsHTML}
          </div>

          <!-- Visual Custom Quote Font Cards Grid -->
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); display: block;">Quote Motto Font Style (Visual Cards)</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;" id="quote-font-cards-container">
            ${quoteFontCardsHTML}
          </div>

          <div id="edit-profile-error" class="error-text" style="display: none;"></div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 12px;">
            <button type="button" id="cancel-edit-modal-btn" class="btn btn-outline">Cancel</button>
            <button type="submit" id="save-edit-profile-btn" class="btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function setupEditProfileModal(profile, container) {
  const modal = document.getElementById('edit-profile-modal');
  const openBtn = document.getElementById('edit-profile-btn');
  const closeBtn = document.getElementById('close-edit-modal-btn');
  const cancelBtn = document.getElementById('cancel-edit-modal-btn');
  const form = document.getElementById('edit-profile-form');
  const pfpInput = document.getElementById('edit-pfp-input');
  const pfpPreview = document.getElementById('modal-pfp-preview');
  const errorDiv = document.getElementById('edit-profile-error');
  const saveBtn = document.getElementById('save-edit-profile-btn');

  let selectedBannerId = profile.bannerPreset || PRESET_BANNERS[0].id;
  let selectedQuoteId = profile.quotePreset || PRESET_QUOTE_STYLES[0].id;
  let selectedFontId = profile.fontId || PRESET_USER_FONTS[0].id;
  let selectedQuoteFontId = profile.quoteFontId || PRESET_QUOTE_FONTS[0].id;
  let base64Pfp = profile.profilePicture || '';

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  const closeModal = () => {
    modal.style.display = 'none';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // Banner Swatch Click Selection
  container.querySelectorAll('.banner-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      container.querySelectorAll('.banner-swatch').forEach(s => s.style.borderColor = 'transparent');
      swatch.style.borderColor = 'var(--accent-primary)';
      selectedBannerId = swatch.dataset.id;
    });
  });

  // Quote Swatch Click Selection
  container.querySelectorAll('.quote-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      container.querySelectorAll('.quote-swatch').forEach(s => s.style.boxShadow = 'none');
      swatch.style.boxShadow = '0 0 0 2px var(--accent-primary)';
      selectedQuoteId = swatch.dataset.id;
    });
  });

  // Font Card Click Selection
  container.querySelectorAll('.font-card-swatch').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.font-card-swatch').forEach(c => c.style.borderColor = 'transparent');
      card.style.borderColor = 'var(--accent-primary)';
      selectedFontId = card.dataset.id;
    });
  });

  // Quote Font Card Click Selection
  container.querySelectorAll('.quote-font-card-swatch').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.quote-font-card-swatch').forEach(c => c.style.borderColor = 'transparent');
      card.style.borderColor = 'var(--accent-primary)';
      selectedQuoteFontId = card.dataset.id;
    });
  });

  // Image upload handling
  if (pfpInput) {
    pfpInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          base64Pfp = await processProfilePicture(file);
          pfpPreview.innerHTML = `<img src="${base64Pfp}" style="width:100%;height:100%;object-fit:cover;" />`;
        } catch (err) {
          alert(err.message || 'Failed to process image');
        }
      }
    });
  }

  // Form Submit Handler
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';

      const name = document.getElementById('edit-name').value.trim();
      const username = document.getElementById('edit-username').value.trim();
      const bio = document.getElementById('edit-bio').value.trim();
      const tagline = document.getElementById('edit-tagline').value.trim();

      if (!validateUsername(username)) {
        errorDiv.textContent = "Username must be 3-20 characters long (letters, numbers, underscores, and dots only).";
        errorDiv.style.display = 'block';
        return;
      }

      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';

      try {
        await updateUserProfile(auth.currentUser.uid, {
          name,
          username,
          bio,
          tagline,
          bannerPreset: selectedBannerId,
          quotePreset: selectedQuoteId,
          fontId: selectedFontId,
          quoteFontId: selectedQuoteFontId,
          profilePicture: base64Pfp
        });

        closeModal();
        renderProfile(container);
      } catch (err) {
        console.error(err);
        errorDiv.textContent = err.message || 'Failed to save profile changes.';
        errorDiv.style.display = 'block';
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Changes';
      }
    });
  }
}
