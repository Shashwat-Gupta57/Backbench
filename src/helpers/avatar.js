export const DEFAULT_AVATAR_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Ccircle cx='64' cy='64' r='64' fill='%23202327'/%3E%3Cpath d='M64 28a20 20 0 1 0 0 40 20 20 0 0 0 0-40zM32 100c0-17.673 14.327-32 32-32s32 14.327 32 32v4H32v-4z' fill='%2371767B'/%3E%3C/svg%3E`;

// Global error handler to handle HTTP 429 / broken image URLs safely without breaking HTML attribute quotes
if (typeof window !== 'undefined') {
  window.handleAvatarError = function(img) {
    if (img && img.src !== DEFAULT_AVATAR_SVG) {
      img.onerror = null;
      img.src = DEFAULT_AVATAR_SVG;
    }
  };
}

export function renderUserAvatar(userOrPfp, size = 44, extraStyles = '') {
  let pfpUrl = null;

  if (typeof userOrPfp === 'string') {
    pfpUrl = userOrPfp;
  } else if (userOrPfp && userOrPfp.profilePicture) {
    pfpUrl = userOrPfp.profilePicture;
  }

  const finalSrc = pfpUrl || DEFAULT_AVATAR_SVG;

  return `
    <img 
      src="${finalSrc}" 
      onerror="window.handleAvatarError(this)" 
      style="width: ${size}px; height: ${size}px; border-radius: 50% !important; object-fit: cover !important; aspect-ratio: 1 / 1 !important; flex-shrink: 0 !important; background: var(--bg-tertiary); ${extraStyles}" 
      alt="User Avatar" 
    />
  `;
}
