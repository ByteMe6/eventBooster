!function(){let o=[{countryCode:"AU",country:"Australia"},{countryCode:"AD",country:"Andorra"},{countryCode:"AI",country:"Anguilla"},{countryCode:"AR",country:"Argentina"},{countryCode:"AT",country:"Austria"},{countryCode:"AZ",country:"Azerbaijan"},{countryCode:"BS",country:"Bahamas"},{countryCode:"BH",country:"Bahrain"},{countryCode:"BB",country:"Barbados"},{countryCode:"BE",country:"Belgium"},{countryCode:"BM",country:"Bermuda"},{countryCode:"BR",country:"Brazil"},{countryCode:"BG",country:"Bulgaria"},{countryCode:"CA",country:"Canada"},{countryCode:"CL",country:"Chile"},{countryCode:"CN",country:"China"},{countryCode:"CO",country:"Colombia"},{countryCode:"CR",country:"Costa Rica"},{countryCode:"HR",country:"Croatia"},{countryCode:"CY",country:"Cyprus"},{countryCode:"CZ",country:"Czech Republic"},{countryCode:"DK",country:"Denmark"},{countryCode:"DO",country:"Dominican Republic"},{countryCode:"EC",country:"Ecuador"},{countryCode:"EE",country:"Estonia"},{countryCode:"FO",country:"Faroe Islands"},{countryCode:"FI",country:"Finland"},{countryCode:"FR",country:"France"},{countryCode:"GE",country:"Georgia"},{countryCode:"DE",country:"Germany"},{countryCode:"GH",country:"Ghana"},{countryCode:"GI",country:"Gibraltar"},{countryCode:"GB",country:"Great Britain"},{countryCode:"GR",country:"Greece"},{countryCode:"HK",country:"Hong Kong"},{countryCode:"HU",country:"Hungary"},{countryCode:"IS",country:"Iceland"},{countryCode:"IN",country:"India"},{countryCode:"IE",country:"Ireland"},{countryCode:"IL",country:"Israel"},{countryCode:"IT",country:"Italy"},{countryCode:"JM",country:"Jamaica"},{countryCode:"JP",country:"Japan"},{countryCode:"KR",country:"Korea, Republic of"},{countryCode:"LV",country:"Latvia"},{countryCode:"LB",country:"Lebanon"},{countryCode:"LT",country:"Lithuania"},{countryCode:"LU",country:"Luxembourg"},{countryCode:"MY",country:"Malaysia"},{countryCode:"MT",country:"Malta"},{countryCode:"MX",country:"Mexico"},{countryCode:"MC",country:"Monaco"},{countryCode:"ME",country:"Montenegro"},{countryCode:"MA",country:"Morocco"},{countryCode:"NL",country:"Netherlands"},{countryCode:"AN",country:"Netherlands Antilles"},{countryCode:"NZ",country:"New Zealand"},{countryCode:"ND",country:"Northern Ireland"},{countryCode:"NO",country:"Norway"},{countryCode:"PE",country:"Peru"},{countryCode:"PL",country:"Poland"},{countryCode:"PT",country:"Portugal"},{countryCode:"RO",country:"Romania"},{countryCode:"RU",country:"Russian Federation"},{countryCode:"LC",country:"Saint Lucia"},{countryCode:"SA",country:"Saudi Arabia"},{countryCode:"RS",country:"Serbia"},{countryCode:"SG",country:"Singapore"},{countryCode:"SK",country:"Slovakia"},{countryCode:"SI",country:"Slovenia"},{countryCode:"ZA",country:"South Africa"},{countryCode:"ES",country:"Spain"},{countryCode:"SE",country:"Sweden"},{countryCode:"CH",country:"Switzerland"},{countryCode:"TW",country:"Taiwan"},{countryCode:"TH",country:"Thailand"},{countryCode:"TT",country:"Trinidad and Tobago"},{countryCode:"TR",country:"Turkey"},{countryCode:"UA",country:"Ukraine"},{countryCode:"AE",country:"United Arab Emirates"},{countryCode:"UY",country:"Uruguay"},{countryCode:"US",country:"United States Of America"},{countryCode:"VE",country:"Venezuela"}];async function t(o,t,n){let e=`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${o}&size=200`;return t&&(e+=`&keyword=${t}`),n&&(e+=`&countryCode=${n}`),(await fetch(e)).json()}function n(o){document.querySelector(".main").innerHTML=o}async function e(o,e,r){try{let c=await t(o,e,r);c._embedded&&c._embedded.events?function(o){try{let t=document.querySelector(".main");t.innerHTML="";let n=o.map(o=>{let t=o.name||"No title available",n=o.dates?.start?.localDate||"Date not specified",e=o._embedded?.venues[0]?.name||"Location not specified",r=o.images?.[0]?.url||"https://via.placeholder.com/150",c=o.info||o.description||"No description available",a=o.priceRanges?.[0]?.min||"Price not available",u=o.priceRanges?.[0]?.currency||"",d=o.url||"#",y=o._embedded?.attractions?.[0]?.name||"Artist not specified",i=o.priceRanges?o.priceRanges.map(o=>`${o.type}: ${o.min} - ${o.max} ${o.currency}`).join(", "):"Price information not available";return`
        <div class="card" 
          data-title="${t}" 
          data-date="${n}" 
          data-location="${e}" 
          data-image="${r}" 
          data-description="${c}" 
          data-min-price="${a}" 
          data-currency="${u}" 
          data-ticket-url="${d}" 
          data-artist="${y}" 
          data-prices="${i}">
          <img class="cardImg" src="${r}" alt="Event image" />
          <h3 class="cardTitle">${t}</h3>
          <p class="cardDate"><span class="cardDateIcon"> \u{1F5D3}\u{FE0F} </span> ${n}</p>
          <p class="cardLocation"><span class="cardLocIcon"> \u{1F4CD} </span> ${e}</p>
        </div>`});t.innerHTML=n.join(""),document.querySelectorAll(".card").forEach(o=>{o.addEventListener("click",()=>{!function(o){let t=document.createElement("div");t.classList.add("cardFullScreen"),t.innerHTML=`
    <img src="${o.image}" alt="\u{1F387}" class="smallRoundIcon">
    <button class="closeModalBtn">
      <img src="https://raw.githubusercontent.com/ByteMe6/eventBooster/refs/heads/master/src/img/closeModal.png" alt="">
    </button>
    <div class="cardFullscreenMainContent">
      <div class="imgCardFullscreenContainer">
        <img src="${o.image}" alt="\u{1F387}" class="BigPoster">
      </div>
      <div class="cardFullscreenTextContainer">
        <h3 class="cftch3">INFO</h3>
        <p>${o.description||"No description available"}</p>

        <h3 class="cftch3">WHEN</h3>
        <p>${o.date||"Date not specified"}</p>

        <h3 class="cftch3">WHERE</h3>
        <p>${o.location||"Location not specified"}</p>

        <h3 class="cftch3">WHO</h3>
        <p>${o.artist||"Artist not specified"}</p>

        <h3 class="cftch3">PRICES</h3>
        <p>${o.prices||"Price information not available"}</p>

        <a href="${o.ticketUrl}" target="_blank" class="ILoveBootstrapIfuckCodepen">
          BUY TICKETS
        </a>
      </div>
    </div>
    <button class="WHEREISBOOTSTRAP">MORE FROM THIS AUTHOR</button>
  `,document.body.appendChild(t),t.querySelector(".closeModalBtn").addEventListener("click",()=>{document.body.removeChild(t)}),t.addEventListener("click",o=>{o.target===t&&document.body.removeChild(t)})}(o.dataset)})})}catch(o){console.error("Error creating cards:",o),document.querySelector(".main").innerHTML="<p>Failed to load events. Please try again later.</p>"}}(c._embedded.events):n("<p>No events found. Try different search criteria.</p>")}catch(o){console.error("Error fetching event data:",o),n("<p>Error loading events. Please try again later.</p>")}}let r="GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD",c="",a="";document.addEventListener("DOMContentLoaded",()=>{var t;let n;!function(t){let n=document.getElementById("countriesList");n.innerHTML='<option value="">All Countries</option>'+o.map(({countryCode:o,country:t})=>`<option value="${o}">${t}</option>`).join(""),n.addEventListener("change",o=>{t(o.target.value)})}(o=>{e(r,c,a=o)});let u=document.querySelector(".searchInput");u.addEventListener("input",(t=()=>{e(r,c=u.value,a)},function(...o){clearTimeout(n),n=setTimeout(()=>t.apply(this,o),500)})),e(r,"","")})}();
//# sourceMappingURL=index.f25326dd.js.map
