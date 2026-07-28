import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { createPoll, subscribeToPolls, getUserVote, voteInPoll } from '../services/pollService.js';
import { getUserProfile } from '../services/postService.js';
import { createPollCardHTML } from '../components/PollCard.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

let pollsUnsubscribe = null;

export function renderPolls(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Campus Polls</h1>
    </header>

    <!-- Create Poll Card -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div class="card" style="padding: 20px;">
        <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">poll</span>
          Create a Campus Poll (Up to 13 options)
        </h3>

        <input type="text" id="poll-question" class="input-field" placeholder="Ask a question (e.g. Which canteen dish is best?)" style="margin-bottom: 12px;" />

        <div id="poll-options-inputs" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
          <input type="text" class="input-field poll-opt-input" placeholder="Option 1" style="margin-bottom: 0;" />
          <input type="text" class="input-field poll-opt-input" placeholder="Option 2" style="margin-bottom: 0;" />
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
          <button type="button" id="add-option-btn" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px;">
            + Add Option (Max 13)
          </button>

          <div style="display: flex; align-items: center; gap: 12px;">
            <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); cursor: pointer;">
              <input type="checkbox" id="dedicated-poll-anonymous-checkbox" style="width: 14px; height: 14px; accent-color: var(--accent-primary); cursor: pointer;" />
              Anonymous
            </label>
            <button type="button" id="submit-poll-btn" class="btn">
              Publish Poll
            </button>
          </div>
        </div>

        <div id="poll-error" class="error-text" style="display: none; margin-top: 12px; margin-bottom: 0;"></div>
      </div>
    </div>

    <!-- Active Polls Feed -->
    <div id="polls-feed-container" style="padding: 16px;">
      ${renderFeedSkeletons(3)}
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.POLLS);
  const layoutCleanup = attachLayoutListeners();

  const questionInput = document.getElementById('poll-question');
  const optionsContainer = document.getElementById('poll-options-inputs');
  const addOptionBtn = document.getElementById('add-option-btn');
  const submitPollBtn = document.getElementById('submit-poll-btn');
  const pollError = document.getElementById('poll-error');
  const pollsFeedContainer = document.getElementById('polls-feed-container');

  // Dynamic 3rd through 13th Option fields
  addOptionBtn.addEventListener('click', () => {
    const currentInputs = optionsContainer.querySelectorAll('.poll-opt-input');
    if (currentInputs.length < 13) {
      const nextIdx = currentInputs.length + 1;
      const newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.className = 'input-field poll-opt-input fade-in';
      newInput.placeholder = `Option ${nextIdx}`;
      newInput.style.marginBottom = '0';
      optionsContainer.appendChild(newInput);

      if (currentInputs.length + 1 === 13) {
        addOptionBtn.style.display = 'none';
      }
    }
  });

  // Submit Poll
  submitPollBtn.addEventListener('click', async () => {
    pollError.style.display = 'none';
    const question = questionInput.value.trim();
    const optionInputs = optionsContainer.querySelectorAll('.poll-opt-input');
    const optionTexts = Array.from(optionInputs).map(inp => inp.value.trim());
    const isAnonymous = document.getElementById('dedicated-poll-anonymous-checkbox').checked;

    submitPollBtn.disabled = true;
    submitPollBtn.textContent = 'Publishing...';

    try {
      await createPoll(question, optionTexts, isAnonymous);
      questionInput.value = '';
      document.getElementById('dedicated-poll-anonymous-checkbox').checked = false;
      // Reset back to 2 default inputs
      optionsContainer.innerHTML = `
        <input type="text" class="input-field poll-opt-input" placeholder="Option 1" style="margin-bottom: 0;" />
        <input type="text" class="input-field poll-opt-input" placeholder="Option 2" style="margin-bottom: 0;" />
      `;
      addOptionBtn.style.display = 'inline-block';
    } catch (err) {
      pollError.textContent = err.message;
      pollError.style.display = 'block';
    } finally {
      submitPollBtn.disabled = false;
      submitPollBtn.textContent = 'Publish Poll';
    }
  });

  // Subscribe to Realtime Polls Feed
  if (pollsUnsubscribe) pollsUnsubscribe();

  pollsUnsubscribe = subscribeToPolls(20, async (polls) => {
    if (polls.length === 0) {
      pollsFeedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">poll</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No active polls</h3>
          <p style="font-size: 14px;">Create the first poll above to gather student opinions!</p>
        </div>
      `;
      return;
    }

    let html = '';
    const currentUid = auth.currentUser.uid;

    for (const poll of polls) {
      const author = await getUserProfile(poll.creatorId);
      const userVote = await getUserVote(poll.pollId, currentUid);
      html += createPollCardHTML(poll, author, userVote);
    }

    pollsFeedContainer.innerHTML = html;

    // Attach click listeners for Poll Voting
    pollsFeedContainer.querySelectorAll('.poll-option-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const pollId = btn.dataset.pollId;
        const optionIndex = parseInt(btn.dataset.optionIndex);

        btn.disabled = true;
        btn.textContent = 'Recording vote...';

        try {
          await voteInPoll(pollId, optionIndex);
        } catch (err) {
          alert(err.message || 'Failed to record vote');
        }
      });
    });
  });

  return () => {
    if (layoutCleanup) layoutCleanup();
    if (pollsUnsubscribe) { pollsUnsubscribe(); pollsUnsubscribe = null; }
  };
}
