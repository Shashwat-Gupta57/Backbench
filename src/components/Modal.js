export function showConfirmModal(title, description) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = '20px';
    overlay.style.animation = 'fadeIn 0.2s ease';

    const modal = document.createElement('div');
    modal.className = 'card';
    modal.style.width = '100%';
    modal.style.maxWidth = '400px';
    modal.style.padding = '24px';
    modal.style.borderRadius = 'var(--radius)';
    modal.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    modal.style.transform = 'translateY(10px)';
    modal.style.animation = 'slideUp 0.2s ease forwards';

    modal.innerHTML = `
      <h3 style="margin-top:0; font-size: 18px; color: var(--text-primary);">${title}</h3>
      <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 15px; line-height: 1.5;">${description}</p>
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button id="modal-cancel-btn" class="btn btn-outline" style="padding: 8px 16px;">Cancel</button>
        <button id="modal-confirm-btn" class="btn" style="padding: 8px 16px; background: var(--critical); border-color: var(--critical);">Confirm</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const close = (result) => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 200);
      resolve(result);
    };

    modal.querySelector('#modal-cancel-btn').onclick = () => close(false);
    modal.querySelector('#modal-confirm-btn').onclick = () => close(true);
    overlay.onclick = (e) => { if(e.target === overlay) close(false); };
  });
}

export function showPromptModal(title, defaultValue = '', placeholder = '', maxLength = null, wordLimit = null) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.backdropFilter = 'blur(4px)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = '20px';
    overlay.style.animation = 'fadeIn 0.2s ease';

    const modal = document.createElement('div');
    modal.className = 'card';
    modal.style.width = '100%';
    modal.style.maxWidth = '400px';
    modal.style.padding = '24px';
    modal.style.borderRadius = 'var(--radius)';
    modal.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    modal.style.transform = 'translateY(10px)';
    modal.style.animation = 'slideUp 0.2s ease forwards';
    
    let counterHtml = '';
    if (wordLimit) {
       counterHtml = `<div id="modal-word-counter" style="font-size: 12px; color: var(--text-secondary); text-align: right; margin-top: 4px;">0 / ${wordLimit} words</div>`;
    }

    modal.innerHTML = `
      <h3 style="margin-top:0; font-size: 18px; color: var(--text-primary); margin-bottom: 16px;">${title}</h3>
      <textarea id="modal-prompt-input" class="input" rows="4" placeholder="${placeholder}" style="width: 100%; resize: vertical; margin-bottom: 4px;">${defaultValue}</textarea>
      ${counterHtml}
      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
        <button id="modal-cancel-btn" class="btn btn-outline" style="padding: 8px 16px;">Cancel</button>
        <button id="modal-confirm-btn" class="btn" style="padding: 8px 16px;">Save</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const input = modal.querySelector('#modal-prompt-input');
    const confirmBtn = modal.querySelector('#modal-confirm-btn');
    const wordCounter = modal.querySelector('#modal-word-counter');

    if (maxLength) input.maxLength = maxLength;

    const checkWordLimit = () => {
      if (!wordLimit) return true;
      const text = input.value.trim();
      const words = text ? text.split(/\s+/) : [];
      if (wordCounter) {
        wordCounter.textContent = `${words.length} / ${wordLimit} words`;
        if (words.length > wordLimit) {
          wordCounter.style.color = 'var(--critical)';
        } else {
          wordCounter.style.color = 'var(--text-secondary)';
        }
      }
      return words.length <= wordLimit;
    };

    input.addEventListener('input', () => {
      const isValid = checkWordLimit();
      confirmBtn.disabled = !isValid;
    });
    
    checkWordLimit();
    input.focus();
    // cursor at end
    input.selectionStart = input.selectionEnd = input.value.length;

    const close = (result) => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 200);
      resolve(result);
    };

    modal.querySelector('#modal-cancel-btn').onclick = () => close(null);
    confirmBtn.onclick = () => {
      if (checkWordLimit()) {
        close(input.value);
      }
    };
    overlay.onclick = (e) => { if(e.target === overlay) close(null); };
  });
}
