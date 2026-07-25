import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { getPetitionById, hasUserSignedPetition, signPetition, getPetitionSignatories } from '../services/petitionService.js';
import { getUserProfile } from '../services/postService.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

export async function renderPetitionDetail(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  // Skeleton view during initial load
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()" title="Back">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Petition Imprint</h1>
      </div>
    </header>
    ${renderFeedSkeletons(2)}
  `, ROUTES.PETITIONS);

  const hash = window.location.hash;
  let petitionId = null;

  if (hash.includes('?id=')) {
    petitionId = hash.split('?id=')[1];
  }

  if (!petitionId) {
    renderNotFound(container, 'No petition ID specified.');
    return;
  }

  const petition = await getPetitionById(petitionId);
  if (!petition) {
    renderNotFound(container, 'This campus petition does not exist.');
    return;
  }

  const creator = await getUserProfile(petition.creatorId);
  const currentUid = auth.currentUser.uid;
  const isSigned = await hasUserSignedPetition(petition.petitionId, currentUid);
  const signatories = await getPetitionSignatories(petition.petitionId);

  const signatureCount = petition.signatureCount || 0;
  const goalTarget = petition.goalSignatures || 100;
  const percentage = Math.min(100, Math.round((signatureCount / goalTarget) * 100));
  const isGoalReached = signatureCount >= goalTarget;

  const creatorName = creator?.name ? escapeHTML(creator.name) : 'Student Representative';
  const creatorUsername = creator?.username ? escapeHTML(creator.username) : 'student';

  const dateFormatted = new Date(petition.timestamp || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const content = `
    <!-- Header -->
    <header class="sticky-header print-hide">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="btn-ghost" onclick="window.history.back()" title="Back">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="header-title">Petition Imprint Document</h1>
        </div>

        <button id="print-petition-btn" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">print</span>
          Export PDF / Print
        </button>
      </div>
    </header>

    <!-- Official Signed Imprint Charter Document (Printable) -->
    <div id="imprint-document-container" class="fade-in" style="padding: 24px 20px;">
      
      <!-- Official SJC Imprint Seal Header -->
      <div class="imprint-seal-header" style="border: 2px solid var(--border-color); border-radius: 20px; padding: 24px; background: linear-gradient(135deg, rgba(29, 155, 240, 0.08) 0%, rgba(22, 24, 28, 0.95) 100%); margin-bottom: 24px; position: relative;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #1D9BF0, #004477); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 26px; box-shadow: 0 4px 16px rgba(29, 155, 240, 0.3);">
              B
            </div>
            <div>
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; color: var(--accent-primary); text-transform: uppercase;">ST. JOSEPH'S COLLEGE</span>
              <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-top: 1px;">STUDENT CHARTER & PETITION IMPRINT</h2>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="brand-badge" style="font-size: 12px; padding: 6px 12px;">${escapeHTML(petition.category)}</span>
            <span class="brand-badge" style="font-size: 12px; padding: 6px 12px; background: ${isGoalReached ? 'rgba(0, 186, 124, 0.2)' : 'rgba(29, 155, 240, 0.15)'}; color: ${isGoalReached ? '#00BA7C' : 'var(--accent-primary)'}; border-color: ${isGoalReached ? '#00BA7C' : 'var(--accent-primary)'};">
              ${isGoalReached ? '🎉 GOAL ACHIEVED' : 'ACTIVE PETITION'}
            </span>
          </div>
        </div>

        <div style="font-size: 13px; color: var(--text-secondary); display: flex; flex-wrap: wrap; gap: 20px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <div><strong style="color: var(--text-primary);">Target Recipient:</strong> ${escapeHTML(petition.targetRecipient)}</div>
          <div><strong style="color: var(--text-primary);">Date Submitted:</strong> ${dateFormatted}</div>
          <div><strong style="color: var(--text-primary);">Document ID:</strong> ${escapeHTML(petition.petitionId)}</div>
        </div>
      </div>

      <!-- Main Petition Title & Progress -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 24px; font-weight: 800; color: var(--text-primary); line-height: 1.35; margin-bottom: 12px;">
          ${escapeHTML(petition.title)}
        </h1>

        <!-- Signature Progress Bar -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 14px; margin-bottom: 8px;">
            <span style="font-weight: 700; color: var(--text-primary);">
              <strong id="signature-count-display" style="font-size: 18px; color: var(--accent-primary);">${signatureCount}</strong> signatures collected
            </span>
            <span style="color: var(--text-secondary); font-weight: 600;">Goal: ${goalTarget}</span>
          </div>

          <div style="width: 100%; height: 10px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
            <div id="signature-progress-fill" style="height: 100%; width: ${percentage}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C); transition: width 0.4s ease;"></div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary); margin-top: 8px;">
            <span>${percentage}% of goal reached</span>
            <span>Created by @${creatorUsername} (${creatorName})</span>
          </div>
        </div>

        <!-- Digital Sign Action Button (Print Hidden) -->
        <div class="print-hide" style="margin-bottom: 24px;">
          <button id="sign-petition-btn" class="btn" style="width: 100%; padding: 14px; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 16px rgba(29, 155, 240, 0.3);" ${isSigned ? 'disabled' : ''}>
            <span class="material-symbols-outlined">draw</span>
            <span>${isSigned ? '✓ You Have Signed This Petition' : '✍️ Sign This Petition'}</span>
          </button>
        </div>

        <!-- Formal Petition Demand Statement -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 800; color: var(--accent-primary); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">gavel</span>
            Formal Statement of Student Demand
          </h3>
          <div style="font-size: 16px; line-height: 1.6; color: var(--text-primary); white-space: pre-line; word-break: break-word;">
            ${escapeHTML(petition.statement)}
          </div>
        </div>

        <!-- Signatures Roster / Roll of Honor -->
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
            <span style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: var(--accent-primary);">verified</span>
              Verified Signatures Roster (${signatories.length})
            </span>
            <span style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">Digital Signatures Log</span>
          </h3>

          <div id="signatories-list-container">
            ${signatories.length === 0 ? `
              <div style="padding: 30px; text-align: center; color: var(--text-secondary); font-size: 14px;">
                No signatures recorded yet. Be the first student to sign this petition!
              </div>
            ` : `
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                    <th style="padding: 10px 8px;">#</th>
                    <th style="padding: 10px 8px;">Student Name</th>
                    <th style="padding: 10px 8px;">Class</th>
                    <th style="padding: 10px 8px;">Date & Time Signed</th>
                  </tr>
                </thead>
                <tbody id="signatories-tbody">
                  ${signatories.map((sig, idx) => `
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 12px 8px; font-weight: 700; color: var(--text-secondary);">${idx + 1}</td>
                      <td style="padding: 12px 8px; font-weight: 700; color: var(--text-primary);">${escapeHTML(sig.name)} <span style="font-weight: 400; color: var(--text-secondary); font-size: 12px;">(@${escapeHTML(sig.username)})</span></td>
                      <td style="padding: 12px 8px; color: var(--text-secondary);">${escapeHTML(sig.class || 'N/A')}</td>
                      <td style="padding: 12px 8px; color: var(--text-secondary); font-size: 13px;">${new Date(sig.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `}
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.PETITIONS);
  attachLayoutListeners();

  const printBtn = document.getElementById('print-petition-btn');
  const signBtn = document.getElementById('sign-petition-btn');
  const countDisplay = document.getElementById('signature-count-display');
  const progressFill = document.getElementById('signature-progress-fill');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (signBtn) {
    signBtn.addEventListener('click', async () => {
      signBtn.disabled = true;
      signBtn.textContent = 'Recording Signature...';

      try {
        const res = await signPetition(petition.petitionId);
        signBtn.textContent = '✓ You Have Signed This Petition';

        if (countDisplay) countDisplay.textContent = res.signatureCount;
        if (progressFill) {
          const newPct = Math.min(100, Math.round((res.signatureCount / goalTarget) * 100));
          progressFill.style.width = `${newPct}%`;
        }

        // Re-render petition detail to reflect updated roster
        setTimeout(() => renderPetitionDetail(container), 800);
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to sign petition.');
        signBtn.disabled = false;
        signBtn.textContent = '✍️ Sign This Petition';
      }
    });
  }
}

function renderNotFound(container, message) {
  container.innerHTML = createLayout(`
    <header class="sticky-header">
      <div style="display: flex; align-items: center; gap: 16px;">
        <button class="btn-ghost" onclick="window.history.back()">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="header-title">Petition</h1>
      </div>
    </header>
    <div style="padding: 60px 20px; text-align: center;" class="fade-in">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">campaign</span>
      <h2 style="font-size: 20px; font-weight: 800;">Petition Not Found</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${message}</p>
    </div>
  `, ROUTES.PETITIONS);
  attachLayoutListeners();
}
