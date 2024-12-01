import debounce from 'debounce';
import axios from "axios";
import handlebars from "handlebars";

document.addEventListener("DOMContentLoaded", searchDataOnLoad)

async function searchDataOnLoad() {
    let dataFromAxios = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=shit`)
    console.log(dataFromAxios)
}



let searchInput = document.querySelector(".searchInput")
let searchInputValue = "Shit"

function collectInpupData(){
    searchInputValue = document.querySelector(".searchInput").value
    console.log(searchInputValue)

    searchData()
}

searchInput.addEventListener("input", debounce(collectInpupData, 500))

async function searchData() {
    let dataFromAxios = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD&keyword=${searchInputValue}`)
    let shit = document.createElement("img")
    shit.src = dataFromAxios.data._embedded.events[0].images[0].url
    console.log(shit)
    let main = document.querySelector(".main")
    main.innerHTML = shit

    console.log(dataFromAxios.data._embedded.events)
}

