import { formatTimeAgo } from '../helpers/time.js';
import { escapeHTML } from '../helpers/formatters.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { getUserFontFamily } from '../constants/fonts.js';

export function createPollCardHTML(poll, author, userVotedOptionIndex = null, isLiked = false, isReshared = false) {
  const name = author?.name ? escapeHTML(author.name) : 'Anonymous Student';
  const username = author?.username ? escapeHTML(author.username) : 'student';
  const totalVotes = poll.totalVotes || 0;
  const hasVoted = userVotedOptionIndex !== null;
  const fontStyle = getUserFontFamily(author);

  const avatarHTML = renderUserAvatar(author, 44, 'border: 1px solid var(--border-color);');

  let optionsHTML = '';

  if (!hasVoted) {
    // Unvoted State: Interactive Option Pills
    optionsHTML = `
      <div class="poll-options-container" style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
        ${poll.options.map((opt, idx) => `
          <button class="poll-option-btn" data-poll-id="${poll.pollId}" data-option-index="${idx}" style="font-family: ${fontStyle};">
            <span>${escapeHTML(opt.text)}</span>
          </button>
        `).join('')}
      </div>
    `;
  } else {
    // Voted State: Twitter Percentage Bars with Vote Counts
    optionsHTML = `
      <div class="poll-results-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
        ${poll.options.map((opt, idx) => {
          const votes = opt.votes || 0;
          const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
          const isUserChoice = userVotedOptionIndex === idx;

          return `
            <div class="poll-result-bar-wrapper ${isUserChoice ? 'user-selected' : ''}">
              <div class="poll-result-fill" style="width: ${percentage}%;"></div>
              <div class="poll-result-label" style="font-family: ${fontStyle};">
                <span style="display: flex; align-items: center; gap: 6px; font-weight: ${isUserChoice ? '700' : '500'};">
                  ${escapeHTML(opt.text)}
                  ${isUserChoice ? `<span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">check_circle</span>` : ''}
                </span>
                <span style="font-weight: 700; color: ${isUserChoice ? 'var(--text-primary)' : 'var(--text-secondary)'}; flex-shrink: 0;">
                  ${percentage}% <span style="font-size: 12px; font-weight: 500; opacity: 0.85;">(${votes} vote${votes === 1 ? '' : 's'})</span>
                </span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  return `
    <article class="card fade-in poll-card" data-poll-id="${poll.pollId}" data-creator-id="${poll.creatorId}" style="margin-bottom: 16px; border-radius: var(--border-radius);">
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <a href="#/profile?u=${username}" style="text-decoration: none; color: inherit; display: inline-flex;" title="View @${username}'s profile">
          ${avatarHTML}
        </a>
        <div style="flex: 1; min-width: 0;">
          <div class="post-header">
            <div class="author-meta">
              <a href="#/profile?u=${username}" style="text-decoration: none; color: inherit;" title="View @${username}'s profile">
                <span class="author-name" style="font-family: ${fontStyle};">${name}</span>
              </a>
              <a href="#/profile?u=${username}" style="text-decoration: none; color: inherit;" title="View @${username}'s profile">
                <span class="author-handle">@${username}</span>
              </a>
              <span class="post-dot">·</span>
              <span class="post-time">${formatTimeAgo(poll.timestamp)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="brand-badge" style="font-size: 11px;">CAMPUS POLL</span>
              <button class="btn-ghost poll-options-btn" style="padding: 4px;" title="Options" data-poll-id="${poll.pollId}" data-creator-id="${poll.creatorId}">
                <span class="material-symbols-outlined" style="font-size: 18px;">more_horiz</span>
              </button>
            </div>
          </div>

          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-top: 6px; line-height: 1.4; font-family: ${fontStyle};">
            ${escapeHTML(poll.question)}
          </div>

          ${optionsHTML}

          <div style="margin-top: 10px; font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 12px;">
            <span>${totalVotes} total vote${totalVotes === 1 ? '' : 's'}</span>
            <span>·</span>
            <span>${hasVoted ? 'Final results' : 'Active poll'}</span>
          </div>

          <!-- Action Buttons (Reply, Reshare, Like, Bookmark) -->
          <div class="post-actions">
            <button class="action-btn poll-reply-btn" data-poll-id="${poll.pollId}">
              <span class="material-symbols-outlined">chat_bubble</span>
              <span>${poll.replyCount || 0}</span>
            </button>

            <button class="action-btn poll-reshare-btn ${isReshared ? 'reshared' : ''}" data-poll-id="${poll.pollId}" style="${isReshared ? 'color: #00BA7C;' : ''}">
              <span class="material-symbols-outlined">repeat</span>
              <span class="poll-reshare-count">${poll.reshares || 0}</span>
            </button>

            <button class="action-btn poll-like-btn ${isLiked ? 'liked heart-pop' : ''}" data-poll-id="${poll.pollId}">
              <span class="material-symbols-outlined">favorite</span>
              <span class="poll-like-count">${poll.likes || 0}</span>
            </button>

            <button class="action-btn">
              <span class="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}
