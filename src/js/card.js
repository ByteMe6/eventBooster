import debounce from 'debounce';
import axios from 'axios';
import Handlebars from 'handlebars';

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
  let dataFromAxios = await axios.get(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=${searchInputValue}`
  );
  let image = `<img src="https://s1.ticketm.net/dam/c/8cf/a6653880-7899-4f67-8067-1f95f4d158cf_124761_RECOMENDATION_16_9.jpg" class="cardImg" alt="">`;
  let shit = document.createElement('img');
  shit.src = dataFromAxios.data._embedded.events[0].images[0].url;
  console.log(shit);
  let main = document.querySelector('.main');

  const template = document.querySelector('#template').innerHTML.trim();

  const shablon = Handlebars.compile(template);

  main.insertAdjacentHTML(
    'beforeend',
    shablon({ title: 'Продукти', date: "22-02-2012", loc: "marpl", src: 'src="https://picsum.photos/180/227"'})
  );

  console.log(dataFromAxios.data._embedded.events);
}
