import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { getPollById, getUserVote, voteInPoll, toggleLikePoll, isPollLikedByUser, toggleResharePoll, isPollResharedByUser, createPollReply, subscribeToPollReplies, deleteOwnPoll, deletePollAsStaff } from '../services/pollService.js';
import { getUserProfile } from '../services/postService.js';
import { createPollCardHTML } from '../components/PollCard.js';
import { showContextMenu } from '../components/ContextMenu.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { formatTimeAgo } from '../helpers/time.js';
import { getUserFontFamily } from '../constants/fonts.js';
import { LIMITS } from '../constants/limits.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

let repliesUnsubscribe = null;

export async function renderPollDetail(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  // Initial skeleton layout
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Campus Poll</h1>
      </div>
    </header>
    ${renderFeedSkeletons(2)}
  `, ROUTES.POLLS);

  const hash = window.location.hash;
  let pollId = null;
  if (hash.includes('?id=')) {
    pollId = hash.split('?id=')[1];
  }

  if (!pollId) {
    renderNotFound(container, 'No poll ID specified.');
    return;
  }

  const poll = await getPollById(pollId);
  if (!poll) {
    renderNotFound(container, 'This campus poll does not exist or has been deleted.');
    return;
  }

  const creator = await getUserProfile(poll.creatorId);
  const currentUid = auth.currentUser.uid;
  const userVote = await getUserVote(poll.pollId, currentUid);
  const isLiked = await isPollLikedByUser(poll.pollId, currentUid);
  const isReshared = await isPollResharedByUser(poll.pollId, currentUid);

  const currentUser = auth.currentUser;
  const currentAvatarHTML = renderUserAvatar(currentUser.photoURL || '', 40);

  const isAnon = poll.isAnonymous === true;

  // Build UID → Anonymous Number map for this poll context
  const anonMap = new Map();
  anonMap.set(poll.creatorId, 1);
  let anonCounter = 2;

  function getAnonNumber(uid) {
    if (!anonMap.has(uid)) {
      anonMap.set(uid, anonCounter++);
    }
    return anonMap.get(uid);
  }

  function getAnonAvatar(num, size = 36) {
    const gradients = [
      'linear-gradient(135deg, #6366f1, #8b5cf6)',
      'linear-gradient(135deg, #f97316, #ef4444)',
      'linear-gradient(135deg, #14b8a6, #06b6d4)',
      'linear-gradient(135deg, #ec4899, #f43f5e)',
      'linear-gradient(135deg, #eab308, #f97316)',
      'linear-gradient(135deg, #22c55e, #10b981)',
      'linear-gradient(135deg, #3b82f6, #6366f1)',
      'linear-gradient(135deg, #a855f7, #ec4899)',
    ];
    const grad = gradients[(num - 1) % gradients.length];
    return `<div class="avatar" style="width: ${size}px; height: ${size}px; font-size: ${Math.round(size * 0.38)}px; background: ${grad}; font-weight: 800;">A${num}</div>`;
  }

  const pollCardHTML = createPollCardHTML(poll, creator, userVote, isLiked, isReshared);

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Campus Poll</h1>
      </div>
    </header>

    <!-- Main Poll Card Container -->
    <div style="padding: 16px 16px 0 16px;">
      ${pollCardHTML}
    </div>

    <!-- Reply Composer -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px;" class="fade-in">
      ${currentAvatarHTML}
      <div style="flex: 1; min-width: 0;">
        <textarea id="poll-reply-input" class="input-field" placeholder="Post your reply to this poll..." rows="2" style="resize: none; font-size: 15px; border: none; background: transparent; padding: 0; outline: none; box-shadow: none;"></textarea>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
          <span id="poll-reply-char-counter" style="font-size: 12px; color: var(--text-secondary);">0 / ${LIMITS.REPLY_MAX_LENGTH}</span>
          <button id="submit-poll-reply-btn" class="btn" disabled style="font-size: 14px; padding: 6px 16px;">Reply</button>
        </div>
      </div>
    </div>

    <!-- Live Poll Replies Feed Container -->
    <div id="poll-replies-container" style="padding: 16px;">
      ${renderFeedSkeletons(2)}
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.POLLS);
  attachLayoutListeners();

  const replyInput = document.getElementById('poll-reply-input');
  const replyCounter = document.getElementById('poll-reply-char-counter');
  const submitReplyBtn = document.getElementById('submit-poll-reply-btn');
  const repliesContainer = document.getElementById('poll-replies-container');

  // Attach voting option listeners
  container.querySelectorAll('.poll-option-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const optionIndex = parseInt(btn.dataset.optionIndex);
      btn.disabled = true;
      btn.textContent = 'Recording vote...';
      try {
        await voteInPoll(poll.pollId, optionIndex);
        renderPollDetail(container); // Refresh view
      } catch (err) {
        alert(err.message || 'Failed to record vote.');
      }
    });
  });

  // Attach like button listener
  const likeBtn = container.querySelector('.poll-like-btn');
  if (likeBtn) {
    likeBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      likeBtn.disabled = true;
      try {
        const res = await toggleLikePoll(poll.pollId);
        if (res.liked) {
          likeBtn.classList.add('liked', 'heart-pop');
        } else {
          likeBtn.classList.remove('liked', 'heart-pop');
        }
        const countSpan = likeBtn.querySelector('.poll-like-count');
        if (countSpan) countSpan.textContent = res.likes;
      } catch (err) {
        console.error(err);
      } finally {
        likeBtn.disabled = false;
      }
    });
  }

  // Attach reshare button listener
  const reshareBtn = container.querySelector('.poll-reshare-btn');
  if (reshareBtn) {
    reshareBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      reshareBtn.disabled = true;
      try {
        const res = await toggleResharePoll(poll.pollId);
        if (res.reshared) {
          reshareBtn.classList.add('reshared');
          reshareBtn.style.color = '#00BA7C';
        } else {
          reshareBtn.classList.remove('reshared');
          reshareBtn.style.color = '';
        }
        const countSpan = reshareBtn.querySelector('.poll-reshare-count');
        if (countSpan) countSpan.textContent = res.reshares;
      } catch (err) {
        console.error(err);
      } finally {
        reshareBtn.disabled = false;
      }
    });
  }

  // Attach options context menu listener
  const optionsBtn = container.querySelector('.poll-options-btn');
  if (optionsBtn) {
    optionsBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const creatorProfile = await getUserProfile(currentUid);
      const isStaff = creatorProfile?.role === 'staff' || creatorProfile?.role === 'admin';

      showContextMenu(optionsBtn, {
        itemId: poll.pollId,
        authorId: poll.creatorId,
        currentUid: currentUid,
        isStaff: isStaff,
        itemType: 'poll',
        onDelete: async (id) => {
          try {
            if (currentUid === poll.creatorId) {
              await deleteOwnPoll(id);
            } else if (isStaff) {
              await deletePollAsStaff(id);
            }
            window.history.back();
          } catch (err) {
            alert(err.message || 'Failed to delete poll.');
          }
        },
        onReport: async (id, reason) => {
          alert('Thank you for reporting. Your report has been submitted to SJC Moderation.');
        }
      });
    });
  }

  // Textarea char counter
  replyInput.addEventListener('input', () => {
    const len = replyInput.value.length;
    replyCounter.textContent = `${len} / ${LIMITS.REPLY_MAX_LENGTH}`;

    if (len > LIMITS.REPLY_MAX_LENGTH) {
      replyCounter.style.color = 'var(--error-color)';
      submitReplyBtn.disabled = true;
    } else if (len === 0 || replyInput.value.trim() === '') {
      replyCounter.style.color = 'var(--text-secondary)';
      submitReplyBtn.disabled = true;
    } else {
      replyCounter.style.color = 'var(--accent-primary)';
      submitReplyBtn.disabled = false;
    }
  });

  // Submit poll reply
  submitReplyBtn.addEventListener('click', async () => {
    const text = replyInput.value.trim();
    if (text.length > 0 && text.length <= LIMITS.REPLY_MAX_LENGTH) {
      submitReplyBtn.disabled = true;
      submitReplyBtn.textContent = 'Replying...';

      try {
        await createPollReply(poll.pollId, text);
        replyInput.value = '';
        replyInput.dispatchEvent(new Event('input'));
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to submit reply.');
      } finally {
        submitReplyBtn.textContent = 'Reply';
      }
    }
  });

  // Subscribe to poll replies
  if (repliesUnsubscribe) repliesUnsubscribe();

  repliesUnsubscribe = subscribeToPollReplies(poll.pollId, async (replies) => {
    if (!repliesContainer) return;

    if (replies.length === 0) {
      repliesContainer.innerHTML = `
        <div style="padding: 30px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 36px; color: var(--text-muted); margin-bottom: 8px;">chat_bubble_outline</span>
          <div style="font-size: 14px; font-weight: 600;">No replies yet</div>
          <div style="font-size: 13px; margin-top: 2px;">Be the first student to share your thoughts on this poll!</div>
        </div>
      `;
      return;
    }

    let html = '';
    for (const reply of replies) {
      const author = await getUserProfile(reply.authorId);
      
      let rAvatar, rName, rUsername, rFont;
      if (isAnon) {
        const num = getAnonNumber(reply.authorId);
        rAvatar = getAnonAvatar(num);
        rName = `Anonymous ${num}`;
        rUsername = `anonymous_${num}`;
        rFont = "'Inter', sans-serif";
      } else {
        rAvatar = renderUserAvatar(author, 36);
        rName = author?.name ? escapeHTML(author.name) : 'Student';
        rUsername = author?.username ? escapeHTML(author.username) : 'student';
        rFont = getUserFontFamily(author);
      }

      html += `
        <div class="card fade-in" style="padding: 14px; margin-bottom: 10px; border-radius: 12px; display: flex; gap: 10px;">
          ${rAvatar}
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 14px; font-family: ${rFont}; color: var(--text-primary);">${rName}</span>
                <span style="font-size: 13px; color: var(--text-secondary);">@${rUsername}</span>
              </div>
              <span class="time-ago" data-timestamp="${reply.timestamp}" style="font-size: 12px; color: var(--text-secondary);">${formatTimeAgo(reply.timestamp)}</span>
            </div>
            <div style="font-size: 14px; line-height: 1.45; color: var(--text-primary); font-family: ${rFont};">
              ${escapeHTML(reply.content)}
            </div>
          </div>
        </div>
      `;
    }

    repliesContainer.innerHTML = html;
  });
}

function renderNotFound(container, message) {
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Campus Poll</h1>
      </div>
    </header>
    <div style="padding: 60px 20px; text-align: center;" class="fade-in">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">poll</span>
      <h2 style="font-size: 20px; font-weight: 800;">Poll Not Found</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${message}</p>
    </div>
  `, ROUTES.POLLS);
  attachLayoutListeners();
}
