import debounce from 'debounce';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', searchDataOnLoad);

let searchInput = document.querySelector('.searchInput');
let searchInputValue = 'Shit';

// Функция, которая вызывается при загрузке страницы
async function searchDataOnLoad() {
  let dataFromAxios = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=${searchInputValue}`
  );
  console.log(dataFromAxios);
}

function collectInpupData() {
  searchInputValue = document.querySelector('.searchInput').value;
  console.log(searchInputValue);

  searchData();
}

searchInput.addEventListener('input', debounce(collectInpupData, 500));

// Функция для поиска событий по ключевому слову
async function searchData() {
  try {
    let dataFromAxios = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=${searchInputValue}`
    );

    let events = dataFromAxios.data._embedded.events;
    console.log(events);

    createCard(events);
  } catch (error) {
    console.error('Error fetching event data:', error);
  }
}

// Функция для создания карточек с событиями
function createCard(arr) {
  try {
    const main = document.querySelector('.main');
    main.innerHTML = ""; // Очистить контейнер перед добавлением новых карт

    const cards = arr.map(e => {
      let title = e.name || "No title available";
      let date = e.dates?.start?.localDate || "No date available";
      let loc = e._embedded?.venues[0]?.name || "No location available";
      let src = e.images?.[0]?.url || "https://via.placeholder.com/150";

      return `
        <div class="card" data-event='${JSON.stringify(e)}'>
          <img class="cardImg" src="${src}" alt="Event image" />
          <h3 class="cardTitle">${title}</h3>
          <p class="cardDate"><span class="cardDateIcon"> 🗓️ </span> ${date}</p>
          <p class="cardLocation"><span class="cardLocIcon"> 📍 </span> ${loc}</p>
        </div>`;
    });

    main.innerHTML = cards.join(""); // Вставить все карты в контейнер

    // Добавить слушатель для открытия модалки
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => {
      card.addEventListener('click', (e) => {
        const eventData = JSON.parse(e.currentTarget.getAttribute('data-event'));
        openModal(eventData);
      });
    });
  } catch (error) {
    console.error("Error creating cards:", error);
    const main = document.querySelector('.main');
    main.innerHTML = `<p>Failed to load events. Please try again later.</p>`;
  }
}


