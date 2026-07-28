import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';

export function createPetitionCardHTML(petition, author, isSigned) {
  const isAnon = petition.isAnonymous === true;
  const avatarHTML = isAnon
    ? `<div class="avatar" style="width: 40px; height: 40px; font-size: 18px; background: linear-gradient(135deg, #6366f1, #8b5cf6);">🎭</div>`
    : renderUserAvatar(author, 40);
  const authorName = isAnon ? 'Anonymous Student' : (author?.name ? escapeHTML(author.name) : 'Student Representative');
  const count = petition.signatureCount || 0;
  const goal = petition.goalSignatures || 100;
  const pct = Math.min(100, Math.round((count / goal) * 100));
  const isGoalReached = count >= goal;
  const authorUsername = isAnon ? 'anonymous' : (author?.username ? escapeHTML(author.username) : 'student');

  return `
    <article class="card fade-in petition-card" data-petition-id="${petition.petitionId}" style="margin-bottom: 16px; border-radius: var(--border-radius); cursor: pointer;" onclick="if(!event.target.closest('a, button')) window.location.hash='#/petition?id=${petition.petitionId}'">
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        ${isAnon ? `<div style="display: inline-flex;">${avatarHTML}</div>` : `<a href="#/profile?u=${authorUsername}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${authorUsername}'s profile">
          ${avatarHTML}
        </a>`}
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="brand-badge" style="font-size: 11px;">${escapeHTML(petition.category)}</span>
              <span class="brand-badge" style="font-size: 11px; background: ${isGoalReached ? 'rgba(0, 186, 124, 0.2)' : 'rgba(29, 155, 240, 0.15)'}; color: ${isGoalReached ? '#00BA7C' : 'var(--accent-primary)'}; border-color: ${isGoalReached ? '#00BA7C' : 'var(--accent-primary)'};">
                ${isGoalReached ? '🎉 GOAL REACHED' : 'ACTIVE'}
              </span>
            </div>
            <button class="btn-ghost petition-options-btn" style="padding: 4px;" title="Options" data-petition-id="${petition.petitionId}" data-author-id="${petition.creatorId}">
              <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
            </button>
          </div>

          <h2 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; line-height: 1.35;">
            ${escapeHTML(petition.title)}
          </h2>

          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${escapeHTML(petition.statement)}
          </p>

          <!-- Progress Bar -->
          <div style="background: var(--bg-primary); border-radius: 12px; padding: 10px 12px; border: 1px solid var(--border-color); margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
              <span><strong style="color: var(--accent-primary); font-size: 15px;">${count}</strong> / ${goal} signatures</span>
              <span style="font-weight: 700; color: var(--text-primary);">${pct}%</span>
            </div>
            <div style="width: 100%; height: 8px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C); transition: width 0.4s ease;"></div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            ${isAnon
              ? `<span style="font-size: 12px; color: var(--text-secondary);">By <strong>Anonymous Student</strong></span>`
              : `<a href="#/profile?u=${authorUsername}" style="text-decoration: none; color: inherit;" title="View @${authorUsername}'s profile">
              <span style="font-size: 12px; color: var(--text-secondary);">By <strong>${authorName}</strong> (@${authorUsername})</span>
            </a>`}
            
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-outline copy-petition-frame-btn" data-petition-id="${petition.petitionId}" style="font-size: 12px; padding: 6px 10px; display: flex; align-items: center; gap: 4px;" title="Copy shareable petition paper frame link">
                <span class="material-symbols-outlined" style="font-size: 14px;">filter_frames</span> Frame Link
              </button>
              <a href="#/petition-frame?id=${petition.petitionId}" class="btn btn-outline view-imprint-btn" style="font-size: 12px; padding: 6px 10px;">
                📜 Paper Mode
              </a>
              <button class="btn sign-petition-feed-btn" data-petition-id="${petition.petitionId}" style="font-size: 12px; padding: 6px 14px;" ${isSigned ? 'disabled' : ''}>
                ${isSigned ? '✓ Signed' : '✍️ Sign'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}
