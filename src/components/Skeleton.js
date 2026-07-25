export function createPostSkeletonHTML() {
  return `
    <div class="post-card fade-in" style="cursor: default;">
      <div class="skeleton" style="width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;"></div>
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
          <div class="skeleton" style="width: 120px; height: 16px;"></div>
          <div class="skeleton" style="width: 80px; height: 14px;"></div>
        </div>
        <div class="skeleton" style="width: 90%; height: 14px; margin-bottom: 8px;"></div>
        <div class="skeleton" style="width: 60%; height: 14px; margin-bottom: 16px;"></div>
        <div style="display: flex; gap: 40px;">
          <div class="skeleton" style="width: 40px; height: 16px;"></div>
          <div class="skeleton" style="width: 40px; height: 16px;"></div>
        </div>
      </div>
    </div>
  `;
}

export function renderFeedSkeletons(count = 4) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += createPostSkeletonHTML();
  }
  return html;
}
