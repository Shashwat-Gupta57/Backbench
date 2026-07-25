import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { auth } from '../firebase/firebase.js';
import { updateUserPassword } from '../services/authService.js';
import { getUserProfile } from '../services/postService.js';
import { escapeHTML } from '../helpers/formatters.js';
import { ROUTES } from '../constants/routes.js';

export async function renderSettings(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  const currentUser = auth.currentUser;
  const userProfile = await getUserProfile(currentUser.uid);

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="material-symbols-outlined" style="color: var(--accent-primary); font-size: 26px;">settings</span>
        <h1 class="header-title">Account Settings</h1>
      </div>
    </header>

    <div style="padding: 20px;" class="fade-in">
      
      <!-- Account Info Summary Card -->
      <div class="card" style="padding: 20px; border-radius: 20px; border: 1px solid var(--border-color); margin-bottom: 20px;">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">badge</span>
          Account Credentials
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; font-size: 14px;">
          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Email Address</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px;">${escapeHTML(currentUser.email || 'N/A')}</div>
          </div>

          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Username</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px;">@${escapeHTML(userProfile?.username || 'student')}</div>
          </div>

          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Account Role</span>
            <div style="font-weight: 700; color: var(--text-primary); margin-top: 2px; text-transform: uppercase;">${escapeHTML(userProfile?.role || 'student')}</div>
          </div>
        </div>
      </div>

      <!-- Password Change Section Card -->
      <div class="card" style="padding: 24px; border-radius: 20px; border: 1px solid var(--border-color);">
        <h3 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">lock_reset</span>
          Change Password
        </h3>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
          Enter your new password below. Since you are authenticated in your session, typing a new password will update your security credentials instantly.
        </p>

        <form id="change-password-form" style="display: flex; flex-direction: column; gap: 14px;">
          <div style="position: relative;">
            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px; display: block;">New Password</label>
            <input type="password" id="new-password-input" class="input-field" placeholder="Enter new password (min 6 chars)" style="padding-right: 42px; margin-bottom: 0;" required />
            <button type="button" class="btn-ghost toggle-pwd-btn" data-target="new-password-input" style="position: absolute; right: 10px; bottom: 8px; padding: 4px;" title="Show/Hide Password">
              <span class="material-symbols-outlined" style="font-size: 20px; color: var(--text-secondary);">visibility</span>
            </button>
          </div>

          <div style="position: relative;">
            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px; display: block;">Confirm New Password</label>
            <input type="password" id="confirm-password-input" class="input-field" placeholder="Re-enter new password" style="padding-right: 42px; margin-bottom: 0;" required />
            <button type="button" class="btn-ghost toggle-pwd-btn" data-target="confirm-password-input" style="position: absolute; right: 10px; bottom: 8px; padding: 4px;" title="Show/Hide Password">
              <span class="material-symbols-outlined" style="font-size: 20px; color: var(--text-secondary);">visibility</span>
            </button>
          </div>

          <!-- Alert Messages -->
          <div id="password-error-alert" class="error-text" style="display: none; padding: 10px 14px; background: rgba(244, 33, 46, 0.1); border: 1px solid var(--error-color); border-radius: 10px; font-size: 13px;"></div>
          <div id="password-success-alert" style="display: none; padding: 10px 14px; background: rgba(0, 186, 124, 0.1); border: 1px solid #00BA7C; color: #00BA7C; border-radius: 10px; font-size: 13px; font-weight: 700; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span>
            <span>Password updated successfully!</span>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
            <button type="submit" id="save-password-btn" class="btn" style="font-weight: 700; padding: 10px 20px; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">key</span>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.SETTINGS, userProfile?.role || 'student');
  attachLayoutListeners();

  const form = document.getElementById('change-password-form');
  const newPwdInput = document.getElementById('new-password-input');
  const confirmPwdInput = document.getElementById('confirm-password-input');
  const errorAlert = document.getElementById('password-error-alert');
  const successAlert = document.getElementById('password-success-alert');
  const submitBtn = document.getElementById('save-password-btn');

  // Toggle Password Visibility
  container.querySelectorAll('.toggle-pwd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const targetInput = document.getElementById(targetId);
      const icon = btn.querySelector('.material-symbols-outlined');

      if (targetInput) {
        if (targetInput.type === 'password') {
          targetInput.type = 'text';
          if (icon) icon.textContent = 'visibility_off';
        } else {
          targetInput.type = 'password';
          if (icon) icon.textContent = 'visibility';
        }
      }
    });
  });

  // Password Change Submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorAlert.style.display = 'none';
      successAlert.style.display = 'none';

      const newPwd = newPwdInput.value;
      const confirmPwd = confirmPwdInput.value;

      if (newPwd.length < 6) {
        errorAlert.textContent = 'Password must be at least 6 characters long.';
        errorAlert.style.display = 'block';
        return;
      }

      if (newPwd !== confirmPwd) {
        errorAlert.textContent = 'New password and confirm password do not match.';
        errorAlert.style.display = 'block';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Updating...';

      try {
        await updateUserPassword(newPwd);
        form.reset();
        successAlert.style.display = 'flex';
      } catch (err) {
        errorAlert.textContent = err.message || 'Failed to update password.';
        errorAlert.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">key</span> Update Password`;
      }
    });
  }
}
