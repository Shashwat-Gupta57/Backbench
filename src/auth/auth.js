import { registerUser, loginUser, loginWithGoogle } from '../services/authService.js';
import { validateUsername } from '../helpers/validation.js';

export function renderAuth(container, path) {
  const isLogin = path === '#/login';

  container.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%; padding: 20px; background: radial-gradient(circle at top center, rgba(29, 155, 240, 0.08) 0%, transparent 60%);">
      <div class="card fade-in" style="width: 100%; max-width: 440px; padding: 32px; border-radius: 24px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6); backdrop-filter: blur(20px);">
        
        <!-- Brand Badge -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 24px;">
          <div style="width: 52px; height: 52px; background: linear-gradient(135deg, #1D9BF0, #0077B5); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 28px; box-shadow: 0 6px 20px rgba(29, 155, 240, 0.35); margin-bottom: 12px;">
            B
          </div>
          <h1 style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; text-align: center;">
            ${isLogin ? 'Welcome back to Backbench' : 'Create your Backbench Account'}
          </h1>
          <p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px; text-align: center;">
            St. Joseph's College Internal Social Network
          </p>
        </div>

        <!-- Auth Tabs -->
        <div style="display: flex; background: var(--bg-primary); padding: 4px; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 24px;">
          <a href="#/login" class="btn" style="flex: 1; text-align: center; background: ${isLogin ? 'var(--bg-tertiary)' : 'transparent'}; color: ${isLogin ? 'var(--text-primary)' : 'var(--text-secondary)'}; border-radius: 8px; padding: 8px; font-size: 14px; border: ${isLogin ? '1px solid var(--border-color)' : 'none'};">Log In</a>
          <a href="#/signup" class="btn" style="flex: 1; text-align: center; background: ${!isLogin ? 'var(--bg-tertiary)' : 'transparent'}; color: ${!isLogin ? 'var(--text-primary)' : 'var(--text-secondary)'}; border-radius: 8px; padding: 8px; font-size: 14px; border: ${!isLogin ? '1px solid var(--border-color)' : 'none'};">Sign Up</a>
        </div>

        <!-- Form -->
        <form id="auth-form" style="display: flex; flex-direction: column;">
          ${!isLogin ? `
            <input class="input-field" type="text" id="name" placeholder="Full Name" required />
            <input class="input-field" type="text" id="username" placeholder="Username (e.g. shashwat.gupta)" required />
            <div style="display: flex; gap: 12px;">
              <input class="input-field" type="text" id="admissionNumber" placeholder="Admission No." required />
              <input class="input-field" type="text" id="class" placeholder="Class (e.g. 12A)" required />
            </div>
            <input class="input-field" type="tel" id="mobile" placeholder="Mobile Number" required />
          ` : ''}
          
          <input class="input-field" type="email" id="email" placeholder="SJC Email Address" required />
          
          <div style="position: relative; width: 100%;">
            <input class="input-field" type="password" id="password" placeholder="Password" style="padding-right: 46px;" required />
            <button type="button" id="toggle-password-btn" class="btn-ghost" style="position: absolute; right: 8px; top: 7px; color: var(--text-secondary); padding: 6px;" title="Show Password">
              <span class="material-symbols-outlined" style="font-size: 20px;">visibility</span>
            </button>
          </div>

          <div id="auth-error" class="error-text" style="display: none;"></div>

          <button type="submit" class="btn" style="width: 100%; padding: 14px; font-size: 15px; font-weight: 700; margin-top: 4px; box-shadow: 0 4px 14px rgba(29, 155, 240, 0.3);">
            ${isLogin ? 'Log In' : 'Create Account'}
          </button>

          <div style="display: flex; align-items: center; margin: 20px 0; color: var(--text-muted); font-size: 13px;">
            <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
            <span style="padding: 0 12px; font-weight: 600;">OR</span>
            <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
          </div>

          <button type="button" id="google-btn" class="btn btn-outline" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 10px; border-radius: 9999px;">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width: 18px; height: 18px;" alt="Google" />
            Continue with Google
          </button>
        </form>

        <div style="text-align: center; margin-top: 24px; color: var(--text-secondary); font-size: 14px;">
          ${isLogin ? "Don't have an account?" : "Already have an account?"} 
          <a href="${isLogin ? '#/signup' : '#/login'}" style="font-weight: 700;">
            ${isLogin ? 'Sign up' : 'Log in'}
          </a>
        </div>
      </div>
    </div>
  `;

  const form = document.getElementById('auth-form');
  const errorDiv = document.getElementById('auth-error');
  const googleBtn = document.getElementById('google-btn');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('toggle-password-btn');

  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    const icon = togglePasswordBtn.querySelector('.material-symbols-outlined');
    icon.textContent = isPassword ? 'visibility_off' : 'visibility';
    togglePasswordBtn.title = isPassword ? 'Hide Password' : 'Show Password';
  });

  googleBtn.addEventListener('click', async () => {
    googleBtn.disabled = true;
    googleBtn.textContent = 'Connecting...';
    const res = await loginWithGoogle();
    if (res.success) {
      if (res.needsOnboarding) {
        window.location.hash = '#/onboarding';
      } else {
        window.location.hash = '#/';
      }
    } else {
      errorDiv.textContent = res.error;
      errorDiv.style.display = 'block';
      googleBtn.disabled = false;
      googleBtn.innerHTML = '<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width: 18px; height: 18px;" alt="Google" /> Continue with Google';
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Authenticating...';

    if (isLogin) {
      const res = await loginUser(email, password);
      if (res.success) {
        window.location.hash = '#/';
      } else {
        errorDiv.textContent = res.error;
        errorDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log In';
      }
    } else {
      const name = document.getElementById('name').value;
      const username = document.getElementById('username').value;
      const admissionNumber = document.getElementById('admissionNumber').value;
      const userClass = document.getElementById('class').value;
      const mobile = document.getElementById('mobile').value;

      if (!validateUsername(username)) {
        errorDiv.textContent = "Username must be 3-20 characters long (letters, numbers, underscores, and dots only).";
        errorDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
        return;
      }

      const res = await registerUser({
        email, password, name, username, admissionNumber, userClass, mobile
      });

      if (res.success) {
        window.location.hash = '#/';
      } else {
        errorDiv.textContent = res.error;
        errorDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
      }
    }
  });
}
