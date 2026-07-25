import { formatTimeAgo } from '../helpers/time.js';
import { escapeHTML } from '../helpers/formatters.js';

export function createPollCardHTML(poll, author, userVotedOptionIndex = null) {
  const avatarInitial = author?.name ? author.name.charAt(0).toUpperCase() : '?';
  const name = author?.name ? escapeHTML(author.name) : 'Anonymous Student';
  const username = author?.username ? escapeHTML(author.username) : 'student';
  const totalVotes = poll.totalVotes || 0;
  const hasVoted = userVotedOptionIndex !== null;

  let optionsHTML = '';

  if (!hasVoted) {
    // Unvoted State: Interactive Option Pills
    optionsHTML = `
      <div class="poll-options-container" style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
        ${poll.options.map((opt, idx) => `
          <button class="poll-option-btn" data-poll-id="${poll.pollId}" data-option-index="${idx}">
            <span>${escapeHTML(opt.text)}</span>
          </button>
        `).join('')}
      </div>
    `;
  } else {
    // Voted State: Twitter Percentage Bars
    optionsHTML = `
      <div class="poll-results-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
        ${poll.options.map((opt, idx) => {
          const votes = opt.votes || 0;
          const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
          const isUserChoice = userVotedOptionIndex === idx;

          return `
            <div class="poll-result-bar-wrapper ${isUserChoice ? 'user-selected' : ''}">
              <div class="poll-result-fill" style="width: ${percentage}%;"></div>
              <div class="poll-result-label">
                <span style="display: flex; align-items: center; gap: 6px; font-weight: ${isUserChoice ? '700' : '500'};">
                  ${escapeHTML(opt.text)}
                  ${isUserChoice ? `<span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">check_circle</span>` : ''}
                </span>
                <span style="font-weight: 700; color: ${isUserChoice ? 'var(--text-primary)' : 'var(--text-secondary)'};">${percentage}%</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  return `
    <article class="card fade-in" style="margin-bottom: 16px; border-radius: var(--border-radius);">
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <div class="avatar">${avatarInitial}</div>
        <div style="flex: 1; min-width: 0;">
          <div class="post-header">
            <div class="author-meta">
              <span class="author-name">${name}</span>
              <span class="author-handle">@${username}</span>
              <span class="post-dot">·</span>
              <span class="post-time">${formatTimeAgo(poll.timestamp)}</span>
            </div>
            <span class="brand-badge" style="font-size: 11px;">CAMPUS POLL</span>
          </div>

          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 6px;">
            ${escapeHTML(poll.question)}
          </div>

          ${optionsHTML}

          <div style="margin-top: 12px; font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 12px;">
            <span>${totalVotes} vote${totalVotes === 1 ? '' : 's'}</span>
            <span>·</span>
            <span>${hasVoted ? 'Vote recorded' : 'Active poll'}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}
