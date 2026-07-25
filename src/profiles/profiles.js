import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { auth, db } from '../firebase/firebase.js';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { ROUTES } from '../constants/routes.js';
import { getUserProfile, updateUserProfile, subscribeToUserPosts, isPostLikedByUser, toggleLikePost } from '../services/postService.js';
import { processProfilePicture } from '../helpers/image.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
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
    targetUsername = hash.split('?u=')[1];
  }

  let userProfile = null;

  try {
    if (targetUsername) {
      const usersRef = ref(db, PATHS.USERS);
      const q = query(usersRef, orderByChild('username'), equalTo(targetUsername));
      const snap = await get(q);

      if (snap.exists()) {
        const data = snap.val();
        userProfile = Object.values(data)[0];
      }
    } else {
      userProfile = await getUserProfile(auth.currentUser.uid);
    }
  } catch (err) {
    console.error('Error loading profile:', err);
  }

  // Fallback to current user if lookup failed
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
        <p style="color: var(--text-secondary); margin-top: 4px;">The student profile you are looking for does not exist on Backbench.</p>
      </div>
    `, ROUTES.PROFILE);
    attachLayoutListeners();
    return;
  }

  const isSelf = userProfile.uid === auth.currentUser.uid;
  const verified = userProfile.verifiedStudent || userProfile.role === 'staff' || userProfile.role === 'admin';

  const avatarDisplayHTML = renderUserAvatar(
    userProfile, 
    100, 
    `border: 4px solid var(--bg-primary); box-shadow: 0 6px 20px rgba(0,0,0,0.5); cursor: ${isSelf ? 'pointer' : 'default'};`
  );

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
          <h1 class="header-title" style="display: flex; align-items: center; gap: 4px;">
            ${escapeHTML(userProfile.name)}
            ${verified ? `<span class="material-symbols-outlined verified-icon">verified</span>` : ''}
          </h1>
          <span id="profile-header-post-count" style="color: var(--text-secondary); font-size: 13px;">${userProfile.postCount || 0} posts</span>
        </div>
      </div>
    </header>

    <!-- Hero Cover Banner -->
    <div style="height: 140px; background: linear-gradient(135deg, #1D9BF0 0%, #004477 100%); position: relative;"></div>

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
          '<button class="btn" style="border-radius: 9999px;">Follow</button>'
        }
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px;">
        <h2 style="font-size: 22px; font-weight: 800; display: flex; align-items: center; gap: 6px;">
          ${escapeHTML(userProfile.name)}
          ${verified ? `<span class="material-symbols-outlined verified-icon">verified</span>` : ''}
        </h2>
        <span style="color: var(--text-secondary); font-size: 15px;">@${escapeHTML(userProfile.username)}</span>
      </div>

      <!-- Modern 2026 Glassmorphic Personal Tagline Quote Card -->
      ${userProfile.tagline ? `
        <div class="tagline-quote-card" style="margin-top: 14px; padding: 14px 18px; background: linear-gradient(135deg, rgba(29, 155, 240, 0.12) 0%, rgba(22, 24, 28, 0.85) 100%); border: 1px solid rgba(29, 155, 240, 0.25); border-radius: 16px; position: relative; overflow: hidden; box-shadow: 0 4px 20px rgba(29, 155, 240, 0.08);">
          <div style="position: absolute; right: -8px; bottom: -24px; font-size: 96px; color: rgba(29, 155, 240, 0.06); font-family: Georgia, serif; font-weight: 800; pointer-events: none; user-select: none; line-height: 1;">”</div>
          <div style="display: flex; align-items: flex-start; gap: 10px; position: relative; z-index: 1;">
            <span class="material-symbols-outlined" style="font-size: 22px; color: var(--accent-primary); flex-shrink: 0; margin-top: 1px;">format_quote</span>
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.8px; color: var(--accent-primary); text-transform: uppercase; margin-bottom: 2px;">Campus Motto</span>
              <span style="font-size: 15px; font-style: italic; font-weight: 600; color: var(--text-primary); line-height: 1.4; letter-spacing: -0.2px;">
                “${escapeHTML(userProfile.tagline)}”
              </span>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Bio -->
      <p style="margin-top: 12px; font-size: 15px; line-height: 1.5; color: var(--text-primary);">
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

    <!-- Edit Profile Modal Overlay -->
    <div id="edit-profile-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); z-index: 2000; align-items: center; justify-content: center; padding: 20px;">
      <div class="card fade-in" style="width: 100%; max-width: 480px; padding: 24px; border-radius: 20px; position: relative;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="font-size: 19px; font-weight: 800;">Edit Profile</h3>
          <button id="close-modal-btn" class="btn-ghost" style="padding: 4px;">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <form id="edit-profile-form">
          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px; display: block;">Full Name</label>
          <input type="text" id="edit-name" class="input-field" value="${escapeHTML(userProfile.name)}" required />

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
    for (const post of posts) {
      const isLiked = await isPostLikedByUser(post.postId, auth.currentUser?.uid);
      postsHTML += createPostCardHTML(post, userProfile, isLiked);
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
          const icon = btn.querySelector('.material-symbols-outlined');
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
        const tagline = taglineInput.value.trim();
        const bio = document.getElementById('edit-bio').value.trim();

        if (tagline.length > 45) {
          alert('Campus motto quote cannot exceed 45 characters.');
          return;
        }

        const saveBtn = document.getElementById('save-profile-btn');
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';

        try {
          await updateUserProfile(userProfile.uid, {
            name,
            tagline,
            bio
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
