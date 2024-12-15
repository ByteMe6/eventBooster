import { fetchEvents } from './api.js';
import { createCard } from './card.js';
import { updateMainContent } from './dom.js';

export async function searchData(apiKey, searchInputValue, selectedCountry) {
  try {
    const data = await fetchEvents(apiKey, searchInputValue, selectedCountry);
    if (data._embedded && data._embedded.events) {
      createCard(data._embedded.events);
    } else {
      updateMainContent(`<p>No events found. Try different search criteria.</p>`);
    }
  } catch (error) {
    console.error('Error fetching event data:', error);
    updateMainContent(`<p>Error loading events. Please try again later.</p>`);
  }
} 