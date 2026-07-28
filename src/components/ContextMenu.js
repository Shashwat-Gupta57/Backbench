/**
 * ContextMenu — Reusable dropdown context menu for posts/polls.
 * Shows role-appropriate options based on ownership and staff status.
 */

import { showPromptModal, showConfirmModal } from './Modal.js';

let activeMenu = null;

function closeActiveMenu() {
  if (activeMenu) {
    activeMenu.remove();
    activeMenu = null;
  }
}

// Close on any click outside
document.addEventListener('click', closeActiveMenu);

/**
 * Show a context menu anchored to the given button.
 * @param {HTMLElement} anchorBtn - The "⋯" button
 * @param {Object} options
 * @param {string} options.itemId - Post or Poll ID
 * @param {string} options.authorId - Author/creator UID
 * @param {string} options.currentUid - Current logged-in user UID
 * @param {boolean} options.isStaff - Is the current user staff/admin?
 * @param {'post'|'poll'} options.itemType - The type of content
 * @param {Function} options.onDelete - Called when delete is confirmed
 * @param {Function} options.onReport - Called with (reason) when report is submitted
 */
export function showContextMenu(anchorBtn, options) {
  closeActiveMenu();

  const {
    itemId,
    authorId,
    currentUid,
    isStaff = false,
    itemType = 'post',
    onDelete,
    onReport,
    onEdit
  } = options;

  const isOwner = currentUid === authorId;
  const typeLabel = itemType === 'poll' ? 'poll' : 'post';

  const menu = document.createElement('div');
  menu.className = 'ctx-menu fade-in';
  menu.setAttribute('role', 'menu');

  const menuItems = [];

  // Owner can edit their own content (if onEdit is provided)
  if (isOwner && onEdit) {
    menuItems.push({
      icon: 'edit',
      label: `Edit ${typeLabel}`,
      className: 'ctx-menu-item',
      action: async () => {
        closeActiveMenu();
        if (onEdit) await onEdit(itemId);
      }
    });
  }

  // Owner can delete their own content
  if (isOwner) {
    menuItems.push({
      icon: 'delete',
      label: `Delete ${typeLabel}`,
      className: 'ctx-menu-item danger',
      action: async () => {
        closeActiveMenu();
        if (await showConfirmModal(`Delete ${typeLabel}`, `Are you sure you want to permanently delete this ${typeLabel}? This action cannot be undone.`)) {
          if (onDelete) await onDelete(itemId);
        }
      }
    });
  }

  // Staff/Admin can delete any content
  if (isStaff && !isOwner) {
    menuItems.push({
      icon: 'shield',
      label: `Take down ${typeLabel} (Staff)`,
      className: 'ctx-menu-item danger',
      action: async () => {
        closeActiveMenu();
        if (await showConfirmModal(`Take down ${typeLabel}`, `🛡️ Staff Moderation Action:\nDo you want to take down this ${typeLabel} from Backbench?`)) {
          if (onDelete) await onDelete(itemId);
        }
      }
    });
  }

  // Anyone (non-owner) can report content
  if (!isOwner) {
    menuItems.push({
      icon: 'flag',
      label: `Report ${typeLabel}`,
      className: 'ctx-menu-item',
      action: async () => {
        closeActiveMenu();
        const reason = await showPromptModal(`Report ${typeLabel}`, 'Inappropriate content', 'Please state your reason:');
        if (reason && reason.trim()) {
          if (onReport) onReport(itemId, reason.trim());
        }
      }
    });
  }

  // Staff can always report too (for records)
  if (isStaff && !isOwner) {
    // Already covered by the non-owner report above
  }

  // Always available: Copy link
  menuItems.push({
    icon: 'link',
    label: `Copy link`,
    className: 'ctx-menu-item',
    action: () => {
      closeActiveMenu();
      const baseUrl = window.location.origin + window.location.pathname;
      const link = itemType === 'poll'
        ? `${baseUrl}#/poll?id=${itemId}`
        : `${baseUrl}#/post?id=${itemId}`;
      navigator.clipboard.writeText(link).then(() => {
        showToast('Link copied to clipboard!');
      }).catch(async () => {
        // Fallback
        await showPromptModal('Copy this link:', link, 'Link');
      });
    }
  });

  // Build menu HTML
  menu.innerHTML = menuItems.map(item => `
    <button class="${item.className}" role="menuitem">
      <span class="material-symbols-outlined" style="font-size: 18px;">${item.icon}</span>
      <span>${item.label}</span>
    </button>
  `).join('');

  // Position menu below the anchor
  document.body.appendChild(menu);
  activeMenu = menu;

  const rect = anchorBtn.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();

  let top = rect.bottom + 4;
  let left = rect.right - menuRect.width;

  // Keep within viewport
  if (top + menuRect.height > window.innerHeight) {
    top = rect.top - menuRect.height - 4;
  }
  if (left < 8) left = 8;

  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;

  // Attach listeners
  const buttons = menu.querySelectorAll('.ctx-menu-item');
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menuItems[i].action();
    });
  });

  // Prevent menu click from closing itself
  menu.addEventListener('click', (e) => e.stopPropagation());
}

function showToast(message) {
  const existing = document.querySelector('.ctx-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'ctx-toast fade-in';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}
