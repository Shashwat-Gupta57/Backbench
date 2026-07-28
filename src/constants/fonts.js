export const PRESET_USER_FONTS = [
  { id: 'default', name: 'Inter Modern', fontFamily: "'Inter', sans-serif" },
  { id: 'handwritten', name: 'Handwritten Script', fontFamily: "'Caveat', cursive, sans-serif" },
  { id: 'monospace', name: 'Cyber Monospace', fontFamily: "'Fira Code', monospace" },
  { id: 'serif', name: 'Classic Serif', fontFamily: "'Playfair Display', serif" },
  { id: 'futuristic', name: 'Futuristic Outfit', fontFamily: "'Outfit', sans-serif" }
];

export function getUserFontFamily(userOrFontId) {
  let fontId = 'default';
  if (typeof userOrFontId === 'string') {
    fontId = userOrFontId;
  } else if (userOrFontId && userOrFontId.fontId) {
    fontId = userOrFontId.fontId;
  } else if (userOrFontId && userOrFontId.fontThemeId) {
    fontId = userOrFontId.fontThemeId;
  }
  const found = PRESET_USER_FONTS.find(f => f.id === fontId);
  return found ? found.fontFamily : PRESET_USER_FONTS[0].fontFamily;
}
