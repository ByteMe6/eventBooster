export function updateMainContent(htmlContent) {
  const main = document.querySelector('.main');
  main.innerHTML = htmlContent;
}

export function createCard(arr) {
  try {
    const main = document.querySelector('.main');
    main.innerHTML = "";

    const cards = arr.map(e => {
      const title = e.name || "No title available";
      const date = e.dates?.start?.localDate || "Date not specified";
      const location = e._embedded?.venues[0]?.name || "Location not specified";
      const image = e.images?.[0]?.url || "https://via.placeholder.com/150";
      const description = e.info || e.description || "No description available";
      const minPrice = e.priceRanges?.[0]?.min || "Price not available";
      const currency = e.priceRanges?.[0]?.currency || "";
      const ticketUrl = e.url || "#";
      const artist = e._embedded?.attractions?.[0]?.name || "Artist not specified";
      const prices = e.priceRanges ? e.priceRanges.map(range => 
        `${range.type}: ${range.min} - ${range.max} ${range.currency}`).join(', ') 
        : "Price information not available";

      return `
        <div class="card" 
          data-title="${title}" 
          data-date="${date}" 
          data-location="${location}" 
          data-image="${image}" 
          data-description="${description}" 
          data-min-price="${minPrice}" 
          data-currency="${currency}" 
          data-ticket-url="${ticketUrl}" 
          data-artist="${artist}" 
          data-prices="${prices}">
          <img class="cardImg" src="${image}" alt="Event image" />
          <h3 class="cardTitle">${title}</h3>
          <p class="cardDate"><span class="cardDateIcon"> 🗓️ </span> ${date}</p>
          <p class="cardLocation"><span class="cardLocIcon"> 📍 </span> ${location}</p>
        </div>`;
    });

    main.innerHTML = cards.join("");

    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => {
      card.addEventListener('click', () => {
        openModal(card.dataset);
      });
    });
  } catch (error) {
    console.error("Error creating cards:", error);
    const main = document.querySelector('.main');
    main.innerHTML = `<p>Failed to load events. Please try again later.</p>`;
  }
}

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
