import { getUserProfile, subscribeToUserPosts } from '../services/postService.js';
import { getFriendsCount, isFriend, toggleAddFriend } from '../services/friendService.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { getUserFontFamily } from '../constants/fonts.js';
import { ROUTES } from '../constants/routes.js';
import { auth, db } from '../firebase/firebase.js';
import { ref, get } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';

export async function renderProfileFrame(container) {
  const hash = window.location.hash;
  let username = null;

  if (hash.includes('?u=')) {
    username = hash.split('?u=')[1]?.replace(/^[@\-\s]+/, '');
  }

  if (!username) {
    // Fallback to active logged in user
    username = auth.currentUser?.displayName || 'student';
  }

  // Fetch target profile by scanning users node
  let userProfile = null;
  try {
    const snap = await get(ref(db, PATHS.USERS));
    if (snap.exists()) {
      const users = snap.val();
      for (const uid in users) {
        const u = users[uid];
        if (u.username && u.username.toLowerCase() === username.toLowerCase()) {
          userProfile = u;
          break;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }

  if (!userProfile) {
    container.innerHTML = `
      <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 60px 20px; text-align: center; font-family: var(--font-family);">
        <span class="material-symbols-outlined" style="font-size: 64px; color: var(--error-color); margin-bottom: 16px;">person_off</span>
        <h1 style="font-size: 24px; font-weight: 800;">Student Profile Frame Not Found</h1>
        <p style="color: var(--text-secondary); margin-top: 8px;">The account @${escapeHTML(username)} could not be loaded.</p>
      </div>
    `;
    return;
  }

  const currentUid = auth.currentUser?.uid;
  const isOwn = currentUid === userProfile.uid;
  const friendsCount = await getFriendsCount(userProfile.uid);
  const isFriendStatus = currentUid && !isOwn ? await isFriend(userProfile.uid) : false;

  const fontStyle = getUserFontFamily(userProfile);
  const avatarHTML = renderUserAvatar(userProfile, 96, 'border: 4px solid #16181c; box-shadow: 0 8px 24px rgba(0,0,0,0.5);');
  const name = userProfile.name ? escapeHTML(userProfile.name) : 'Anonymous Student';
  const uname = userProfile.username ? escapeHTML(userProfile.username) : 'student';
  const isTeacher = userProfile.isTeacher || userProfile.role === 'teacher';
  const verified = userProfile.verifiedStudent || userProfile.role === 'staff' || userProfile.role === 'admin' || isTeacher;

  const frameLink = `${window.location.origin}${window.location.pathname}#/profile-frame?u=${uname}`;

  const html = `
    <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 24px 12px; font-family: 'Inter', sans-serif;">
      
      <!-- Top Action Bar -->
      <div style="max-width: 680px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; background: #16181c; padding: 12px 20px; border-radius: 14px; border: 1px solid #2f3336;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="${ROUTES.PROFILE}?u=${uname}" class="btn-ghost" title="Open Full Profile" style="color: #f7f9f9;">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>
          <span style="font-size: 14px; font-weight: 700; color: var(--accent-primary);">DIGITAL STUDENT ID FRAME</span>
        </div>

        <button id="copy-profile-frame-link-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; border-color: #2f3336; color: #f7f9f9;">
          <span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span>
          Copy Account Frame Link
        </button>
      </div>

      <!-- Main Student ID Card Frame -->
      <div style="max-width: 680px; margin: 0 auto; background: linear-gradient(135deg, #16181c 0%, #0d0f12 100%); border: 2px solid #2f3336; border-radius: 24px; overflow: hidden; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7); position: relative;">

        <!-- Top Banner Header -->
        <div style="height: 140px; background: linear-gradient(135deg, #1d9bf0, #1e3a8a); position: relative; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span style="background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); color: #fff; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.2);">
              ST. JOSEPH'S COLLEGE • BACKBENCH ID
            </span>
            <span class="material-symbols-outlined" style="color: rgba(255,255,255,0.8); font-size: 28px;">badge</span>
          </div>
        </div>

        <!-- Profile Avatar & Details Overlap -->
        <div style="padding: 0 24px 28px 24px; position: relative;">
          
          <div style="margin-top: -48px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end;">
            ${avatarHTML}

            ${currentUid && !isOwn ? `
              <button id="frame-friend-btn" class="btn ${isFriendStatus ? 'btn-outline' : ''}" style="font-weight: 700; font-size: 13px; padding: 8px 18px;">
                ${isFriendStatus ? '✓ Friends' : '+ Add Friend'}
              </button>
            ` : ''}
          </div>

          <!-- User Name & Badges -->
          <div style="margin-bottom: 16px;">
            <h1 style="font-size: 24px; font-weight: 800; color: #f7f9f9; font-family: ${fontStyle}; display: flex; align-items: center; gap: 8px;">
              ${name}
              ${isTeacher ? `
                <span class="brand-badge" style="font-size: 11px; background: rgba(0, 186, 124, 0.2); color: #00BA7C; border-color: #00BA7C; display: inline-flex; align-items: center; gap: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 13px;">school</span> Faculty
                </span>
              ` : verified ? `
                <span class="material-symbols-outlined verified-icon" style="font-size: 22px;">verified</span>
              ` : ''}
            </h1>
            <div style="color: var(--text-secondary); font-size: 15px; font-weight: 500;">@${uname}</div>
          </div>

          <!-- Bio / Motto Box -->
          <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px 18px; margin-bottom: 20px; font-size: 14px; color: var(--text-primary); line-height: 1.5;">
            ${escapeHTML(userProfile.bio || 'SJC Backbench Student Account')}
          </div>

          <!-- Stats Grid -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: #202327; border-radius: 14px; padding: 16px; text-align: center; margin-bottom: 24px; border: 1px solid var(--border-color);">
            <div>
              <div style="font-size: 20px; font-weight: 800; color: var(--accent-primary);">${friendsCount}</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Classmates</div>
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #00BA7C;">${escapeHTML(userProfile.department || userProfile.course || 'SJC')}</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Dept / Stream</div>
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #F4511E;">Verified</div>
              <div style="font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase;">Status</div>
            </div>
          </div>

          <!-- Direct Link to Full Backbench Account -->
          <div style="display: flex; gap: 12px;">
            <a href="${ROUTES.PROFILE}?u=${uname}" class="btn" style="flex: 1; text-align: center; font-weight: 700; text-decoration: none;">
              Open Full Account Profile
            </a>
          </div>

        </div>

        <!-- Security Seal Footer -->
        <div style="background: #0f1115; padding: 12px 24px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary);">
          <span>Verified Backbench Student Identity</span>
          <span style="color: var(--accent-primary); font-weight: 700;">SJC CAMPUS CARD</span>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const copyBtn = document.getElementById('copy-profile-frame-link-btn');
  const friendBtn = document.getElementById('frame-friend-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(frameLink).then(() => {
        copyBtn.textContent = '✓ Frame Link Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy Account Frame Link';
        }, 2000);
      });
    });
  }

  if (friendBtn) {
    friendBtn.addEventListener('click', async () => {
      friendBtn.disabled = true;
      try {
        const nowFriend = await toggleAddFriend(userProfile.uid);
        friendBtn.textContent = nowFriend ? '✓ Friends' : '+ Add Friend';
        friendBtn.className = `btn ${nowFriend ? 'btn-outline' : ''}`;
      } catch (err) {
        alert(err.message || 'Failed to update friend status');
      } finally {
        friendBtn.disabled = false;
      }
    });
  }
}
