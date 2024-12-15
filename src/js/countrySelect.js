import { countries } from './country.js';

export function initializeCountrySelect(onCountryChange) {
  const countriesList = document.getElementById('countriesList');
  countriesList.innerHTML = `<option value="">All Countries</option>` +
    countries.map(({ countryCode, country }) =>
      `<option value="${countryCode}">${country}</option>`
    ).join('');

  countriesList.addEventListener('change', (e) => {
    onCountryChange(e.target.value);
  });
}