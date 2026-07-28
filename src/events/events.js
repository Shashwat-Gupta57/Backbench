import { createLayout, attachLayoutListeners } from '../components/layout.js';
import { createEvent, subscribeToEvents, getUserRSVP, toggleRSVP } from '../services/eventService.js';
import { getUserProfile } from '../services/postService.js';
import { renderFeedSkeletons } from '../components/Skeleton.js';
import { renderUserAvatar } from '../helpers/avatar.js';
import { escapeHTML } from '../helpers/formatters.js';
import { ROUTES } from '../constants/routes.js';
import { auth } from '../firebase/firebase.js';

let eventsUnsubscribe = null;

export function renderEvents(container) {
  if (!auth.currentUser) {
    window.location.hash = '#/login';
    return;
  }

  const content = `
    <!-- Header -->
    <header class="sticky-header">
      <h1 class="header-title">Campus Events</h1>
    </header>

    <!-- Create Event Builder Card -->
    <div style="padding: 16px; border-bottom: 1px solid var(--border-color);" class="fade-in">
      <div class="card" style="padding: 20px;">
        <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="color: var(--accent-primary);">event</span>
          Host a Campus Event
        </h3>

        <form id="create-event-form" style="display: flex; flex-direction: column;">
          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Event Title</label>
          <input type="text" id="event-title" class="input-field" placeholder="e.g. SJC Inter-Class Hackathon 2026" required />

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Category</label>
              <select id="event-category" class="input-field" style="background: var(--bg-primary);">
                <option value="Tech & Coding">Tech & Coding</option>
                <option value="Cultural Fest">Cultural Fest</option>
                <option value="Sports">Sports</option>
                <option value="Workshop & Seminar">Workshop & Seminar</option>
                <option value="Club Meeting">Club Meeting</option>
              </select>
            </div>

            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Capacity (Seats)</label>
              <select id="event-capacity" class="input-field" style="background: var(--bg-primary);">
                <option value="50">50 Seats</option>
                <option value="100" selected>100 Seats</option>
                <option value="250">250 Seats</option>
                <option value="500">500 Seats</option>
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Event Date</label>
              <input type="date" id="event-date" class="input-field" required />
            </div>

            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Time</label>
              <input type="time" id="event-time" class="input-field" required />
            </div>
          </div>

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Venue Location</label>
          <input type="text" id="event-location" class="input-field" placeholder="e.g. SJC Main Auditorium, Science Block" required />

          <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 4px;">Description & Agenda</label>
          <textarea id="event-description" class="input-field" rows="3" style="resize: none;" placeholder="Details about this campus event..."></textarea>

          <div id="event-error" class="error-text" style="display: none; margin-bottom: 8px;"></div>

          <div style="display: flex; justify-content: flex-end;">
            <button type="submit" id="submit-event-btn" class="btn" style="font-weight: 700;">
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Feed Tabs -->
    <div class="header-tabs">
      <button class="tab-button active" id="tab-all-events">Upcoming Events</button>
      <button class="tab-button" id="tab-my-events">My RSVP Passes</button>
    </div>

    <!-- Active Events Feed -->
    <div id="events-feed-container" style="padding: 16px;">
      ${renderFeedSkeletons(3)}
    </div>
  `;

  container.innerHTML = createLayout(content, ROUTES.EVENTS);
  const layoutCleanup = attachLayoutListeners();

  const form = document.getElementById('create-event-form');
  const errorDiv = document.getElementById('event-error');
  const submitBtn = document.getElementById('submit-event-btn');
  const feedContainer = document.getElementById('events-feed-container');
  const tabAll = document.getElementById('tab-all-events');
  const tabMy = document.getElementById('tab-my-events');

  let activeTabMode = 'all'; // 'all' | 'my'
  let latestEvents = [];

  tabAll.addEventListener('click', () => {
    activeTabMode = 'all';
    tabAll.classList.add('active');
    tabMy.classList.remove('active');
    renderEventsList();
  });

  tabMy.addEventListener('click', () => {
    activeTabMode = 'my';
    tabMy.classList.add('active');
    tabAll.classList.remove('active');
    renderEventsList();
  });

  // Default date to today
  const dateInput = document.getElementById('event-date');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  // Form Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const title = document.getElementById('event-title').value.trim();
    const category = document.getElementById('event-category').value;
    const capacity = document.getElementById('event-capacity').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const location = document.getElementById('event-location').value.trim();
    const description = document.getElementById('event-description').value.trim();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Publishing...';

    try {
      await createEvent({
        title, category, capacity, date, time, location, description
      });

      form.reset();
      dateInput.value = new Date().toISOString().split('T')[0];
    } catch (err) {
      errorDiv.textContent = err.message || 'Failed to create event.';
      errorDiv.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Publish Event';
    }
  });

  const renderEventsList = async () => {
    if (!feedContainer) return;
    const currentUid = auth.currentUser.uid;

    let filteredEvents = latestEvents;
    if (activeTabMode === 'my') {
      const myEvents = [];
      for (const ev of latestEvents) {
        const status = await getUserRSVP(ev.eventId, currentUid);
        if (status === 'attending' || status === 'interested') {
          myEvents.push(ev);
        }
      }
      filteredEvents = myEvents;
    }

    if (filteredEvents.length === 0) {
      feedContainer.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-secondary);" class="fade-in">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 12px; color: var(--text-muted);">${activeTabMode === 'my' ? 'confirmation_number' : 'event'}</span>
          <h3 style="font-size: 18px; color: var(--text-primary); font-weight: 700; margin-bottom: 4px;">${activeTabMode === 'my' ? 'No registered event passes' : 'No upcoming campus events'}</h3>
          <p style="font-size: 14px;">${activeTabMode === 'my' ? 'RSVP to an upcoming event to save your ticket pass here!' : 'Be the first student to publish an event above!'}</p>
        </div>
      `;
      return;
    }

    let html = '';
    for (const ev of filteredEvents) {
      const host = await getUserProfile(ev.creatorId);
      const userRSVPStatus = await getUserRSVP(ev.eventId, currentUid);
      const hostName = host?.name ? escapeHTML(host.name) : 'SJC Host';

      const count = ev.attendeeCount || 0;
      const capacity = ev.capacity || 100;
      const pct = Math.min(100, Math.round((count / capacity) * 100));

      html += `
        <article class="card fade-in event-card" data-event-id="${ev.eventId}" style="margin-bottom: 16px; border-radius: var(--border-radius); cursor: pointer; padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <span class="brand-badge" style="font-size: 11px;">${escapeHTML(ev.category)}</span>
            <span style="font-size: 12px; font-weight: 700; color: var(--accent-primary);">Hosted by ${hostName}</span>
          </div>

          <h2 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; line-height: 1.3;">
            ${escapeHTML(ev.title)}
          </h2>

          <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">calendar_month</span>
              <span>${escapeHTML(ev.date)} · ${escapeHTML(ev.time)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--accent-primary);">location_on</span>
              <span>${escapeHTML(ev.location)}</span>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div style="background: var(--bg-primary); border-radius: 10px; padding: 8px 12px; border: 1px solid var(--border-color); margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span><strong style="color: var(--accent-primary);">${count}</strong> / ${capacity} seats reserved</span>
              <span style="font-weight: 700; color: var(--text-primary);">${pct}%</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--bg-tertiary); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #1D9BF0, #00BA7C);"></div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <a href="#/event?id=${ev.eventId}" class="btn btn-outline view-pass-btn" style="font-size: 12px; padding: 6px 14px;">
              🎟️ Entry Ticket Pass
            </a>

            <button class="btn ${userRSVPStatus === 'attending' ? '' : 'btn-outline'} event-rsvp-btn" data-event-id="${ev.eventId}" style="font-size: 12px; padding: 6px 14px;">
              ${userRSVPStatus === 'attending' ? '✓ Going' : '🎟️ RSVP Going'}
            </button>
          </div>
        </article>
      `;
    }

    feedContainer.innerHTML = html;

    // Card click handler -> opens Event Ticket Pass Detail Page
    feedContainer.querySelectorAll('.event-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.event-rsvp-btn') && !e.target.closest('.view-pass-btn')) {
          const eventId = card.dataset.eventId;
          window.location.hash = `#/event?id=${eventId}`;
        }
      });
    });

    // RSVP Toggle Handler
    feedContainer.querySelectorAll('.event-rsvp-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const eventId = btn.dataset.eventId;
        btn.disabled = true;

        try {
          const res = await toggleRSVP(eventId, 'attending');
          btn.textContent = res.status === 'attending' ? '✓ Going' : '🎟️ RSVP Going';
          btn.className = `btn ${res.status === 'attending' ? '' : 'btn-outline'} event-rsvp-btn`;
        } catch (err) {
          alert(err.message || 'Failed to update RSVP');
        } finally {
          btn.disabled = false;
        }
      });
    });
  };

  // Subscribe to Realtime Events Feed
  if (eventsUnsubscribe) eventsUnsubscribe();

  eventsUnsubscribe = subscribeToEvents(50, (events) => {
    latestEvents = events;
    renderEventsList();
  });

  return () => {
    if (layoutCleanup) layoutCleanup();
    if (eventsUnsubscribe) { eventsUnsubscribe(); eventsUnsubscribe = null; }
  };
}
