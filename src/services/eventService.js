import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, remove, onValue, off, runTransaction, query, orderByChild, limitToLast } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';
import { getUserProfile } from './postService.js';

export async function createEvent(eventData) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const { title, description, category, date, time, location, capacity } = eventData;

  if (!title || title.trim().length === 0) {
    throw new Error('Event title is required.');
  }

  if (!date || !time || !location) {
    throw new Error('Event date, time, and venue location are required.');
  }

  const eventRef = push(ref(db, PATHS.EVENTS));
  const newEvent = {
    eventId: eventRef.key,
    creatorId: user.uid,
    title: title.trim(),
    description: description?.trim() || '',
    category: category || 'General',
    date: date,
    time: time,
    location: location.trim(),
    capacity: parseInt(capacity) || 100,
    attendeeCount: 0,
    timestamp: new Date().toISOString(),
    status: 'UPCOMING'
  };

  await set(eventRef, newEvent);
  return newEvent;
}

export function subscribeToEvents(limitCount = 20, callback) {
  const eventsQuery = query(ref(db, PATHS.EVENTS), orderByChild('timestamp'), limitToLast(limitCount));

  const listener = onValue(eventsQuery, (snapshot) => {
    const events = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnap) => {
        const item = childSnap.val();
        if (item) events.push(item);
      });
    }
    events.sort((a, b) => new Date((a.date || '') + ' ' + (a.time || '')) - new Date((b.date || '') + ' ' + (b.time || '')));
    callback(events);
  });

  return () => off(eventsQuery, 'value', listener);
}

export async function getEventById(eventId) {
  if (!eventId) return null;
  try {
    const snap = await get(ref(db, `${PATHS.EVENTS}/${eventId}`));
    if (snap.exists()) {
      return snap.val();
    }
  } catch (err) {
    console.error('Error fetching event:', err);
  }
  return null;
}

export async function getUserRSVP(eventId, uid) {
  if (!uid || !eventId) return null;
  try {
    const snap = await get(ref(db, `eventRSVPs/${eventId}/${uid}`));
    if (snap.exists()) {
      return snap.val().status; // 'attending' | 'interested'
    }
  } catch (err) {
    console.error('Error checking RSVP status:', err);
  }
  return null;
}

export async function toggleRSVP(eventId, targetStatus = 'attending') {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const rsvpRef = ref(db, `eventRSVPs/${eventId}/${user.uid}`);
  const snap = await get(rsvpRef);
  const userProfile = await getUserProfile(user.uid);

  let isNewRSVP = false;
  let isRemovingRSVP = false;

  if (snap.exists()) {
    const currentStatus = snap.val().status;
    if (currentStatus === targetStatus) {
      // Toggle off RSVP
      await remove(rsvpRef);
      isRemovingRSVP = true;
    } else {
      // Switch status
      await set(rsvpRef, {
        uid: user.uid,
        status: targetStatus,
        name: userProfile?.name || user.displayName || 'Student',
        class: userProfile?.class || 'N/A',
        timestamp: new Date().toISOString()
      });
    }
  } else {
    // New RSVP
    await set(rsvpRef, {
      uid: user.uid,
      status: targetStatus,
      name: userProfile?.name || user.displayName || 'Student',
      class: userProfile?.class || 'N/A',
      timestamp: new Date().toISOString()
    });
    isNewRSVP = true;
  }

  // Update attendee count atomically if attending status changed
  const eventRef = ref(db, `${PATHS.EVENTS}/${eventId}`);
  let updatedCount = 0;

  await runTransaction(eventRef, (event) => {
    if (event) {
      if (isNewRSVP && targetStatus === 'attending') {
        event.attendeeCount = (event.attendeeCount || 0) + 1;
      } else if (isRemovingRSVP) {
        event.attendeeCount = Math.max(0, (event.attendeeCount || 0) - 1);
      }
      updatedCount = event.attendeeCount;
    }
    return event;
  });

  return { status: isRemovingRSVP ? null : targetStatus, attendeeCount: updatedCount };
}

export async function getEventAttendees(eventId) {
  if (!eventId) return [];
  try {
    const snap = await get(ref(db, `eventRSVPs/${eventId}`));
    if (snap.exists()) {
      const data = snap.val();
      return Object.values(data);
    }
  } catch (err) {
    console.error('Error fetching event attendees:', err);
  }
  return [];
}
