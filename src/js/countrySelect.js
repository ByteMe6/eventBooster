import { countries } from './country.js';

let curCountry = '';
let secondInputBtn = document.querySelector(".secondInputBtn");

export function initializeCountrySelect(onCountryChange) {
  const countriesList = document.getElementById('countriesList');
  countriesList.innerHTML = `` +
    countries.map(({ countryCode, country }) =>
      `<li class="dropdown-bootstrap-li"><button class="dropdown-item" value="${countryCode}">${country}</button></li>`
    ).join('');

  countriesList.addEventListener('click', (e) => {
    onCountryChange(e.target.value);
    curCountry = e.target.textContent;
    secondInputBtn.textContent = curCountry;
  });
}