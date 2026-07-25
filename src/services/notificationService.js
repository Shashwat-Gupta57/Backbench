import { db, auth } from '../firebase/firebase.js';
import { ref, push, set, get, remove, update, onValue, off } from 'firebase/database';
import { PATHS } from '../constants/firebasePaths.js';

export async function sendNotification(targetUid, notificationData) {
  if (!targetUid) return;

  const notifRef = push(ref(db, `notifications/${targetUid}`));
  const newNotif = {
    notificationId: notifRef.key,
    text: notificationData.text,
    type: notificationData.type || 'SYSTEM', // 'SYSTEM' | 'REPORT' | 'MODERATION'
    postId: notificationData.postId || null,
    read: false,
    timestamp: new Date().toISOString()
  };

  await set(notifRef, newNotif);
  return newNotif;
}

export function subscribeToUserNotifications(uid, callback) {
  if (!uid) {
    callback([]);
    return () => {};
  }

  const notifRef = ref(db, `notifications/${uid}`);

  const listener = onValue(notifRef, (snapshot) => {
    const list = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnap) => {
        const item = childSnap.val();
        if (item) list.push(item);
      });
    }
    list.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
    callback(list);
  }, (err) => {
    console.error('Error fetching notifications:', err);
    callback([]);
  });

  return () => off(notifRef, 'value', listener);
}

export async function markNotificationAsRead(uid, notificationId) {
  if (!uid || !notificationId) return;
  await update(ref(db, `notifications/${uid}/${notificationId}`), { read: true });
}

export async function markAllNotificationsAsRead(uid) {
  if (!uid) return;
  const snap = await get(ref(db, `notifications/${uid}`));
  if (snap.exists()) {
    const updates = {};
    snap.forEach(child => {
      updates[`notifications/${uid}/${child.key}/read`] = true;
    });
    await update(ref(db), updates);
  }
}

export async function clearReadNotifications(uid) {
  if (!uid) return;
  const snap = await get(ref(db, `notifications/${uid}`));
  if (snap.exists()) {
    snap.forEach(child => {
      if (child.val().read) {
        remove(ref(db, `notifications/${uid}/${child.key}`));
      }
    });
  }
}
