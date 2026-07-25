import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { auth, db } from '../firebase/firebase.js';
import { ref, get } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { ROLES } from '../constants/roles.js';

export async function renderAdmin(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }
  
  // Quick role check
  const userRef = ref(db, `${PATHS.USERS}/${auth.currentUser.uid}`);
  const snap = await get(userRef);
  
  if (!snap.exists() || snap.val().role === ROLES.STUDENT) {
    container.innerHTML = createLayout(`
      <div style="padding: var(--spacing-lg); text-align: center; color: var(--error-color);">
        <span class="material-icons" style="font-size: 48px; margin-bottom: 16px;">block</span>
        <h3>Access Denied</h3>
        <p style="margin-top: 8px;">You do not have permission to view this page.</p>
      </div>
    `);
    attachLayoutListeners();
    return;
  }

  const content = `
    <div style="padding: var(--spacing-md); border-bottom: 1px solid var(--border-color);">
      <h2 style="font-size: 20px;">Admin Dashboard</h2>
    </div>
    <div style="padding: var(--spacing-lg);">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md);">
        
        <div class="card" style="text-align: center; cursor: pointer;">
          <span class="material-icons" style="font-size: 32px; color: var(--accent-color);">people</span>
          <h3 style="margin-top: 8px;">Users</h3>
        </div>
        
        <div class="card" style="text-align: center; cursor: pointer;">
          <span class="material-icons" style="font-size: 32px; color: var(--accent-color);">report</span>
          <h3 style="margin-top: 8px;">Reports</h3>
        </div>
        
        <div class="card" style="text-align: center; cursor: pointer;">
          <span class="material-icons" style="font-size: 32px; color: var(--accent-color);">analytics</span>
          <h3 style="margin-top: 8px;">Analytics</h3>
        </div>
        
      </div>
    </div>
  `;
  container.innerHTML = createLayout(content);
  attachLayoutListeners();
}
