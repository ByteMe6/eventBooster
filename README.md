# EventBooster

Search and discover events worldwide powered by the Ticketmaster API.

**[Live Demo](https://byteme6.github.io/eventBooster/)** · [Русский](./README.ru.md)

## Features

- Search events by keyword with debounced input
- Filter by country
- Pagination (12 events per page)
- Event cards with details
- Modal with full event info
- Sorted by date ascending

## Tech Stack

| | |
|---|---|
| Language | Vanilla JavaScript |
| Bundler | Parcel 2 |
| Templating | Handlebars |
| Styling | SCSS, animate.css |
| HTTP | Axios |
| API | Ticketmaster Discovery API |
| Deploy | GitHub Pages |

## Setup

```bash
git clone https://github.com/ByteMe6/eventBooster
cd eventBooster
npm install
npm start
```

Open [http://localhost:1234](http://localhost:1234)

## Build

```bash
npm run build
```

Output goes to `dist/`.
