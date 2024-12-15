export function openModal(data) {
  const modal = document.createElement('div');
  modal.classList.add('cardFullScreen');
  
  modal.innerHTML = `
    <img src="${data.image}" alt="🎇" class="smallRoundIcon">
    <button class="closeModalBtn">
      <img src="https://raw.githubusercontent.com/ByteMe6/eventBooster/refs/heads/master/src/img/closeModal.png" alt="">
    </button>
    <div class="cardFullscreenMainContent">
      <div class="imgCardFullscreenContainer">
        <img src="${data.image}" alt="🎇" class="BigPoster">
      </div>
      <div class="cardFullscreenTextContainer">
        <h3 class="cftch3">INFO</h3>
        <p>${data.description || 'No description available'}</p>

        <h3 class="cftch3">WHEN</h3>
        <p>${data.date || 'Date not specified'}</p>

        <h3 class="cftch3">WHERE</h3>
        <p>${data.location || 'Location not specified'}</p>

        <h3 class="cftch3">WHO</h3>
        <p>${data.artist || 'Artist not specified'}</p>

        <h3 class="cftch3">PRICES</h3>
        <p>${data.prices || 'Price information not available'}</p>

        <a href="${data.ticketUrl}" target="_blank" class="ILoveBootstrapIfuckCodepen">
          BUY TICKETS
        </a>
      </div>
    </div>
    <button class="WHEREISBOOTSTRAP">MORE FROM THIS AUTHOR</button>
  `;

  document.body.appendChild(modal);

  const closeModalBtn = modal.querySelector('.closeModalBtn');
  closeModalBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}