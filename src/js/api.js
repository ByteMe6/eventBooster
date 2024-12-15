export async function fetchEvents(apiKey, searchInputValue, selectedCountry) {
  const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
  let url = `${baseUrl}?apikey=${apiKey}&size=200`;

  if (searchInputValue) {
    url += `&keyword=${searchInputValue}`;
  }
  
  if (selectedCountry) {
    url += `&countryCode=${selectedCountry}`;
  }

  const response = await fetch(url);
  return response.json();
}
