// Modern Twitter-style neutral default user avatar (dark theme)
export const DEFAULT_AVATAR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none"><circle cx="64" cy="64" r="64" fill="%23202327"/><path d="M64 28a20 20 0 1 0 0 40 20 20 0 0 0 0-40zM32 100c0-17.673 14.327-32 32-32s32 14.327 32 32v4H32v-4z" fill="%2371767B"/></svg>`;

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
      onerror="this.onerror=null; this.src='${DEFAULT_AVATAR_SVG}';" 
      style="width: ${size}px; height: ${size}px; border-radius: 50% !important; object-fit: cover; aspect-ratio: 1 / 1; flex-shrink: 0; background: var(--bg-tertiary); ${extraStyles}" 
      alt="User Avatar" 
    />
  `;
}
