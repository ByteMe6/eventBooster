import debounce from 'debounce';
import axios from 'axios';
import Handlebars, { create } from 'handlebars';

document.addEventListener('DOMContentLoaded', searchDataOnLoad);

async function searchDataOnLoad() {
  let dataFromAxios = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=shit`
  );
  console.log(dataFromAxios);
}

let searchInput = document.querySelector('.searchInput');
let searchInputValue = 'Shit';

function collectInpupData() {
  searchInputValue = document.querySelector('.searchInput').value;
  console.log(searchInputValue);

  searchData();
}

searchInput.addEventListener('input', debounce(collectInpupData, 500));

async function searchData() {
  try {
    let dataFromAxios = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=${searchInputValue}`
    );
    let image = `<img src="https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_RECOMENDATION_16_9.jpg" class="cardImg" alt="">`;
    let shit = document.createElement('img');
    shit.src = dataFromAxios.data._embedded.events[0].images[0].url;
    console.log(shit);
    let main = document.querySelector('.main');

    let events = dataFromAxios.data._embedded.events;
    console.log(events);

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
      console.log(e);

      let title = e.name || "No title available";
      let date = e.dates?.start?.localDate || "No date available";
      let loc = e._embedded?.venues[0]?.name || "No location available";
      let src = e.images?.[0]?.url || "https://via.placeholder.com/150";

      return `<div class="card">
                <img class="cardImg" src="${src}" alt="Event image" />
                <h3 class="cardTitle">${title}</h3>
                <p class="cardDate"><span class="cardDateIcon"> 🗓️ </span> ${date}</p>
                <p class="cardLocation"><span class="cardLocIcon"> 📍 </span> ${loc}</p>
              </div>`;
    });

    main.innerHTML = cards.join(""); // Вставить все карты в контейнер
  } catch (error) {
    console.error("Error creating cards:", error);
    const main = document.querySelector('.main');
    main.innerHTML = `<p>Failed to load events. Please try again later.</p>`;
  }
}
