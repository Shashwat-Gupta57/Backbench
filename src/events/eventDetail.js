import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { getEventById, getUserRSVP, toggleRSVP, getEventAttendees } from '../services/eventService.js';
import { getUserProfile } from '../services/postService.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

export async function renderEventDetail(container) {
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
        <h1 class="header-title">Event Ticket Pass</h1>
      </div>
    </header>
    ${renderFeedSkeletons(2)}
  `, ROUTES.EVENTS);

  const hash = window.location.hash;
  let eventId = null;

  if (hash.includes('?id=')) {
    eventId = hash.split('?id=')[1];
  }

  if (!eventId) {
    renderNotFound(container, 'No event specified.');
    return;
  }

  const event = await getEventById(eventId);
  if (!event) {
    renderNotFound(container, 'This campus event does not exist or has been cancelled.');
    return;
  }

  const host = await getUserProfile(event.creatorId);
  const currentUid = auth.currentUser.uid;
  const userRSVPStatus = await getUserRSVP(event.eventId, currentUid);
  const attendees = await getEventAttendees(event.eventId);

  const attendeeCount = event.attendeeCount || 0;
  const capacity = event.capacity || 100;
  const pct = Math.min(100, Math.round((attendeeCount / capacity) * 100));
  const isFull = attendeeCount >= capacity;

  const hostName = host?.name ? escapeHTML(host.name) : 'SJC Event Host';
  const hostUsername = host?.username ? escapeHTML(host.username) : 'student';

  const content = `
    <!-- Header -->
    <header class="sticky-header print-hide">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <button class="btn-ghost" onclick="window.history.back()" title="Back">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 class="header-title">Digital Entry Pass</h1>
        </div>

        <button id="print-pass-btn" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px; display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">print</span>
          Print Entry Pass
        </button>
      </div>
    </header>

    <div style="padding: 20px;" class="fade-in">
      <!-- Digital Ticket Entry Pass Container -->
      <div class="card" style="border-radius: 24px; padding: 0; overflow: hidden; border: 2px solid var(--border-color); box-shadow: 0 12px 32px rgba(0,0,0,0.4); margin-bottom: 24px;">
        
        <!-- Ticket Header Banner -->
        <div style="background: linear-gradient(135deg, #1D9BF0, #004477); padding: 24px; color: #fff; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span class="brand-badge" style="background: rgba(255,255,255,0.2); color: #fff; border: none; font-size: 12px;">
              ${escapeHTML(event.category)}
            </span>
            <span style="font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; background: rgba(0,0,0,0.3); padding: 4px 10px; border-radius: 9999px;">
              ST. JOSEPH'S COLLEGE OFFICIAL PASS
            </span>
          </div>

          <h1 style="font-size: 24px; font-weight: 800; line-height: 1.3; margin-bottom: 8px;">
            ${escapeHTML(event.title)}
          </h1>

          <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; opacity: 0.9;">
            <span class="material-symbols-outlined" style="font-size: 18px;">person</span>
            <span>Hosted by <strong>${hostName}</strong> (@${hostUsername})</span>
          </div>
        </div>

        <!-- Ticket Body Details -->
        <div style="padding: 24px; background: var(--bg-secondary);">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">calendar_month</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Date</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${escapeHTML(event.date)}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">schedule</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Time</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${escapeHTML(event.time)}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px; grid-column: span 2;">
              <span class="material-symbols-outlined" style="font-size: 24px; color: var(--accent-primary);">location_on</span>
              <div>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Venue Location</span>
                <div style="font-weight: 700; font-size: 15px; color: var(--text-primary);">${escapeHTML(event.location)}</div>
              </div>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
              <span style="font-weight: 700; color: var(--text-primary);">
                <strong style="color: var(--accent-primary); font-size: 16px;">${attendeeCount}</strong> / ${capacity} seats reserved
              </span>
              <span style="font-weight: 700; color: ${isFull ? 'var(--error-color)' : 'var(--accent-primary)'};">${isFull ? 'FULL' : `${pct}% Filled`}</span>
            </div>
            <div style="width: 100%; height: 8px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C);"></div>
            </div>
          </div>

          <!-- RSVP Control Toolbar (Print Hidden) -->
          <div class="print-hide" style="display: flex; gap: 12px; margin-bottom: 20px;">
            <button id="rsvp-attending-btn" class="btn ${userRSVPStatus === 'attending' ? '' : 'btn-outline'}" style="flex: 1; padding: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span class="material-symbols-outlined">confirmation_number</span>
              <span>${userRSVPStatus === 'attending' ? '✓ Going (RSVP Registered)' : '🎟️ RSVP — Going'}</span>
            </button>
            
            <button id="rsvp-interested-btn" class="btn ${userRSVPStatus === 'interested' ? '' : 'btn-outline'}" style="padding: 12px 18px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined">star</span>
              <span>${userRSVPStatus === 'interested' ? '★ Interested' : 'Interested'}</span>
            </button>
          </div>

          <!-- Event Description & Agenda -->
          <div style="border-top: 1px dashed var(--border-color); padding-top: 18px;">
            <h3 style="font-size: 14px; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">About This Campus Event</h3>
            <p style="font-size: 15px; line-height: 1.5; color: var(--text-primary); white-space: pre-line;">
              ${escapeHTML(event.description || 'Join your fellow St. Joseph\'s College students for this campus event!')}
            </p>
          </div>

          <!-- Simulated Pass Barcode -->
          <div style="margin-top: 20px; border-top: 1px dashed var(--border-color); padding-top: 16px; text-align: center;">
            <div style="font-family: monospace; letter-spacing: 4px; font-size: 16px; font-weight: 800; color: var(--text-secondary);">
              ||||| | |||| ||| |||||| || |||||
            </div>
            <span style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; display: block;">PASS ID: SJC-EVT-${escapeHTML(event.eventId)}</span>
          </div>
        </div>
      </div>

      <!-- Attending Students Roster -->
      <div class="card" style="padding: 20px; border-radius: 20px;">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">group</span>
          Registered Attendees (${attendees.length})
        </h3>

        ${attendees.length === 0 ? `
          <p style="font-size: 14px; color: var(--text-secondary);">No students registered yet. Be the first to RSVP!</p>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px;">
            ${attendees.map(att => `
              <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--bg-primary); border-radius: 10px; border: 1px solid var(--border-color);">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--accent-primary);">check_circle</span>
                <div style="display: flex; flex-direction: column; min-width: 0;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(att.name)}</span>
                  <span style="font-size: 11px; color: var(--text-secondary);">Class ${escapeHTML(att.class || 'N/A')}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.EVENTS);
  attachLayoutListeners();

  const printBtn = document.getElementById('print-pass-btn');
  const attendingBtn = document.getElementById('rsvp-attending-btn');
  const interestedBtn = document.getElementById('rsvp-interested-btn');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (attendingBtn) {
    attendingBtn.addEventListener('click', async () => {
      attendingBtn.disabled = true;
      try {
        await toggleRSVP(event.eventId, 'attending');
        renderEventDetail(container);
      } catch (err) {
        alert(err.message || 'Failed to update RSVP');
      }
    });
  }

  if (interestedBtn) {
    interestedBtn.addEventListener('click', async () => {
      interestedBtn.disabled = true;
      try {
        await toggleRSVP(event.eventId, 'interested');
        renderEventDetail(container);
      } catch (err) {
        alert(err.message || 'Failed to update RSVP');
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
        <h1 class="header-title">Event</h1>
      </div>
    </header>
    <div style="padding: 60px 20px; text-align: center;" class="fade-in">
      <span class="material-symbols-outlined" style="font-size: 48px; color: var(--error-color); margin-bottom: 12px;">event_busy</span>
      <h2 style="font-size: 20px; font-weight: 800;">Event Unavailable</h2>
      <p style="color: var(--text-secondary); margin-top: 4px;">${message}</p>
    </div>
  `, ROUTES.EVENTS);
  attachLayoutListeners();
}
