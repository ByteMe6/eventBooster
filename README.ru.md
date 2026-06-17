# EventBooster

Поиск и просмотр мероприятий по всему миру на основе Ticketmaster API.

**[Демо](https://byteme6.github.io/eventBooster/)** · [English](./README.md)

## Возможности

- Поиск событий по ключевому слову с debounce
- Фильтрация по стране
- Пагинация (12 событий на страницу)
- Карточки событий с деталями
- Модальное окно с полной информацией
- Сортировка по дате

## Стек

| | |
|---|---|
| Язык | Vanilla JavaScript |
| Сборщик | Parcel 2 |
| Шаблоны | Handlebars |
| Стили | SCSS, animate.css |
| HTTP | Axios |
| API | Ticketmaster Discovery API |
| Деплой | GitHub Pages |

## Установка

```bash
git clone https://github.com/ByteMe6/eventBooster
cd eventBooster
npm install
npm start
```

Открыть [http://localhost:1234](http://localhost:1234)

## Сборка

```bash
npm run build
```

Результат — в папке `dist/`.
