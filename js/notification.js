// Notifications and confirm modal
function showNotification(message, type = 'info', duration = 3000) {
  const container = document.getElementById('notification-container');
  if (!container) return;

  const notification = document.createElement('div');
  notification.classList.add('notification', type);
  notification.textContent = message;

  // Limit to 3 notifications
  while (container.children.length >= 3) {
    container.removeChild(container.firstChild);
  }

  container.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s forwards';
    notification.addEventListener('animationend', () => notification.remove());
  }, duration);
}

function showConfirmModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const p = document.createElement('p');
  p.textContent = message;

  const btnConfirm = document.createElement('button');
  btnConfirm.classList.add('confirm-btn');
  btnConfirm.textContent = 'Oui';

  const btnCancel = document.createElement('button');
  btnCancel.classList.add('cancel-btn');
  btnCancel.textContent = 'Non';

  modalContent.appendChild(p);
  modalContent.appendChild(btnConfirm);
  modalContent.appendChild(btnCancel);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  btnConfirm.addEventListener('click', () => {
    try { onConfirm && onConfirm(); } finally { modal.remove(); }
  });

  btnCancel.addEventListener('click', () => modal.remove());

  modal.addEventListener('click', (event) => {
    if (!modalContent.contains(event.target)) {
      modal.remove();
    }
  });
}

// Expose globally for other scripts
window.showNotification = showNotification;
window.showConfirmModal = showConfirmModal;
