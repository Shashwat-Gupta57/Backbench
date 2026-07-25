import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { auth, db } from '../firebase/firebase.js';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { ROUTES } from '../constants/routes.js';
import { PRESET_BANNERS } from '../constants/banners.js';
import { PRESET_QUOTE_STYLES } from '../constants/quotes.js';
import { PRESET_USER_FONTS, getUserFontFamily } from '../constants/fonts.js';
import { getUserProfile, updateUserProfile, subscribeToUserPosts, isPostLikedByUser, toggleLikePost, isPostResharedByUser, toggleResharePost } from '../services/postService.js';
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

  if (hash.includes('?u=')) {
    const rawParam = hash.split('?u=')[1];
    if (rawParam) {
      targetUsername = decodeURIComponent(rawParam).trim().replace(/^@+/, '');
    }
  }

  let userProfile = null;

  try {
    if (targetUsername) {
      const usersRef = ref(db, PATHS.USERS);
      // Attempt 1: Exact lookup
      const q = query(usersRef, orderByChild('username'), equalTo(targetUsername));
      const snap = await get(q);

      if (snap.exists()) {
        const data = snap.val();
        userProfile = Object.values(data)[0];
      } else {
        // Attempt 2: Case-insensitive fallback scan across users node
        const allSnap = await get(usersRef);
        if (allSnap.exists()) {
          allSnap.forEach((childSnap) => {
            const u = childSnap.val();
            if (u && u.username && u.username.toLowerCase() === targetUsername.toLowerCase()) {
              userProfile = u;
            }
          });
        }
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
        <p style="color: var(--text-secondary); margin-top: 4px;">The student profile "@${escapeHTML(targetUsername || '')}" does not exist on Backbench.</p>
      </div>
    `, ROUTES.PROFILE);
    attachLayoutListeners();
    return;
  }

  const isSelf = userProfile.uid === auth.currentUser.uid;
  const verified = userProfile.verifiedStudent || userProfile.role === 'staff' || userProfile.role === 'admin';
  const currentBannerGradient = userProfile.bannerStyle || PRESET_BANNERS[0].gradient;
  
  // Resolve Quote & Font Themes
  const currentQuoteTheme = PRESET_QUOTE_STYLES.find(s => s.id === userProfile.quoteThemeId) || PRESET_QUOTE_STYLES[0];
  const userFontFamily = getUserFontFamily(userProfile);
  const currentFontThemeId = userProfile.fontThemeId || 'default';

  // Check friendship status & friend counts
  const userIsFriend = !isSelf ? await isFriend(userProfile.uid) : false;
  const friendsCount = await getFriendsCount(userProfile.uid);

  const avatarDisplayHTML = renderUserAvatar(
    userProfile, 
    100, 
    `border: 4px solid var(--bg-primary); box-shadow: 0 6px 20px rgba(0,0,0,0.5); cursor: ${isSelf ? 'pointer' : 'default'};`
  );

  const bannerSwatchesHTML = PRESET_BANNERS.map(b => {
    const isSelected = b.gradient === currentBannerGradient;
    return `
      <div 
        class="banner-swatch ${isSelected ? 'selected' : ''}" 
        data-gradient="${escapeHTML(b.gradient)}"
        title="${b.name}"
        style="height: 40px; border-radius: 10px; background: ${b.gradient}; cursor: pointer; border: ${isSelected ? '3px solid #fff' : '1px solid rgba(255,255,255,0.2)'}; box-shadow: ${isSelected ? '0 0 12px var(--accent-primary)' : 'none'}; transition: all 0.2s ease;"
      ></div>
    `;
  }).join('');

  const quoteSwatchesHTML = PRESET_QUOTE_STYLES.map(qs => {
    const isSelected = qs.id === currentQuoteTheme.id;
    return `
      <div 
        class="quote-swatch ${isSelected ? 'selected' : ''}" 
        data-quote-id="${qs.id}"
        title="${qs.name}"
        style="height: 36px; border-radius: 8px; background: ${qs.bg}; border: ${isSelected ? '3px solid ' + qs.accent : qs.border}; cursor: pointer; box-shadow: ${isSelected ? qs.shadow : 'none'}; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center;"
      >
        <span style="font-size: 11px; font-weight: 700; color: ${qs.accent};">${qs.name}</span>
      </div>
    `;
  }).join('');

  const fontSwatchesHTML = PRESET_USER_FONTS.map(f => {
    const isSelected = f.id === currentFontThemeId;
    return `
      <div 
        class="font-swatch ${isSelected ? 'selected' : ''}" 
        data-font-id="${f.id}"
        title="${f.name}"
        style="padding: 8px 12px; border-radius: 10px; background: var(--bg-primary); border: ${isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)'}; cursor: pointer; text-align: center; transition: all 0.2s ease;"
      >
        <span style="font-family: ${f.fontFamily}; font-size: 14px; font-weight: 700; color: ${isSelected ? 'var(--accent-primary)' : 'var(--text-primary)'};">${f.name}</span>
      </div>
    `;
  }).join('');

  const content = `
    <!-- Hidden File Input for 480p PFP Upload -->
    <input type="file" id="pfp-upload-input" accept="image/*" style="display: none;" />

    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 class="header-title" style="display: flex; align-items: center; gap: 4px; font-family: ${userFontFamily};">
            ${escapeHTML(userProfile.name)}
            ${verified ? `<span class="material-symbols-outlined verified-icon">verified</span>` : ''}
          </h1>
          <span id="profile-header-post-count" style="color: var(--text-secondary); font-size: 13px;">${userProfile.postCount || 0} posts</span>
        </div>
      </div>
    </header>

    <!-- Hero Cover Banner -->
    <div id="profile-cover-banner" style="height: 140px; background: ${currentBannerGradient}; position: relative; transition: background 0.3s ease;"></div>

    <!-- Profile Info Box -->
    <div style="padding: 0 16px 16px 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: -50px; margin-bottom: 16px;">
        <div style="position: relative;" id="avatar-wrapper" title="${isSelf ? 'Click to change profile picture' : ''}">
          ${avatarDisplayHTML}
          ${isSelf ? `
            <div style="position: absolute; bottom: 4px; right: 4px; background: var(--accent-primary); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: #fff; border: 2px solid var(--bg-primary); pointer-events: none;">
              <span class="material-symbols-outlined" style="font-size: 16px;">photo_camera</span>
            </div>
          ` : ''}
        </div>

        ${isSelf ? 
          '<button class="btn btn-outline" id="edit-profile-btn" style="border-radius: 9999px; font-weight: 700;">Edit Profile</button>' : 
          `<button class="btn ${userIsFriend ? 'btn-outline' : ''}" id="profile-friend-btn" data-uid="${userProfile.uid}" style="border-radius: 9999px; font-weight: 700;">${userIsFriend ? 'Friends' : '+ Add Friend'}</button>`
        }
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        <h2 id="profile-display-name" style="font-size: 22px; font-weight: 800; display: flex; align-items: center; gap: 6px; font-family: ${userFontFamily};">
          ${escapeHTML(userProfile.name)}
          ${verified ? `<span class="material-symbols-outlined verified-icon">verified</span>` : ''}
        </h2>
        <span style="color: var(--text-secondary); font-size: 15px;">@${escapeHTML(userProfile.username)}</span>
      </div>

      <!-- Modern Customized Personal Tagline Quote Card -->
      ${userProfile.tagline ? `
        <div id="profile-quote-card" class="tagline-quote-card" style="margin-top: 14px; padding: 14px 18px; background: ${currentQuoteTheme.bg}; border: ${currentQuoteTheme.border}; border-radius: 16px; position: relative; overflow: hidden; box-shadow: ${currentQuoteTheme.shadow}; transition: all 0.3s ease;">
          <div style="position: absolute; right: -8px; bottom: -24px; font-size: 96px; color: ${currentQuoteTheme.accent}; opacity: 0.08; font-family: Georgia, serif; font-weight: 800; pointer-events: none; user-select: none; line-height: 1;">”</div>
          <div style="display: flex; align-items: flex-start; gap: 10px; position: relative; z-index: 1;">
            <span class="material-symbols-outlined" style="font-size: 22px; color: ${currentQuoteTheme.accent}; flex-shrink: 0; margin-top: 1px;">format_quote</span>
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.8px; color: ${currentQuoteTheme.accent}; text-transform: uppercase; margin-bottom: 2px;">Campus Motto</span>
              <span id="profile-quote-text" style="font-size: 16px; font-style: italic; font-weight: 600; color: var(--text-primary); line-height: 1.4; letter-spacing: -0.2px; font-family: ${userFontFamily};">
                “${escapeHTML(userProfile.tagline)}”
              </span>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Bio -->
      <p id="profile-bio-text" style="margin-top: 12px; font-size: 15px; line-height: 1.5; color: var(--text-primary); font-family: ${userFontFamily};">
        ${escapeHTML(userProfile.bio || 'St. Joseph\'s College Student')}
      </p>

      <div style="display: flex; gap: 18px; flex-wrap: wrap; margin-top: 14px; color: var(--text-secondary); font-size: 14px;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">school</span>
          <span>Class ${escapeHTML(userProfile.class || 'N/A')}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">calendar_today</span>
          <span>Joined ${new Date(userProfile.joinedDate || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      <div style="display: flex; gap: 24px; margin-top: 16px; font-size: 14px;">
        <div id="open-friends-modal-btn" style="cursor: pointer; transition: opacity 0.2s ease;"><strong style="color: var(--text-primary);">${friendsCount}</strong> <span style="color: var(--text-secondary);">Friends</span></div>
        <div><strong style="color: var(--text-primary);">${userProfile.likesReceived || 0}</strong> <span style="color: var(--text-secondary);">Likes</span></div>
        <div><strong style="color: var(--text-primary);">${userProfile.replyCount || 0}</strong> <span style="color: var(--text-secondary);">Replies</span></div>
        <div><strong id="profile-stats-post-count" style="color: var(--text-primary);">${userProfile.postCount || 0}</strong> <span style="color: var(--text-secondary);">Posts</span></div>
      </div>
    </div>

    <!-- Activity Tabs -->
    <div class="header-tabs">
      <button class="tab-button active">Posts</button>
      <button class="tab-button">Replies</button>
      <button class="tab-button">Likes</button>
    </div>

    <!-- Live User Posts Feed Container -->
    <div id="user-posts-feed" class="feed-container">
      ${renderFeedSkeletons(2)}
    </div>

    <!-- Friends List Modal Overlay -->
    <div id="friends-list-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); z-index: 2000; align-items: center; justify-content: center; padding: 20px;">
      <div class="card fade-in" style="width: 100%; max-width: 440px; padding: 24px; border-radius: 20px; position: relative; max-height: 80vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 19px; font-weight: 800;">Friends (${friendsCount})</h3>
          <button id="close-friends-modal-btn" class="btn-ghost" style="padding: 4px;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div id="friends-list-container" style="display: flex; flex-direction: column; gap: 8px;">
          <div style="padding: 20px; text-align: center; color: var(--text-secondary);">Loading friends...</div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal Overlay -->
    <div id="edit-profile-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); z-index: 2000; align-items: center; justify-content: center; padding: 20px;">
      <div class="card fade-in" style="width: 100%; max-width: 500px; padding: 24px; border-radius: 20px; position: relative; max-height: 90vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="font-size: 19px; font-weight: 800;">Edit Profile</h3>
          <button id="close-modal-btn" class="btn-ghost" style="padding: 4px;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form id="edit-profile-form">
          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px; display: block;">Typography Theme (Applies to Name, Bio & Posts)</label>
          <div id="font-swatches-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 16px;">
            ${fontSwatchesHTML}
          </div>

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px; display: block;">Choose Cover Banner Theme</label>
          <div id="banner-swatches-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px;">
            ${bannerSwatchesHTML}
          </div>

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px; display: block;">Quote Card Background Theme</label>
          <div id="quote-swatches-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
            ${quoteSwatchesHTML}
          </div>

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px; display: block;">Full Name</label>
          <input type="text" id="edit-name" class="input-field" value="${escapeHTML(userProfile.name)}" required />

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px; display: block;">Username (@handle)</label>
          <input type="text" id="edit-username" class="input-field" value="${escapeHTML(userProfile.username)}" required />

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary);">Campus Motto / Personal Quote</label>
            <span id="tagline-counter" style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">0 / 45</span>
          </div>
          <input type="text" id="edit-tagline" class="input-field" maxlength="45" value="${escapeHTML(userProfile.tagline || '')}" placeholder="e.g. I follow the path of peace" />

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px; display: block;">Bio</label>
          <textarea id="edit-bio" class="input-field" rows="3" style="resize: none;" placeholder="Tell the campus about yourself...">${escapeHTML(userProfile.bio || '')}</textarea>

          <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 16px;">
            <button type="button" id="change-photo-btn" class="btn btn-outline" style="margin-right: auto; font-size: 13px; padding: 8px 16px;">
              Change Photo
            </button>
            <button type="button" id="cancel-edit-btn" class="btn btn-outline" style="font-size: 14px; padding: 10px 20px;">
              Cancel
            </button>
            <button type="submit" id="save-profile-btn" class="btn" style="font-size: 14px; padding: 10px 20px;">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.PROFILE);
  attachLayoutListeners();

  // Attach Friends List Modal listeners
  const openFriendsModalBtn = document.getElementById('open-friends-modal-btn');
  const friendsListModal = document.getElementById('friends-list-modal');
  const closeFriendsModalBtn = document.getElementById('close-friends-modal-btn');
  const friendsListContainer = document.getElementById('friends-list-container');

  if (openFriendsModalBtn && friendsListModal) {
    openFriendsModalBtn.addEventListener('click', async () => {
      friendsListModal.style.display = 'flex';
      friendsListContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-secondary);">Loading friends...</div>`;

      try {
        const friends = await getFriendsProfiles(userProfile.uid);
        if (friends.length === 0) {
          friendsListContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-secondary);">No friends added yet.</div>`;
          return;
        }

        let fHtml = '';
        for (const f of friends) {
          const fAvatar = renderUserAvatar(f, 40);
          fHtml += `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 10px; background: var(--bg-primary); cursor: pointer;" class="friend-item" data-username="${escapeHTML(f.username)}">
              <div style="display: flex; align-items: center; gap: 10px;">
                ${fAvatar}
                <div style="display: flex; flex-direction: column;">
                  <span style="font-weight: 700; font-size: 14px;">${escapeHTML(f.name)}</span>
                  <span style="color: var(--text-secondary); font-size: 12px;">@${escapeHTML(f.username)}</span>
                </div>
              </div>
              <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-secondary);">chevron_right</span>
            </div>
          `;
        }
        friendsListContainer.innerHTML = fHtml;

        friendsListContainer.querySelectorAll('.friend-item').forEach(item => {
          item.addEventListener('click', () => {
            const u = item.dataset.username;
            friendsListModal.style.display = 'none';
            window.location.hash = `#/profile?u=${u}`;
          });
        });
      } catch (err) {
        console.error(err);
        friendsListContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--error-color);">Error loading friends.</div>`;
      }
    });
  }

  if (closeFriendsModalBtn && friendsListModal) {
    closeFriendsModalBtn.addEventListener('click', () => {
      friendsListModal.style.display = 'none';
    });
  }

  // Attach Add Friend button for non-self profiles
  const profileFriendBtn = document.getElementById('profile-friend-btn');
  if (profileFriendBtn) {
    profileFriendBtn.addEventListener('click', async () => {
      profileFriendBtn.disabled = true;
      try {
        const nowFriend = await toggleAddFriend(userProfile.uid);
        profileFriendBtn.textContent = nowFriend ? 'Friends' : '+ Add Friend';
        profileFriendBtn.className = `btn ${nowFriend ? 'btn-outline' : ''}`;
      } catch (err) {
        console.error(err);
      } finally {
        profileFriendBtn.disabled = false;
      }
    });
  }

  // Subscribe & render user's posts
  const postsFeed = document.getElementById('user-posts-feed');
  const headerCount = document.getElementById('profile-header-post-count');
  const statsCount = document.getElementById('profile-stats-post-count');

  subscribeToUserPosts(userProfile.uid, async (posts) => {
    if (!postsFeed) return;

    if (headerCount) headerCount.textContent = `${posts.length} posts`;
    if (statsCount) statsCount.textContent = posts.length;

    if (posts.length === 0) {
      postsFeed.innerHTML = `
        <div style="padding: 60px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 44px; color: var(--border-color); margin-bottom: 8px;">post_add</span>
          <p style="font-size: 15px; font-weight: 600; color: var(--text-primary);">No posts yet</p>
          <p style="font-size: 13px; margin-top: 4px;">When @${escapeHTML(userProfile.username)} posts on Backbench, they will appear here.</p>
        </div>
      `;
      return;
    }

    let postsHTML = '';
    const currentUid = auth.currentUser.uid;

    for (const post of posts) {
      const isLiked = await isPostLikedByUser(post.postId, currentUid);
      const isReshared = await isPostResharedByUser(post.postId, currentUid);
      postsHTML += createPostCardHTML(post, userProfile, isLiked, isReshared);
    }

    postsFeed.innerHTML = postsHTML;

    // Attach post card click handlers (navigate to post detail page)
    postsFeed.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn')) {
          const postId = card.dataset.postId;
          window.location.hash = `#/post?id=${postId}`;
        }
      });
    });

    // Attach like button handlers
    postsFeed.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const postId = btn.dataset.postId;
        btn.disabled = true;

        try {
          const res = await toggleLikePost(postId);
          const countSpan = btn.querySelector('.like-count');

          if (res.liked) {
            btn.classList.add('liked', 'heart-pop');
          } else {
            btn.classList.remove('liked', 'heart-pop');
          }

          if (countSpan) countSpan.textContent = res.likes;
        } catch (err) {
          console.error(err);
        } finally {
          btn.disabled = false;
        }
      });
    });

    // Attach reshare button handlers
    postsFeed.querySelectorAll('.reshare-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const postId = btn.dataset.postId;
        btn.disabled = true;

        try {
          const res = await toggleResharePost(postId);
          const countSpan = btn.querySelector('.reshare-count');

          if (res.reshared) {
            btn.classList.add('reshared');
            btn.style.color = '#00BA7C';
          } else {
            btn.classList.remove('reshared');
            btn.style.color = '';
          }

          if (countSpan) countSpan.textContent = res.reshares;
        } catch (err) {
          console.error(err);
        } finally {
          btn.disabled = false;
        }
      });
    });
  });

  // Attach Edit Profile Modal & Photo upload listeners if viewing self
  if (isSelf) {
    const fileInput = document.getElementById('pfp-upload-input');
    const editBtn = document.getElementById('edit-profile-btn');
    const avatarWrapper = document.getElementById('avatar-wrapper');
    const modal = document.getElementById('edit-profile-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const changePhotoBtn = document.getElementById('change-photo-btn');
    const editForm = document.getElementById('edit-profile-form');
    const taglineInput = document.getElementById('edit-tagline');
    const taglineCounter = document.getElementById('tagline-counter');
    const coverBanner = document.getElementById('profile-cover-banner');
    const quoteCard = document.getElementById('profile-quote-card');
    const displayNameEl = document.getElementById('profile-display-name');
    const bioTextEl = document.getElementById('profile-bio-text');
    const quoteTextEl = document.getElementById('profile-quote-text');

    let selectedBannerGradient = currentBannerGradient;
    let selectedQuoteThemeId = currentQuoteTheme.id;
    let selectedFontThemeId = currentFontThemeId;

    // Font Swatches click selection
    const fontSwatches = document.querySelectorAll('.font-swatch');
    fontSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        selectedFontThemeId = swatch.dataset.fontId;
        const fontStyle = getUserFontFamily(selectedFontThemeId);

        fontSwatches.forEach(s => {
          s.style.border = '1px solid var(--border-color)';
          const span = s.querySelector('span');
          if (span) span.style.color = 'var(--text-primary)';
        });
        swatch.style.border = '2px solid var(--accent-primary)';
        const activeSpan = swatch.querySelector('span');
        if (activeSpan) activeSpan.style.color = 'var(--accent-primary)';

        // Live preview font on profile elements
        if (displayNameEl) displayNameEl.style.fontFamily = fontStyle;
        if (bioTextEl) bioTextEl.style.fontFamily = fontStyle;
        if (quoteTextEl) quoteTextEl.style.fontFamily = fontStyle;
      });
    });

    // Banner Swatches click selection
    const bannerSwatches = document.querySelectorAll('.banner-swatch');
    bannerSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        selectedBannerGradient = swatch.dataset.gradient;
        bannerSwatches.forEach(s => {
          s.style.border = '1px solid rgba(255,255,255,0.2)';
          s.style.boxShadow = 'none';
        });
        swatch.style.border = '3px solid #fff';
        swatch.style.boxShadow = '0 0 12px var(--accent-primary)';

        if (coverBanner) {
          coverBanner.style.background = selectedBannerGradient;
        }
      });
    });

    // Quote Swatches click selection
    const quoteSwatches = document.querySelectorAll('.quote-swatch');
    quoteSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        selectedQuoteThemeId = swatch.dataset.quoteId;
        const qStyle = PRESET_QUOTE_STYLES.find(s => s.id === selectedQuoteThemeId);

        quoteSwatches.forEach(s => {
          const st = PRESET_QUOTE_STYLES.find(x => x.id === s.dataset.quoteId);
          s.style.border = st ? st.border : '1px solid rgba(255,255,255,0.2)';
          s.style.boxShadow = 'none';
        });

        if (qStyle) {
          swatch.style.border = `3px solid ${qStyle.accent}`;
          swatch.style.boxShadow = qStyle.shadow;

          if (quoteCard) {
            quoteCard.style.background = qStyle.bg;
            quoteCard.style.border = qStyle.border;
            quoteCard.style.boxShadow = qStyle.shadow;
            const quoteIcon = quoteCard.querySelector('.material-symbols-outlined');
            const mottoSpan = quoteCard.querySelector('span[style*="uppercase"]');
            if (quoteIcon) quoteIcon.style.color = qStyle.accent;
            if (mottoSpan) mottoSpan.style.color = qStyle.accent;
          }
        }
      });
    });

    const openModal = () => { modal.style.display = 'flex'; };
    const closeModal = () => { modal.style.display = 'none'; };

    if (editBtn) editBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeModal);

    if (avatarWrapper) avatarWrapper.addEventListener('click', () => fileInput.click());
    if (changePhotoBtn) changePhotoBtn.addEventListener('click', () => fileInput.click());

    // Tagline counter
    if (taglineInput && taglineCounter) {
      taglineCounter.textContent = `${taglineInput.value.length} / 45`;
      taglineInput.addEventListener('input', () => {
        taglineCounter.textContent = `${taglineInput.value.length} / 45`;
      });
    }

    // Save profile form submission
    if (editForm) {
      editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('edit-name').value.trim();
        const newUsername = document.getElementById('edit-username').value.trim().replace(/^@+/, '');
        const tagline = taglineInput.value.trim();
        const bio = document.getElementById('edit-bio').value.trim();

        if (!validateUsername(newUsername)) {
          alert('Username must be 3-20 characters long (letters, numbers, underscores, and dots only).');
          return;
        }

        if (tagline.length > 45) {
          alert('Campus motto quote cannot exceed 45 characters.');
          return;
        }

        const saveBtn = document.getElementById('save-profile-btn');
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';

        try {
          // Check username uniqueness if changed
          if (newUsername.toLowerCase() !== (userProfile.username || '').toLowerCase()) {
            const usersRef = ref(db, PATHS.USERS);
            const q = query(usersRef, orderByChild('username'), equalTo(newUsername));
            const snap = await get(q);
            if (snap.exists()) {
              alert(`The username @${newUsername} is already taken by another student. Please choose a different username.`);
              saveBtn.disabled = false;
              saveBtn.textContent = 'Save Changes';
              return;
            }
          }

          await updateUserProfile(userProfile.uid, {
            name,
            username: newUsername,
            tagline,
            bio,
            bannerStyle: selectedBannerGradient,
            quoteThemeId: selectedQuoteThemeId,
            fontThemeId: selectedFontThemeId
          });
          closeModal();
          renderProfile(container);
        } catch (err) {
          console.error(err);
          alert('Failed to save profile changes.');
        } finally {
          saveBtn.disabled = false;
          saveBtn.textContent = 'Save Changes';
        }
      });
    }

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        if (editBtn) {
          editBtn.disabled = true;
          editBtn.textContent = 'Processing PFP...';
        }

        // Process image: Downscale to 480p JPEG <100KB
        const dataUrl = await processProfilePicture(file);

        // Update in Realtime Database & clear cache
        await updateUserProfile(userProfile.uid, { profilePicture: dataUrl });

        // Refresh view immediately
        renderProfile(container);
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to update profile picture.');
      } finally {
        if (editBtn) {
          editBtn.disabled = false;
          editBtn.textContent = 'Edit Profile';
        }
      }
    });
  }
}
