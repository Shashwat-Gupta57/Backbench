import { auth, db } from '../firebase/firebase.js';
import { ref, get, update } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { validateUsername } from '../helpers/validation.js';
import { invalidateUserCache, getUserProfile } from '../services/postService.js';
import { ROUTES } from '../constants/routes.js';

export async function renderOnboarding(container) {
  const user = auth.currentUser;
  if (!user) {
    window.location.hash = ROUTES.HOME;
    return;
  }

  const existingProfile = await getUserProfile(user.uid) || {};

  container.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%; padding: 20px; background: radial-gradient(circle at top center, rgba(29, 155, 240, 0.08) 0%, transparent 60%);">
      <div class="card fade-in" style="width: 100%; max-width: 460px; padding: 32px; border-radius: 24px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6); backdrop-filter: blur(20px);">
        
        <!-- Header -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 24px;">
          <div style="width: 52px; height: 52px; background: linear-gradient(135deg, #1D9BF0, #0077B5); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 28px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35); margin-bottom: 12px;">
            B
          </div>
          <h1 style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px; text-align: center;">
            Complete Your Student Profile
          </h1>
          <p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px; text-align: center;">
            Please provide your St. Joseph's College student details to access Backbench.
          </p>
        </div>

        <form id="onboarding-form" style="display: flex; flex-direction: column;">
          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Full Name</label>
          <input class="input-field" type="text" id="onboard-name" value="${user.displayName || existingProfile.name || ''}" placeholder="Full Name" required />

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Choose Username</label>
          <input class="input-field" type="text" id="onboard-username" value="${existingProfile.username || user.email?.split('@')[0] || ''}" placeholder="Username (e.g. shashwat.gupta)" required />

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Admission No.</label>
              <input class="input-field" type="text" id="onboard-admission" value="${existingProfile.admissionNumber && existingProfile.admissionNumber !== 'N/A' ? existingProfile.admissionNumber : ''}" placeholder="e.g. 10420" required />
            </div>
            
            <div style="flex: 1;">
              <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Class & Sec</label>
              <input class="input-field" type="text" id="onboard-class" value="${existingProfile.class && existingProfile.class !== 'N/A' ? existingProfile.class : ''}" placeholder="e.g. 12A" required />
            </div>
          </div>

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Mobile Number</label>
          <input class="input-field" type="tel" id="onboard-mobile" value="${existingProfile.mobile || ''}" placeholder="Mobile Number" required />

          <div id="onboard-error" class="error-text" style="display: none; margin-top: 4px;"></div>

          <button type="submit" id="onboard-submit-btn" class="btn" style="width: 100%; padding: 14px; font-size: 15px; font-weight: 700; margin-top: 8px; box-shadow: 0 4px 14px rgba(29, 155, 240, 0.3);">
            Complete & Enter Backbench
          </button>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('onboarding-form');
  const errorDiv = document.getElementById('onboard-error');
  const submitBtn = document.getElementById('onboard-submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const name = document.getElementById('onboard-name').value.trim();
    const username = document.getElementById('onboard-username').value.trim();
    const admissionNumber = document.getElementById('onboard-admission').value.trim();
    const userClass = document.getElementById('onboard-class').value.trim();
    const mobile = document.getElementById('onboard-mobile').value.trim();

    if (!validateUsername(username)) {
      errorDiv.textContent = "Username must be 3-20 characters long (letters, numbers, underscores, and dots only).";
      errorDiv.style.display = 'block';
      return;
    }

    if (!admissionNumber) {
      errorDiv.textContent = "Admission Number is required.";
      errorDiv.style.display = 'block';
      return;
    }

    if (!userClass) {
      errorDiv.textContent = "Class & Section is required.";
      errorDiv.style.display = 'block';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving Profile...';

    try {
      const userRef = ref(db, `${PATHS.USERS}/${user.uid}`);
      await update(userRef, {
        name,
        username,
        admissionNumber,
        class: userClass,
        mobile
      });

      invalidateUserCache(user.uid);
      window.location.hash = ROUTES.HOME;
    } catch (err) {
      console.error(err);
      errorDiv.textContent = err.message || 'Failed to save profile details.';
      errorDiv.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Complete & Enter Backbench';
    }
  });
}
