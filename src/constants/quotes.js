export const PRESET_QUOTE_STYLES = [
  {
    id: 'sjc-blue',
    name: 'SJC Blue',
    bg: 'linear-gradient(135deg, rgba(29, 155, 240, 0.15) 0%, rgba(0, 68, 119, 0.3) 100%)',
    border: '1px solid rgba(29, 155, 240, 0.4)',
    accent: '#1D9BF0',
    shadow: '0 8px 24px rgba(29, 155, 240, 0.2)'
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    bg: 'linear-gradient(135deg, rgba(255, 0, 128, 0.15) 0%, rgba(121, 40, 202, 0.3) 100%)',
    border: '1px solid rgba(255, 0, 128, 0.4)',
    accent: '#FF0080',
    shadow: '0 8px 24px rgba(255, 0, 128, 0.2)'
  },
  {
    id: 'emerald-glow',
    name: 'Emerald Glow',
    bg: 'linear-gradient(135deg, rgba(0, 176, 155, 0.15) 0%, rgba(150, 201, 61, 0.3) 100%)',
    border: '1px solid rgba(0, 176, 155, 0.4)',
    accent: '#00BA7C',
    shadow: '0 8px 24px rgba(0, 186, 124, 0.2)'
  },
  {
    id: 'golden-sunset',
    name: 'Golden Sunset',
    bg: 'linear-gradient(135deg, rgba(242, 153, 74, 0.15) 0%, rgba(242, 201, 76, 0.3) 100%)',
    border: '1px solid rgba(242, 153, 74, 0.4)',
    accent: '#F2994A',
    shadow: '0 8px 24px rgba(242, 153, 74, 0.2)'
  },
  {
    id: 'crimson-fire',
    name: 'Crimson Fire',
    bg: 'linear-gradient(135deg, rgba(233, 64, 87, 0.15) 0%, rgba(242, 113, 33, 0.3) 100%)',
    border: '1px solid rgba(233, 64, 87, 0.4)',
    accent: '#E94057',
    shadow: '0 8px 24px rgba(233, 64, 87, 0.2)'
  },
  {
    id: 'glass-minimal',
    name: 'Glass Minimal',
    bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    accent: '#E7E9EA',
    shadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
  },
  {
    id: 'midnight-cyber',
    name: 'Midnight Cyber',
    bg: 'linear-gradient(135deg, rgba(74, 0, 224, 0.2) 0%, rgba(142, 45, 226, 0.35) 100%)',
    border: '1px solid rgba(142, 45, 226, 0.4)',
    accent: '#9B51E0',
    shadow: '0 8px 24px rgba(155, 81, 224, 0.25)'
  },
  {
    id: 'sakura-blossom',
    name: 'Sakura Blossom',
    bg: 'linear-gradient(135deg, rgba(244, 196, 243, 0.15) 0%, rgba(252, 103, 250, 0.25) 100%)',
    border: '1px solid rgba(252, 103, 250, 0.4)',
    accent: '#FC67FA',
    shadow: '0 8px 24px rgba(252, 103, 250, 0.2)'
  },
  {
    id: 'oceanic-breeze',
    name: 'Oceanic Breeze',
    bg: 'linear-gradient(135deg, rgba(17, 153, 142, 0.15) 0%, rgba(56, 239, 125, 0.25) 100%)',
    border: '1px solid rgba(56, 239, 125, 0.4)',
    accent: '#38EF7D',
    shadow: '0 8px 24px rgba(56, 239, 125, 0.2)'
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    bg: 'linear-gradient(135deg, rgba(255, 224, 0, 0.15) 0%, rgba(121, 159, 12, 0.25) 100%)',
    border: '1px solid rgba(255, 224, 0, 0.4)',
    accent: '#FFD700',
    shadow: '0 8px 24px rgba(255, 215, 0, 0.2)'
  },
  {
    id: 'amethyst-dreams',
    name: 'Amethyst Dreams',
    bg: 'linear-gradient(135deg, rgba(97, 67, 133, 0.2) 0%, rgba(81, 99, 149, 0.3) 100%)',
    border: '1px solid rgba(97, 67, 133, 0.4)',
    accent: '#A06CD5',
    shadow: '0 8px 24px rgba(160, 108, 213, 0.2)'
  },
  {
    id: 'obsidian-frost',
    name: 'Obsidian Frost',
    bg: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(47, 51, 54, 0.8) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    accent: '#64B5F6',
    shadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
  }
];

export const PRESET_QUOTE_FONTS = [
  { id: 'georgia', name: 'Georgia Serif', fontFamily: "Georgia, serif" },
  { id: 'playfair', name: 'Playfair Editorial', fontFamily: "'Playfair Display', serif" },
  { id: 'caveat', name: 'Caveat Script', fontFamily: "'Caveat', cursive, sans-serif" },
  { id: 'cinzel', name: 'Cinzel Roman', fontFamily: "'Cinzel', serif" },
  { id: 'vibes', name: 'Great Vibes Calligraphy', fontFamily: "'Great Vibes', cursive, sans-serif" },
  { id: 'pacifico', name: 'Pacifico Vintage', fontFamily: "'Pacifico', cursive, sans-serif" }
];

export function getQuoteFontFamily(fontId) {
  const found = PRESET_QUOTE_FONTS.find(f => f.id === fontId);
  return found ? found.fontFamily : PRESET_QUOTE_FONTS[0].fontFamily;
}
