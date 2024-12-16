import { fetchEvents } from './api.js';
import { createCard } from './card.js';
import { updateMainContent } from './dom.js';
import { apiKey } from "./api.js";

let currentPage = 1;
const eventsPerPage = 12;
const MAX_PAGES = 52;
let currentSearchInput = '';
let currentCountry = '';

function updatePagination(page, totalPages) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  if (totalPages > 0) {
    const actualPages = Math.min(totalPages, MAX_PAGES);
    
    for (let i = 1; i <= actualPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.classList.add("pagBtn")
      pageButton.classList.toggle('active', i === page);
      pageButton.onclick = () => {
        currentPage = i;
        fetchAndDisplayEvents(currentSearchInput, currentCountry);
      };
      paginationContainer.appendChild(pageButton);
    }
  }
}

export async function fetchAndDisplayEvents(searchInput = '', country = '') {
  try {
    currentSearchInput = searchInput;
    currentCountry = country;
    
    const data = await fetchEvents(apiKey, searchInput, country, currentPage, eventsPerPage);
    
    if (data._embedded && data._embedded.events) {
      const events = data._embedded.events;
      
      let totalPages;
      if (data.page.totalPages && data._embedded.events.length > 0) {
        totalPages = Math.min(data.page.totalPages, MAX_PAGES);
      } else {
        totalPages = Math.min(Math.ceil(events.length / eventsPerPage), MAX_PAGES);
      }

      createCard(events);
      updatePagination(currentPage, totalPages);
    } else {
      updateMainContent(`<p class="noEvents">No events found</p>`);
      updatePagination(0, 0);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    updateMainContent(`<p class="error">Error loading events. Please try again later.</p>`);
    updatePagination(0, 0);
  }
}

export function resetPagination() {
  currentPage = 1;
}