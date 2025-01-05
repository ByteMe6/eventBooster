import { openModal } from './modal.js';
// import { createCard } from './dom.js';

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
        <div  class="card animate__animated animate__wobble"
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


