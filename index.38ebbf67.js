!function(){let t=[{countryCode:"AU",country:"Australia"},{countryCode:"AD",country:"Andorra"},{countryCode:"AI",country:"Anguilla"},{countryCode:"AR",country:"Argentina"},{countryCode:"AT",country:"Austria"},{countryCode:"AZ",country:"Azerbaijan"},{countryCode:"BS",country:"Bahamas"},{countryCode:"BH",country:"Bahrain"},{countryCode:"BB",country:"Barbados"},{countryCode:"BE",country:"Belgium"},{countryCode:"BM",country:"Bermuda"},{countryCode:"BR",country:"Brazil"},{countryCode:"BG",country:"Bulgaria"},{countryCode:"CA",country:"Canada"},{countryCode:"CL",country:"Chile"},{countryCode:"CN",country:"China"},{countryCode:"CO",country:"Colombia"},{countryCode:"CR",country:"Costa Rica"},{countryCode:"HR",country:"Croatia"},{countryCode:"CY",country:"Cyprus"},{countryCode:"CZ",country:"Czech Republic"},{countryCode:"DK",country:"Denmark"},{countryCode:"DO",country:"Dominican Republic"},{countryCode:"EC",country:"Ecuador"},{countryCode:"EE",country:"Estonia"},{countryCode:"FO",country:"Faroe Islands"},{countryCode:"FI",country:"Finland"},{countryCode:"FR",country:"France"},{countryCode:"GE",country:"Georgia"},{countryCode:"DE",country:"Germany"},{countryCode:"GH",country:"Ghana"},{countryCode:"GI",country:"Gibraltar"},{countryCode:"GB",country:"Great Britain"},{countryCode:"GR",country:"Greece"},{countryCode:"HK",country:"Hong Kong"},{countryCode:"HU",country:"Hungary"},{countryCode:"IS",country:"Iceland"},{countryCode:"IN",country:"India"},{countryCode:"IE",country:"Ireland"},{countryCode:"IL",country:"Israel"},{countryCode:"IT",country:"Italy"},{countryCode:"JM",country:"Jamaica"},{countryCode:"JP",country:"Japan"},{countryCode:"KR",country:"Korea, Republic of"},{countryCode:"LV",country:"Latvia"},{countryCode:"LB",country:"Lebanon"},{countryCode:"LT",country:"Lithuania"},{countryCode:"LU",country:"Luxembourg"},{countryCode:"MY",country:"Malaysia"},{countryCode:"MT",country:"Malta"},{countryCode:"MX",country:"Mexico"},{countryCode:"MC",country:"Monaco"},{countryCode:"ME",country:"Montenegro"},{countryCode:"MA",country:"Morocco"},{countryCode:"NL",country:"Netherlands"},{countryCode:"AN",country:"Netherlands Antilles"},{countryCode:"NZ",country:"New Zealand"},{countryCode:"ND",country:"Northern Ireland"},{countryCode:"NO",country:"Norway"},{countryCode:"PE",country:"Peru"},{countryCode:"PL",country:"Poland"},{countryCode:"PT",country:"Portugal"},{countryCode:"RO",country:"Romania"},{countryCode:"RU",country:"Russian Federation"},{countryCode:"LC",country:"Saint Lucia"},{countryCode:"SA",country:"Saudi Arabia"},{countryCode:"RS",country:"Serbia"},{countryCode:"SG",country:"Singapore"},{countryCode:"SK",country:"Slovakia"},{countryCode:"SI",country:"Slovenia"},{countryCode:"ZA",country:"South Africa"},{countryCode:"ES",country:"Spain"},{countryCode:"SE",country:"Sweden"},{countryCode:"CH",country:"Switzerland"},{countryCode:"TW",country:"Taiwan"},{countryCode:"TH",country:"Thailand"},{countryCode:"TT",country:"Trinidad and Tobago"},{countryCode:"TR",country:"Turkey"},{countryCode:"UA",country:"Ukraine"},{countryCode:"AE",country:"United Arab Emirates"},{countryCode:"UY",country:"Uruguay"},{countryCode:"US",country:"United States Of America"},{countryCode:"VE",country:"Venezuela"}];async function e(t,o,n,r=1,c=12){let a=`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${t}&size=${c}&page=${r-1}`;if(o){let t=encodeURIComponent(o.trim());a+=`&keyword=${t}`}n&&(a+=`&countryCode=${n}`),console.log("API Request URL:",a+="&sort=date,asc&includeTBA=yes&includeTest=yes");let u=await fetch(a);if(!u.ok)throw Error(`HTTP error! status: ${u.status}`);let d=await u.json();return console.log("API Response:",d),d}function o(t){document.querySelector(".main").innerHTML=t}let n=1,r="",c="";function a(t,e){let o=document.getElementById("pagination");if(o.innerHTML="",e>0){let a=Math.min(e,52);for(let e=1;e<=a;e++){let a=document.createElement("button");a.innerText=e,a.classList.add("pagBtn"),a.classList.toggle("active",e===t),a.onclick=()=>{n=e,u(r,c)},o.appendChild(a)}}}async function u(t="",d=""){try{r=t,c=d;let u=await e("GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD",t,d,n,12);if(u._embedded&&u._embedded.events){let t;let e=u._embedded.events;t=u.page.totalPages&&u._embedded.events.length>0?Math.min(u.page.totalPages,52):Math.min(Math.ceil(e.length/12),52),function(t){try{let e=document.querySelector(".main");e.innerHTML="";let o=t.map(t=>{let e=t.name||"No title available",o=t.dates?.start?.localDate||"Date not specified",n=t._embedded?.venues[0]?.name||"Location not specified",r=t.images?.[0]?.url||"https://via.placeholder.com/150",c=t.info||t.description||"No description available",a=t.priceRanges?.[0]?.min||"Price not available",u=t.priceRanges?.[0]?.currency||"",d=t.url||"#",i=t._embedded?.attractions?.[0]?.name||"Artist not specified",y=t.priceRanges?t.priceRanges.map(t=>`${t.type}: ${t.min} - ${t.max} ${t.currency}`).join(", "):"Price information not available";return`
        <div class="card" 
          data-title="${e}" 
          data-date="${o}" 
          data-location="${n}" 
          data-image="${r}" 
          data-description="${c}" 
          data-min-price="${a}" 
          data-currency="${u}" 
          data-ticket-url="${d}" 
          data-artist="${i}" 
          data-prices="${y}">
          <img class="cardImg" src="${r}" alt="Event image" />
          <h3 class="cardTitle">${e}</h3>
          <p class="cardDate"><span class="cardDateIcon"> \u{1F5D3}\u{FE0F} </span> ${o}</p>
          <p class="cardLocation"><span class="cardLocIcon"> \u{1F4CD} </span> ${n}</p>
        </div>`});e.innerHTML=o.join(""),document.querySelectorAll(".card").forEach(t=>{t.addEventListener("click",()=>{!function(t){let e=document.createElement("div");e.classList.add("cardFullScreen"),e.innerHTML=`
    <img src="${t.image}" alt="\u{1F387}" class="smallRoundIcon">
    <button class="closeModalBtn">
      <img src="https://raw.githubusercontent.com/ByteMe6/eventBooster/refs/heads/master/src/img/closeModal.png" alt="">
    </button>
    <div class="cardFullscreenMainContent">
      <div class="imgCardFullscreenContainer">
        <img src="${t.image}" alt="\u{1F387}" class="BigPoster">
      </div>
      <div class="cardFullscreenTextContainer">
        <h3 class="cftch3">INFO</h3>
        <p>${t.description||"No description available"}</p>

        <h3 class="cftch3">WHEN</h3>
        <p>${t.date||"Date not specified"}</p>

        <h3 class="cftch3">WHERE</h3>
        <p>${t.location||"Location not specified"}</p>

        <h3 class="cftch3">WHO</h3>
        <p>${t.artist||"Artist not specified"}</p>

        <h3 class="cftch3">PRICES</h3>
        <p>${t.prices||"Price information not available"}</p>

        <a href="${t.ticketUrl}" target="_blank" class="ILoveBootstrapIfuckCodepen">
          BUY TICKETS
        </a>
      </div>
    </div>
  `,document.body.appendChild(e),e.querySelector(".closeModalBtn").addEventListener("click",()=>{document.body.removeChild(e)}),e.addEventListener("click",t=>{t.target===e&&document.body.removeChild(e)})}(t.dataset)})})}catch(t){console.error("Error creating cards:",t),document.querySelector(".main").innerHTML="<p>Failed to load events. Please try again later.</p>"}}(e),a(n,t)}else o('<p class="noEvents">No events found</p>'),a(0,0)}catch(t){console.error("Error fetching events:",t),o('<p class="error">Error loading events. Please try again later.</p>'),a(0,0)}}let d="",i="";document.addEventListener("DOMContentLoaded",()=>{var e;let r;!function(e){let o=document.getElementById("countriesList");o.innerHTML='<option value="">All Countries</option>'+t.map(({countryCode:t,country:e})=>`<option value="${t}">${e}</option>`).join(""),o.addEventListener("change",t=>{e(t.target.value)})}(t=>{i=t,n=1,(d||i)&&u(d,i)});let c=document.querySelector(".searchInput");c.addEventListener("input",(e=()=>{d=c.value,n=1,d||i?u(d,i):(o(""),document.getElementById("pagination").innerHTML="")},function(...t){clearTimeout(r),r=setTimeout(()=>e.apply(this,t),500)})),o(""),document.getElementById("pagination").innerHTML=""})}();
//# sourceMappingURL=index.38ebbf67.js.map