import { createLayout, attachLayoutListeners } from '../components/layout.js';

export function renderAnnouncements(container) {
  const content = `
    <div style="padding: var(--spacing-md); border-bottom: 1px solid var(--border-color);">
      <h2 style="font-size: 20px;">Announcements</h2>
    </div>
    <div style="padding: var(--spacing-lg); text-align: center; color: var(--text-secondary);">
      <span class="material-icons" style="font-size: 48px; margin-bottom: 16px;">announcement</span>
      <h3>Official Announcements</h3>
      <p style="margin-top: 8px;">Updates from the staff and admin. Coming soon.</p>
    </div>
  `;
  container.innerHTML = createLayout(content);
  attachLayoutListeners();
}
