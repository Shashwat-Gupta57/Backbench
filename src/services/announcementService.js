import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, query, update, onValue, off } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';

export async function createAnnouncement(data) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const { title, content, severity } = data;

  if (!title || title.trim().length === 0) {
    throw new Error('Announcement title is required.');
  }

  if (!content || content.trim().length === 0) {
    throw new Error('Announcement content is required.');
  }

  const announcementRef = push(ref(db, PATHS.ANNOUNCEMENTS));
  const announcementData = {
    id: announcementRef.key,
    authorId: user.uid,
    title: title.trim(),
    content: content.trim(),
    severity: severity || 'info', // info, warning, alert
    timestamp: new Date().toISOString()
  };

  await set(announcementRef, announcementData);
  return announcementData;
}

export async function editAnnouncement(id, newTitle, newContent, newSeverity) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const title = newTitle ? newTitle.trim() : '';
  const content = newContent ? newContent.trim() : '';

  if (!title || !content) {
    throw new Error('Title and content are required.');
  }

  const announcementSnap = await get(ref(db, `${PATHS.ANNOUNCEMENTS}/${id}`));
  if (!announcementSnap.exists()) throw new Error('Announcement not found');

  const announcement = announcementSnap.val();
  if (announcement.authorId !== user.uid) {
    throw new Error('Unauthorized: You can only edit your own announcements.');
  }

  await update(ref(db, `${PATHS.ANNOUNCEMENTS}/${id}`), {
    title,
    content,
    severity: newSeverity || 'info',
    edited: true,
    updatedAt: new Date().toISOString()
  });

  return true;
}

export function subscribeToAnnouncements(limitCount = 20, callback) {
  const announcementsRef = ref(db, PATHS.ANNOUNCEMENTS);

  const listener = onValue(announcementsRef, (snapshot) => {
    const announcements = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnap) => {
        const item = childSnap.val();
        if (item) announcements.push(item);
      });
    }
    announcements.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
    callback(announcements.slice(0, limitCount));
  }, (error) => {
    console.error('Error fetching announcements:', error);
  });

  return () => off(announcementsRef, 'value', listener);
}

export async function deleteAnnouncementAsStaff(id) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const announcementRef = ref(db, `${PATHS.ANNOUNCEMENTS}/${id}`);
  await set(announcementRef, null);
}
