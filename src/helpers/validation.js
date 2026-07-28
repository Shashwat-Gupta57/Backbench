import { LIMITS } from '../constants/limits.js';

export function validateUsername(username) {
  // Allows letters, numbers, underscores, and dots (3-20 chars)
  const regex = /^[a-zA-Z0-9_.]{3,20}$/;
  return regex.test(username);
}

export function validatePostContent(content) {
  if (!content || content.trim().length === 0) return false;
  if (content.split(/\\s+/).length > LIMITS.POST_MAX_WORDS) return false;
  return true;
}

export function validateReplyContent(content) {
  if (!content || content.trim().length === 0) return false;
  if (content.split(/\\s+/).length > LIMITS.REPLY_MAX_WORDS) return false;
  return true;
}
