import debounce from 'debounce';
import axios from "axios";

let searchInput = document.querySelector(".searchInput")
let searchInputValue = "Eurovision"

function collectInpupData(){
    searchInputValue = document.querySelector(".searchInput").value
    console.log(searchInputValue)

    searchData()
}

searchInput.addEventListener("input", debounce(collectInpupData, 100))

async function searchData() {
    let dataFromAxios = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD/keyword=${searchInputValue}`)
    console.log(dataFromAxios)
}