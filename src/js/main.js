import { debounce } from './debounce.js';
import { initializeCountrySelect } from './countrySelect.js';
import { fetchAndDisplayEvents, resetPagination } from './pagination.js';
import { updateMainContent } from './dom.js';
import { createCard } from './card.js';
import { apiKey } from "./api.js";

let searchInputValue = '';
let selectedCountry = '';

document.addEventListener('DOMContentLoaded', () => {
  initializeCountrySelect((country) => {
    selectedCountry = country;
    resetPagination();
    if (searchInputValue || selectedCountry) {
      fetchAndDisplayEvents(searchInputValue, selectedCountry);
    }
  });

  const searchInput = document.querySelector('.searchInput');
  searchInput.addEventListener('input', debounce(() => {
    searchInputValue = searchInput.value;
    resetPagination();
    if (searchInputValue || selectedCountry) {
      fetchAndDisplayEvents(searchInputValue, selectedCountry);
    } else {
      updateMainContent('');
      document.getElementById('pagination').innerHTML = '';
    }
  }, 500));

  updateMainContent('');
  document.getElementById('pagination').innerHTML = '';
});

