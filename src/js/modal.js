import debounce from 'debounce';
import axios from 'axios';
import Handlebars, { create } from 'handlebars';

document.addEventListener('DOMContentLoaded', searchDataOnLoad);

let searchInput = document.querySelector('.searchInput');
let searchInputValue = 'Shit';

searchInput.addEventListener('input', debounce(collectInpupData, 500));

async function searchDataOnLoad() {
  let dataFromAxios = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=shit`
  );
  console.log(dataFromAxios);
}

function collectInpupData() {
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

      // HTML для карточки
      return `<div class="card" data-title="${title}" data-date="${date}" data-location="${loc}" data-image="${src}">
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
  let  info = "shit"

  console.log(card);

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
        <p>
        ${info}
</p>
        <h3 class="cftch3">When</h3>
        <p>${date}</p>
        <h3 class="cftch3">Where</h3>
        <p>${location}</p>
        <button class="ILoveBootstrapIfuckCodepen">BUY TICKETS</button>
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