import { createLayout, attachLayoutListeners } from '../components/layout.js';

export function renderEvents(container) {
  const content = `
    <div style="padding: var(--spacing-md); border-bottom: 1px solid var(--border-color);">
      <h2 style="font-size: 20px;">Events</h2>
    </div>
    <div style="padding: var(--spacing-lg); text-align: center; color: var(--text-secondary);">
      <span class="material-icons" style="font-size: 48px; margin-bottom: 16px;">event</span>
      <h3>Campus Events</h3>
      <p style="margin-top: 8px;">Discover upcoming events and meetings. Coming soon.</p>
    </div>
  `;
  container.innerHTML = createLayout(content);
  attachLayoutListeners();
}
