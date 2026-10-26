/* ========================================================
   PORTAL UTAMA PEMBELAJARAN
   CYBER SECURITY MANAGEMENT - BWP5030
   script.js (Home Portal)
   ======================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initSearchFilter();
});

// Live filter search for meetings
function initSearchFilter() {
  const searchInput = document.getElementById('topicSearchInput');
  const cards = document.querySelectorAll('.meeting-card');
  if (!searchInput || !cards.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    cards.forEach(card => {
      const searchData = (card.getAttribute('data-search') || '').toLowerCase();
      const cardText = card.textContent.toLowerCase();

      if (!query || searchData.includes(query) || cardText.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
