import debounce from 'debounce';
import axios from 'axios';
import Handlebars, { create } from 'handlebars';

document.addEventListener('DOMContentLoaded', searchDataOnLoad);

let searchInput = document.querySelector('.searchInput');
let searchInputValue = 'Shit';

searchInput.addEventListener('input', debounce(collectInputData, 500));

async function searchDataOnLoad() {
  let dataFromAxios = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=shit`
  );
  console.log(dataFromAxios);
}

function collectInputData() {
  searchInputValue = document.querySelector('.searchInput').value;
  searchData();
}

async function searchData() {
  try {
    let dataFromAxios = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=${searchInputValue}`
    );

    let events = dataFromAxios.data._embedded.events;
    createCard(events);
  } catch (error) {
    console.error('Error fetching event data:', error);
  }
}

function createCard(arr) {
  try {
    const main = document.querySelector('.main');
    main.innerHTML = ""; // Очистить контейнер перед добавлением новых карт

    const cards = arr.map(e => {
      let title = e.name || "No title available";
      let date = e.dates?.start?.localDate || "No date available";
      let loc = e._embedded?.venues[0]?.name || "No location available";
      let src = e.images?.[0]?.url || "https://via.placeholder.com/150";
      let des = e.description || "no info";
      let price = e.priceRanges?.[0]?.min ? "from " + e.priceRanges[0].min : 'no price';
      let valuta = e.priceRanges?.[0]?.currency || ' ';
      let buyBilleti = e._embedded?.venues?.[0]?.url || '#';
      let artist = e._embedded?.attractions?.[0]?.name || "Artist info unavailable";
      let prices = e.priceRanges ? e.priceRanges.map(range => `${range.type}: ${range.min} - ${range.max} ${range.currency}`).join(', ') : "Price information unavailable";

      console.log(e);

      // HTML для карточки
      return `<div class="card" data-title="${title}" data-date="${date}" data-location="${loc}" data-image="${src}" data-des="${des}" data-minPrice="${price}" data-valuta="${valuta}" data-billet="${buyBilleti}" data-artist="${artist}" data-prices="${prices}">
                <img class="cardImg" src="${src}" alt="Event image" />
                <h3 class="cardTitle">${title}</h3>
                <p class="cardDate"><span class="cardDateIcon"> 🗓️ </span> ${date}</p>
                <p class="cardLocation"><span class="cardLocIcon"> 📍 </span> ${loc}</p>
              </div>`;
    });

    main.innerHTML = cards.join(""); // Вставить все карты в контейнер

    // Добавляем обработчик клика на карточки
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => {
      card.addEventListener('click', () => openModal(card));
    });
  } catch (error) {
    console.error("Error creating cards:", error);
    const main = document.querySelector('.main');
    main.innerHTML = `<p>Failed to load events. Please try again later.</p>`;
  }
}

function openModal(card) {
  // Получаем данные из атрибутов карточки
  const title = card.getAttribute('data-title');
  const date = card.getAttribute('data-date');
  const location = card.getAttribute('data-location');
  const image = card.getAttribute('data-image');
  let info = card.getAttribute('data-des');
  let pricem = card.getAttribute('data-minPrice');
  let val = card.getAttribute('data-valuta');
  let billeti = card.getAttribute('data-billet');
  let artist = card.getAttribute('data-artist') || "Artist info unavailable"; // Add artist if available

  // Prices will be an array of different price ranges
  let prices = card.getAttribute('data-prices') || "Price information unavailable";

  // Создаем модалку с необходимыми данными
  const modal = document.createElement('div');
  modal.classList.add('cardFullScreen');
  modal.innerHTML = `
    <img src="${image}" alt="🎇" class="smallRoundIcon">
    <button class="closeModalBtn">
      <img src="https://raw.githubusercontent.com/ByteMe6/eventBooster/refs/heads/master/src/img/closeModal.png" alt="">
    </button>
    <div class="cardFullscreenMainContent">
      <div class="imgCardFullscreenContainer">
        <img src="${image}" alt="🎇" class="BigPoster">
      </div>
      <div class="cardFullscreenTextContainer">
        <h3 class="cftch3">Info</h3>
        <p>${info}</p>

        <h3 class="cftch3">When</h3>
        <p>${date}</p>

        <h3 class="cftch3">Where</h3>
        <p>${location}</p>

        <h3 class="cftch3">Who</h3>
        <p>${artist}</p>

        <h3 class="cftch3">Prices</h3>
        <p>${prices}</p>

        <a href="${billeti}" class="ILoveBootstrapIfuckCodepen" style="margin-top: 5px;font-family: Montserrat, Helvetica">BUY TICKETS</a>
      </div>
    </div>
    <button class="WHEREISBOOTSTRAP">MORE FROM THIS AUTHOR</button>
  `;

  // Добавляем модалку в DOM
  document.body.appendChild(modal);

  // Обработчик закрытия модалки
  const closeModalBtn = modal.querySelector('.closeModalBtn');
  closeModalBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}