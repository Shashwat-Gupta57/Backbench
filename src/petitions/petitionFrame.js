import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { getPetitionById, hasUserSignedPetition, signPetition, getPetitionSignatories } from '../services/petitionService.js';
import { getUserProfile } from '../services/postService.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

export async function renderPetitionFrame(container) {
  // Extract petitionId from URL e.g. #/petition-frame?id=-O1234
  const hash = window.location.hash;
  let petitionId = null;

  if (hash.includes('?id=')) {
    petitionId = hash.split('?id=')[1];
  }

  if (!petitionId) {
    renderFrameNotFound(container, 'No petition ID specified in frame URL.');
    return;
  }

  // Render skeleton container
  container.innerHTML = `
    <div style="min-height: 100vh; background: #0f1115; color: #f7f9f9; padding: 20px 12px; font-family: var(--font-family);">
      <div style="max-width: 800px; margin: 0 auto;">
        ${renderFeedSkeletons(3)}
      </div>
    </div>
  `;

  const petition = await getPetitionById(petitionId);
  if (!petition) {
    renderFrameNotFound(container, 'This campus petition frame could not be found.');
    return;
  }

  const creator = await getUserProfile(petition.creatorId);
  const currentUser = auth.currentUser;
  const isSigned = currentUser ? await hasUserSignedPetition(petition.petitionId, currentUser.uid) : false;
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

  const frameLink = `${window.location.origin}${window.location.pathname}#/petition-frame?id=${petition.petitionId}`;

  const frameHTML = `
    <div style="min-height: 100vh; background: #0a0c10; color: #111827; padding: 24px 12px; font-family: 'Inter', sans-serif;">
      
      <!-- Top Navigation & Action Header -->
      <div style="max-width: 840px; margin: 0 auto 20px auto; display: flex; justify-content: space-between; align-items: center; background: #16181c; padding: 12px 20px; border-radius: 14px; border: 1px solid #2f3336; color: #f7f9f9;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="${ROUTES.PETITIONS}" class="btn-ghost" title="Back to Backbench" style="color: #f7f9f9;">
            <span class="material-symbols-outlined">arrow_back</span>
          </a>
          <span style="font-size: 14px; font-weight: 700; color: var(--accent-primary);">OFFICIAL PETITION FRAME MODE</span>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="copy-petition-frame-link-btn" class="btn btn-outline" style="font-size: 12px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; border-color: #2f3336; color: #f7f9f9;">
            <span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span>
            Copy Frame Link
          </button>
          <button onclick="window.print()" class="btn btn-outline" style="font-size: 12px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; border-color: #2f3336; color: #f7f9f9;">
            <span class="material-symbols-outlined" style="font-size: 16px;">print</span>
            Print Paper Charter
          </button>
        </div>
      </div>

      ${!currentUser ? `
        <!-- Authentication Prompt Banner if Logged Out -->
        <div style="max-width: 840px; margin: 0 auto 20px auto; background: linear-gradient(90deg, #1d9bf0, #00ba7c); padding: 14px 20px; border-radius: 14px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: 0 8px 24px rgba(29, 155, 240, 0.3);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="material-symbols-outlined" style="font-size: 24px;">lock_open</span>
            <div>
              <strong style="font-size: 15px;">Sign in to add your verified student signature</strong>
              <div style="font-size: 12px; opacity: 0.9;">You are viewing this petition frame document. Log in to sign.</div>
            </div>
          </div>
          <a href="#/login?redirect=${encodeURIComponent(`#/petition-frame?id=${petition.petitionId}`)}" class="btn" style="background: #ffffff; color: #000000; font-weight: 800; padding: 8px 18px; font-size: 13px; text-decoration: none;">
            Sign In to Sign
          </a>
        </div>
      ` : ''}

      <!-- Official Paper Parchment Charter Container -->
      <div id="paper-charter-document" style="max-width: 840px; margin: 0 auto; background: #FDFBF7; border: 3px solid #C5B396; border-radius: 18px; padding: 36px 32px; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6); position: relative; overflow: hidden;">

        <!-- Parchment Vintage Watermark & Stamp -->
        <div style="position: absolute; top: -30px; right: -30px; width: 180px; height: 180px; background: rgba(197, 179, 150, 0.12); border-radius: 50%; pointer-events: none; border: 2px dashed #C5B396; transform: rotate(-15deg); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; color: #8A7352; text-transform: uppercase; letter-spacing: 2px; text-align: center; padding: 20px;">
          SJC STUDENT CHARTER SEAL
        </div>

        <!-- Official Header & Crest -->
        <div style="border-bottom: 2px solid #D8CBBC; padding-bottom: 24px; margin-bottom: 28px; text-align: center;">
          <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-bottom: 10px;">
            <div style="width: 52px; height: 52px; background: #1E3A8A; color: #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 28px; font-family: serif; border: 3px solid #C5B396; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);">
              SJC
            </div>
          </div>
          <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #1E3A8A; text-transform: uppercase;">ST. JOSEPH'S COLLEGE • STUDENT COUNCIL</span>
          <h1 style="font-size: 26px; font-weight: 900; font-family: serif; color: #111827; margin-top: 4px; letter-spacing: -0.5px;">
            OFFICIAL STUDENT PETITION CHARTER
          </h1>
          <div style="font-size: 13px; color: #4B5563; font-style: italic; margin-top: 2px;">
            Document ID: ${escapeHTML(petition.petitionId)} • Category: ${escapeHTML(petition.category)}
          </div>
        </div>

        <!-- Petition Metadata Banner -->
        <div style="background: #F4EFE6; border: 1px solid #D8CBBC; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Target Authority</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${escapeHTML(petition.targetRecipient)}</div>
          </div>

          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Petition Sponsor</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${creatorName} (@${creatorUsername})</div>
          </div>

          <div>
            <div style="font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px;">Date Filed</div>
            <div style="font-size: 15px; font-weight: 800; color: #111827;">${dateFormatted}</div>
          </div>
        </div>

        <!-- Title of Demand -->
        <div style="margin-bottom: 24px;">
          <span style="font-size: 12px; font-weight: 800; color: #1E3A8A; text-transform: uppercase; letter-spacing: 1px;">SUBJECT MATTER OF PETITION</span>
          <h2 style="font-size: 22px; font-weight: 900; color: #111827; line-height: 1.35; font-family: serif; margin-top: 4px;">
            "${escapeHTML(petition.title)}"
          </h2>
        </div>

        <!-- Formal Statement of Demand -->
        <div style="background: #FFFFFF; border: 1px solid #E5E7EB; border-left: 4px solid #1E3A8A; border-radius: 8px; padding: 24px; margin-bottom: 28px;">
          <h3 style="font-size: 13px; font-weight: 800; color: #1E3A8A; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">gavel</span>
            Formal Declaration & Student Demand Statement
          </h3>
          <div style="font-size: 16px; line-height: 1.7; color: #1F2937; font-family: serif; white-space: pre-line; word-break: break-word;">
            ${escapeHTML(petition.statement)}
          </div>
        </div>

        <!-- Live Signatures Progress Box -->
        <div style="background: #F4EFE6; border: 2px solid #C5B396; border-radius: 14px; padding: 20px; margin-bottom: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 15px; font-weight: 800; color: #111827; display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: #1D9BF0;">verified</span>
              Verified Student Signatures: <strong id="frame-count-display" style="font-size: 20px; color: #1E3A8A;">${signatureCount}</strong> / ${goalTarget} Required
            </span>
            <span style="font-size: 14px; font-weight: 800; color: ${isGoalReached ? '#059669' : '#1D9BF0'};">
              ${percentage}% Signed ${isGoalReached ? '🎉 (GOAL ACHIEVED)' : ''}
            </span>
          </div>

          <div style="width: 100%; height: 12px; background: #D8CBBC; border-radius: 9999px; overflow: hidden;">
            <div id="frame-progress-fill" style="height: 100%; width: ${percentage}%; background: linear-gradient(90deg, #1E3A8A, #059669); transition: width 0.4s ease;"></div>
          </div>
        </div>

        <!-- Official Terms & Conditions Box -->
        <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 12px; padding: 16px; margin-bottom: 28px; font-size: 13px; color: #92400E;">
          <strong style="display: block; font-weight: 800; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">📜 Official Signing Terms & Student Rules:</strong>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li>Each signature is digitally authenticated and tied to your verified St. Joseph's College account.</li>
            <li>Multiple or duplicate signatures by the same account are strictly prevented.</li>
            <li>Your digital signature acts as a binding vote on this student petition charter.</li>
          </ul>
        </div>

        <!-- Digital Sign Action Section -->
        <div style="text-align: center; margin-bottom: 32px;">
          ${currentUser ? `
            <button id="frame-sign-btn" class="btn" style="background: linear-gradient(135deg, #1E3A8A, #1D9BF0); color: #FFFFFF; font-size: 17px; font-weight: 800; padding: 16px 36px; border-radius: 12px; border: none; cursor: pointer; box-shadow: 0 8px 24px rgba(30, 58, 138, 0.4); display: inline-flex; align-items: center; gap: 10px;" ${isSigned ? 'disabled' : ''}>
              <span class="material-symbols-outlined" style="font-size: 22px;">draw</span>
              <span>${isSigned ? '✓ Official Signature Recorded' : '✍️ Sign This Official Petition Paper'}</span>
            </button>
          ` : `
            <a href="#/login?redirect=${encodeURIComponent(`#/petition-frame?id=${petition.petitionId}`)}" class="btn" style="background: #1E3A8A; color: #FFFFFF; font-size: 16px; font-weight: 800; padding: 16px 36px; border-radius: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined">login</span>
              Log In to Sign Petition
            </a>
          `}
        </div>

        <!-- Verified Signatures Table Roster -->
        <div>
          <h3 style="font-size: 16px; font-weight: 900; font-family: serif; color: #111827; margin-bottom: 14px; border-bottom: 2px solid #D8CBBC; padding-bottom: 8px;">
            ROLL OF VERIFIED SIGNATORIES (${signatories.length})
          </h3>

          ${signatories.length === 0 ? `
            <div style="padding: 24px; text-align: center; color: #6B7280; font-style: italic;">
              No signatures recorded on paper yet. Be the first student to sign!
            </div>
          ` : `
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="border-bottom: 2px solid #D8CBBC; color: #4B5563; font-weight: 800; text-transform: uppercase; font-size: 11px;">
                  <th style="padding: 8px;">No.</th>
                  <th style="padding: 8px;">Signatory Name</th>
                  <th style="padding: 8px;">Class / Department</th>
                  <th style="padding: 8px;">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                ${signatories.map((sig, idx) => `
                  <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 10px 8px; font-weight: 800; color: #6B7280;">${idx + 1}</td>
                    <td style="padding: 10px 8px; font-weight: 800; color: #111827;">${escapeHTML(sig.name)} <span style="font-weight: 400; color: #6B7280;">(@${escapeHTML(sig.username)})</span></td>
                    <td style="padding: 10px 8px; color: #4B5563;">${escapeHTML(sig.class || 'SJC Student')}</td>
                    <td style="padding: 10px 8px; color: #6B7280; font-size: 12px;">${new Date(sig.timestamp).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `}
        </div>

        <!-- Document Footer Stamp -->
        <div style="margin-top: 40px; border-top: 1px dashed #C5B396; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #8A7352;">
          <span>Backbench Campus Petitions Charter</span>
          <span>Verified Digital Imprint Seal</span>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = frameHTML;

  // Button Listeners
  const copyBtn = document.getElementById('copy-petition-frame-link-btn');
  const signBtn = document.getElementById('frame-sign-btn');
  const countDisplay = document.getElementById('frame-count-display');
  const progressFill = document.getElementById('frame-progress-fill');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(frameLink).then(() => {
        copyBtn.textContent = '✓ Frame Link Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px;">content_copy</span> Copy Frame Link';
        }, 2000);
      });
    });
  }

  if (signBtn) {
    signBtn.addEventListener('click', async () => {
      signBtn.disabled = true;
      signBtn.textContent = 'Recording Signature...';

      try {
        const res = await signPetition(petition.petitionId);
        signBtn.textContent = '✓ Official Signature Recorded';

        if (countDisplay) countDisplay.textContent = res.signatureCount;
        if (progressFill) {
          const newPct = Math.min(100, Math.round((res.signatureCount / goalTarget) * 100));
          progressFill.style.width = `${newPct}%`;
        }

        setTimeout(() => renderPetitionFrame(container), 800);
      } catch (err) {
        alert(err.message || 'Failed to record signature.');
        signBtn.disabled = false;
        signBtn.textContent = '✍️ Sign This Official Petition Paper';
      }
    });
  }
}

function renderFrameNotFound(container, message) {
  container.innerHTML = `
    <div style="min-height: 100vh; background: #0a0c10; color: #f7f9f9; padding: 60px 20px; text-align: center; font-family: var(--font-family);">
      <span class="material-symbols-outlined" style="font-size: 64px; color: var(--error-color); margin-bottom: 16px;">gavel</span>
      <h1 style="font-size: 24px; font-weight: 800;">Petition Frame Not Found</h1>
      <p style="color: var(--text-secondary); margin-top: 8px;">${message}</p>
      <a href="${ROUTES.PETITIONS}" class="btn" style="display: inline-block; margin-top: 24px;">Return to Petitions</a>
    </div>
  `;
}
