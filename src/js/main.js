import { debounce } from './debounce.js';
import { initializeCountrySelect } from './countrySelect.js';
import { searchData } from './search.js';

const apiKey = 'GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD';
let searchInputValue = '';
let selectedCountry = '';

document.addEventListener('DOMContentLoaded', () => {
  initializeCountrySelect((country) => {
    selectedCountry = country;
    searchData(apiKey, searchInputValue, selectedCountry);
  });

  const searchInput = document.querySelector('.searchInput');
  searchInput.addEventListener('input', debounce(() => {
    searchInputValue = searchInput.value;
    searchData(apiKey, searchInputValue, selectedCountry);
  }, 500));

  searchData(apiKey, '', '');
}); 