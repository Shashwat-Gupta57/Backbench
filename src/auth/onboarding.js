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
            Complete Your Campus Profile
          </h1>
          <p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px; text-align: center;">
            Provide your St. Joseph's College details to access Backbench.
          </p>
        </div>

        <form id="onboarding-form" style="display: flex; flex-direction: column;">
          <!-- Role Selector -->
          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px;">Are you a Student or Teacher?</label>
          <div style="display: flex; gap: 10px; margin-bottom: 14px;">
            <button type="button" id="onboard-student-btn" class="btn" style="flex: 1; padding: 8px; font-size: 13px; font-weight: 700; border-radius: 10px; background: var(--accent-primary);">
              🎓 Student
            </button>
            <button type="button" id="onboard-teacher-btn" class="btn btn-outline" style="flex: 1; padding: 8px; font-size: 13px; font-weight: 700; border-radius: 10px;">
              👨‍🏫 Teacher / Faculty
            </button>
          </div>

          <label id="label-name" style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Full Name</label>
          <input class="input-field" type="text" id="onboard-name" value="${user.displayName || existingProfile.name || ''}" placeholder="Full Name" required />

          <label style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Choose Username</label>
          <input class="input-field" type="text" id="onboard-username" value="${existingProfile.username || user.email?.split('@')[0] || ''}" placeholder="Username (e.g. shashwat.gupta)" required />

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label id="label-admission" style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Admission No.</label>
              <input class="input-field" type="text" id="onboard-admission" value="${existingProfile.admissionNumber && existingProfile.admissionNumber !== 'N/A' ? existingProfile.admissionNumber : ''}" placeholder="e.g. 10420" required />
            </div>
            
            <div style="flex: 1;">
              <label id="label-class" style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Class & Sec</label>
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
  const studentBtn = document.getElementById('onboard-student-btn');
  const teacherBtn = document.getElementById('onboard-teacher-btn');
  const nameInput = document.getElementById('onboard-name');
  const admissionInput = document.getElementById('onboard-admission');
  const classInput = document.getElementById('onboard-class');
  const labelAdmission = document.getElementById('label-admission');
  const labelClass = document.getElementById('label-class');

  let selectedRole = existingProfile.role === 'teacher' ? 'teacher' : 'student';

  const updateRoleUI = (role) => {
    selectedRole = role;
    if (role === 'teacher') {
      teacherBtn.className = 'btn';
      teacherBtn.style.background = '#00BA7C';
      studentBtn.className = 'btn btn-outline';
      studentBtn.style.background = 'transparent';
      labelAdmission.textContent = 'Teacher / Employee ID';
      admissionInput.placeholder = 'e.g. T-104';
      labelClass.textContent = 'Department';
      classInput.placeholder = 'e.g. Computer Science';
      nameInput.placeholder = 'Official Faculty Name (e.g. Dr. Sharma)';
    } else {
      studentBtn.className = 'btn';
      studentBtn.style.background = 'var(--accent-primary)';
      teacherBtn.className = 'btn btn-outline';
      teacherBtn.style.background = 'transparent';
      labelAdmission.textContent = 'Admission No.';
      admissionInput.placeholder = 'e.g. 10420';
      labelClass.textContent = 'Class & Sec';
      classInput.placeholder = 'e.g. 12A';
      nameInput.placeholder = 'Full Name';
    }
  };

  if (existingProfile.role === 'teacher') {
    updateRoleUI('teacher');
  }

  studentBtn.addEventListener('click', () => updateRoleUI('student'));
  teacherBtn.addEventListener('click', () => updateRoleUI('teacher'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const name = nameInput.value.trim();
    const username = document.getElementById('onboard-username').value.trim();
    const admissionNumber = admissionInput.value.trim();
    const userClass = classInput.value.trim();
    const mobile = document.getElementById('onboard-mobile').value.trim();

    if (!validateUsername(username)) {
      errorDiv.textContent = "Username must be 3-20 characters long (letters, numbers, underscores, and dots only).";
      errorDiv.style.display = 'block';
      return;
    }

    if (!admissionNumber) {
      errorDiv.textContent = selectedRole === 'teacher' ? "Employee / Teacher ID is required." : "Admission Number is required.";
      errorDiv.style.display = 'block';
      return;
    }

    if (!userClass) {
      errorDiv.textContent = selectedRole === 'teacher' ? "Department is required." : "Class & Section is required.";
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
        mobile,
        isTeacher: selectedRole === 'teacher',
        role: selectedRole === 'teacher' ? 'teacher' : (existingProfile.role === 'admin' ? 'admin' : 'student')
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
