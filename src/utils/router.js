import { ROUTES } from '../constants/routes.js';
import { renderHome } from '../home/home.js';
import { renderAuth } from '../auth/auth.js';
import { renderProfile } from '../profiles/profiles.js';
import { renderPostDetail } from '../posts/postDetail.js';
import { renderSearch } from '../search/search.js';
import { renderPetitions } from '../petitions/petitions.js';
import { renderPolls } from '../polls/polls.js';
import { renderAnnouncements } from '../announcements/announcements.js';
import { renderEvents } from '../events/events.js';
import { renderAdmin } from '../admin/admin.js';
import { renderSettings } from '../settings/settings.js';

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

function handleRoute() {
  const hash = window.location.hash;
  const path = hash.split('?')[0]; // simple path parsing
  
  if (rootElement) {
    rootElement.innerHTML = '';
  }
  
  switch(path) {
    case '#/login':
    case '#/signup':
      renderAuth(rootElement, path);
      break;
    case ROUTES.HOME:
      renderHome(rootElement);
      break;
    case ROUTES.PROFILE:
      renderProfile(rootElement);
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
    case ROUTES.POLLS:
      renderPolls(rootElement);
      break;
    case ROUTES.ANNOUNCEMENTS:
      renderAnnouncements(rootElement);
      break;
    case ROUTES.EVENTS:
      renderEvents(rootElement);
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
