export let apiKey = 'GuFBpVgQ1pTfyV0ZT9FA4QxjKXxhnZzD';

export async function fetchEvents(apiKey, searchInputValue, selectedCountry, page = 1, size = 12) {
  const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
  let url = `${baseUrl}?apikey=${apiKey}&size=${size}&page=${page - 1}`;

  if (searchInputValue) {
    const encodedSearch = encodeURIComponent(searchInputValue.trim());
    url += `&keyword=${encodedSearch}`;
  }

  if (selectedCountry) {
    url += `&countryCode=${selectedCountry}`;
  }

  url += '&sort=date,asc&includeTBA=yes&includeTest=yes';

  console.log('API Request URL:', url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log('API Response:', data);
  return data;
}

