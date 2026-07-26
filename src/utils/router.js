import { ROUTES } from '../constants/routes.js';
import { renderHome } from '../home/home.js';
import { renderAuth } from '../auth/auth.js';
import { renderProfile } from '../profiles/profiles.js';
import { renderFriends } from '../friends/friends.js';
import { renderNotifications } from '../notifications/notifications.js';
import { renderPostDetail } from '../posts/postDetail.js';
import { renderSearch } from '../search/search.js';
import { renderOnboarding } from '../auth/onboarding.js';
import { renderPetitions } from '../petitions/petitions.js';
import { renderPetitionDetail } from '../petitions/petitionDetail.js';
import { renderPetitionFrame } from '../petitions/petitionFrame.js';
import { renderProfileFrame } from '../profiles/profileFrame.js';
import { renderPolls } from '../polls/polls.js';
import { renderPollDetail } from '../polls/pollDetail.js';
import { renderAnnouncements } from '../announcements/announcements.js';
import { renderEvents } from '../events/events.js';
import { renderEventDetail } from '../events/eventDetail.js';
import { renderAdmin } from '../admin/admin.js';
import { renderSettings } from '../settings/settings.js';
import { auth } from '../firebase/firebase.js';
import { getUserProfile } from '../services/postService.js';
import { isProfileComplete } from '../services/authService.js';

let currentView = null;
let rootElement = null;

export function initRouter(appElement) {
  rootElement = appElement;
  
  window.addEventListener('hashchange', handleRoute);
  
  // Handle initial route
  if (!window.location.hash) {
    window.location.hash = ROUTES.HOME;
  } else {
    handleRoute();
  }
}

async function handleRoute() {
  const hash = window.location.hash;
  const path = hash.split('?')[0]; // simple path parsing
  
  if (rootElement) {
    rootElement.innerHTML = '';
  }

  // Check if authenticated user needs to complete profile details
  if (auth.currentUser && path !== '#/login' && path !== '#/signup' && path !== ROUTES.ONBOARDING) {
    const profile = await getUserProfile(auth.currentUser.uid);
    if (!isProfileComplete(profile)) {
      window.location.hash = ROUTES.ONBOARDING;
      renderOnboarding(rootElement);
      return;
    }
  }
  
  switch(path) {
    case '#/login':
    case '#/signup':
      renderAuth(rootElement, path);
      break;
    case ROUTES.ONBOARDING:
      renderOnboarding(rootElement);
      break;
    case ROUTES.HOME:
      renderHome(rootElement);
      break;
    case ROUTES.PROFILE:
      renderProfile(rootElement);
      break;
    case '#/notifications':
      renderNotifications(rootElement);
      break;
    case '#/friends':
      renderFriends(rootElement);
      break;
    case ROUTES.POST_DETAIL:
      renderPostDetail(rootElement);
      break;
    case '#/search':
      renderSearch(rootElement);
      break;
    case ROUTES.PETITIONS:
      renderPetitions(rootElement);
      break;
    case '#/petition':
      renderPetitionDetail(rootElement);
      break;
    case ROUTES.PETITION_FRAME:
      renderPetitionFrame(rootElement);
      break;
    case ROUTES.PROFILE_FRAME:
      renderProfileFrame(rootElement);
      break;
    case ROUTES.POLLS:
      renderPolls(rootElement);
      break;
    case '#/poll':
      renderPollDetail(rootElement);
      break;
    case ROUTES.ANNOUNCEMENTS:
      renderAnnouncements(rootElement);
      break;
    case ROUTES.EVENTS:
      renderEvents(rootElement);
      break;
    case '#/event':
      renderEventDetail(rootElement);
      break;
    case ROUTES.ADMIN:
      renderAdmin(rootElement);
      break;
    case ROUTES.SETTINGS:
      renderSettings(rootElement);
      break;
    default:
      rootElement.innerHTML = '<div style="padding: 40px; text-align: center;"><h1>404 Page Not Found</h1></div>';
      break;
  }
}
