import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { createPetition, subscribeToPetitions, hasUserSignedPetition, signPetition, deleteOwnPetition } from '../services/petitionService.js';
import { getUserProfile } from '../services/postService.js';
import { deletePetitionAsStaff } from '../services/adminService.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { showContextMenu } from '../components/ContextMenu.js';
import { createPetitionCardHTML } from '../components/PetitionCard.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

let petitionsUnsubscribe = null;

export function renderPetitions(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Campus Petitions</h1>
    </header>

    <!-- Create Petition Builder Card -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div class="card" style="padding: 20px;">
        <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">campaign</span>
          Launch a Student Campus Petition
        </h3>

        <form id="create-petition-form" style="display: flex; flex-direction: column;">
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Petition Title</label>
          <input type="text" id="petition-title" class="input-field" placeholder="e.g. Petition to Extend SJC Library Hours during Exam Week" required />

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Category</label>
              <select id="petition-category" class="input-field" style="background: var(--bg-primary);">
                <option value="Student Welfare">Student Welfare</option>
                <option value="Academics">Academics</option>
                <option value="Library">Library & Study</option>
                <option value="Canteen">Canteen & Dining</option>
                <option value="Sports">Sports & Clubs</option>
                <option value="Infrastructure">Campus Infrastructure</option>
              </select>
            </div>

            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Goal Signatures</label>
              <select id="petition-goal" class="input-field" style="background: var(--bg-primary);">
                <option value="50">50 Signatures</option>
                <option value="100" selected>100 Signatures</option>
                <option value="250">250 Signatures</option>
                <option value="500">500 Signatures</option>
              </select>
            </div>
          </div>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Target Recipient</label>
          <input type="text" id="petition-recipient" class="input-field" value="St. Joseph's College Administration" placeholder="Target Authority (e.g. SJC Principal & Dean)" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Formal Petition Statement & Demand</label>
          <textarea id="petition-statement" class="input-field" rows="4" style="resize: none;" placeholder="We, the undersigned students of St. Joseph's College, respectfully petition the administration to..." required></textarea>

          <div id="petition-error" class="error-text" style="display: none; margin-bottom: 8px;"></div>

          <div style="display: flex; justify-content: flex-end;">
            <button type="submit" id="submit-petition-btn" class="btn" style="font-weight: 700;">
              Launch Petition
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Active Petitions Feed -->
    <div id="petitions-feed-container" style="padding: 16px;">
      ${renderFeedSkeletons(3)}
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.PETITIONS);
  attachLayoutListeners();

  const form = document.getElementById('create-petition-form');
  const errorDiv = document.getElementById('petition-error');
  const submitBtn = document.getElementById('submit-petition-btn');
  const feedContainer = document.getElementById('petitions-feed-container');

  // Submit Petition Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const title = document.getElementById('petition-title').value.trim();
    const category = document.getElementById('petition-category').value;
    const goalSignatures = document.getElementById('petition-goal').value;
    const targetRecipient = document.getElementById('petition-recipient').value.trim();
    const statement = document.getElementById('petition-statement').value.trim();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Publishing...';

    try {
      await createPetition({
        title, category, goalSignatures, targetRecipient, statement
      });

      form.reset();
      document.getElementById('petition-recipient').value = "St. Joseph's College Administration";
    } catch (err) {
      errorDiv.textContent = err.message || 'Failed to create petition.';
      errorDiv.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Launch Petition';
    }
  });

  // Subscribe to Realtime Petitions Feed
  if (petitionsUnsubscribe) petitionsUnsubscribe();

  petitionsUnsubscribe = subscribeToPetitions(20, async (petitions) => {
    if (petitions.length === 0) {
      feedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">campaign</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">No active petitions</h3>
          <p style="font-size: 14px;">Launch the first campus petition above to champion student causes!</p>
        </div>
      `;
      return;
    }

    const currentUid = auth.currentUser.uid;
    let html = '';

    for (const petition of petitions) {
      const author = await getUserProfile(petition.creatorId);
      const isSigned = await hasUserSignedPetition(petition.petitionId, currentUid);

      html += createPetitionCardHTML(petition, author, isSigned);
    }

    feedContainer.innerHTML = html;

    // Attach card click handlers (navigates to petition imprint document)
    feedContainer.querySelectorAll('.petition-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.sign-petition-feed-btn') && !e.target.closest('.view-imprint-btn') && !e.target.closest('.copy-petition-frame-btn') && !e.target.closest('a')) {
          const petitionId = card.dataset.petitionId;
          window.location.hash = `#/petition-frame?id=${petitionId}`;
        }
      });
    });

    // Attach Copy Frame Link button handlers
    feedContainer.querySelectorAll('.copy-petition-frame-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const petitionId = btn.dataset.petitionId;
        const frameLink = `${window.location.origin}${window.location.pathname}#/petition-frame?id=${petitionId}`;
        navigator.clipboard.writeText(frameLink).then(() => {
          const origText = btn.innerHTML;
          btn.textContent = '✓ Copied!';
          setTimeout(() => {
            btn.innerHTML = origText;
          }, 2000);
        });
      });
    });

    // Attach inline Sign button handlers
    feedContainer.querySelectorAll('.sign-petition-feed-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const petitionId = btn.dataset.petitionId;
        btn.disabled = true;
        btn.textContent = 'Signing...';

        try {
          await signPetition(petitionId);
          btn.textContent = '✓ Signed';
        } catch (err) {
          alert(err.message || 'Failed to sign petition.');
          btn.disabled = false;
          btn.textContent = '✍️ Sign';
        }
      });
    });

    // Attach Petition Options Context Menu
    feedContainer.querySelectorAll('.petition-options-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const petitionId = btn.dataset.petitionId;
        const authorId = btn.dataset.authorId;
        const userProfile = await getUserProfile(currentUid);
        const isStaff = userProfile?.role === 'staff' || userProfile?.role === 'admin';

        showContextMenu(btn, {
          itemId: petitionId,
          authorId: authorId,
          currentUid: currentUid,
          isStaff: isStaff,
          itemType: 'petition',
          onDelete: async (id) => {
            try {
              if (currentUid === authorId) {
                await deleteOwnPetition(id);
              } else if (isStaff) {
                await deletePetitionAsStaff(id);
              }
              const card = btn.closest('.petition-card');
              if (card) {
                card.style.opacity = '0.3';
                card.style.pointerEvents = 'none';
              }
            } catch (err) {
              alert(err.message || 'Failed to delete petition.');
            }
          },
          onReport: async (id, reason) => {
            try {
              alert('Thank you for reporting. Your report has been submitted to SJC Moderation.');
            } catch (err) {
              alert(err.message || 'Failed to submit report.');
            }
          }
        });
      });
    });
  });
}
