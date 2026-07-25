export function escapeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function extractHashtags(text) {
  if (!text) return [];
  const matches = text.match(/#([a-zA-Z0-9_]+)/g);
  if (!matches) return [];
  const tags = matches.map(m => m.replace(/^#/, '').toLowerCase());
  return Array.from(new Set(tags));
}

export function renderFormattedContent(text) {
  if (!text) return '';
  const escaped = escapeHTML(text);
  // Convert #hashtags into clickable search links
  const formatted = escaped.replace(/#([a-zA-Z0-9_]+)/g, (match, tag) => {
    const cleanTag = encodeURIComponent(tag.toLowerCase());
    return `<a href="#/search?q=%23${cleanTag}" class="hashtag-link" onclick="event.stopPropagation()" style="color: var(--accent-primary); font-weight: 700; text-decoration: none;">${match}</a>`;
  });
  return formatted.replace(/\n/g, '<br>');
}
