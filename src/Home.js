const films = document.querySelector('.gallery_film');
const pagination = document.querySelector('.pagination');
const form = document.querySelector('.search-form');
const search_error = document.querySelector('.p');
const key = '51543c3005cb7c47e497dbf65a114fb5';
const moviesUrl = 'https://api.themoviedb.org/3/movie/popular';
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';
const keywordUrl = 'https://api.themoviedb.org/3/search/movie';
let currentPage = 1;
let searchKeyword = '';

localStorage.clear();
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  searchKeyword = form.elements.searchQuery.value;
  currentPage = 1;
  currentPageSpan.textContent = currentPage;
  displayFilms(currentPage);
});
// Запит для отримання списку фільмів
export function displayFilms(page) {
  let apiUrl = '';
  if (searchKeyword) {
    apiUrl = `${keywordUrl}?api_key=${key}&page=${page}&query=${searchKeyword}`;
  } else {
    apiUrl = `${moviesUrl}?api_key=${key}&page=${page}`;
  }

  fetch(apiUrl)
    .then((res) => res.json())
    .then((moviesData) => {
      if(moviesData.results.length === 0) {
        search_error.style.display = 'block';
        return;
      }
      search_error.style.display = 'none';
      films.innerHTML = '';
      // Запит для отримання списку жанрів
      fetch(`${genresUrl}?api_key=${key}`)
        .then((res) => res.json())
        .then((genresData) => {
          const genresMap = new Map(); // Створюємо мапу для збереження жанрів
          genresData.genres.forEach((genre) => {
            genresMap.set(genre.id, genre.name);
          });

          const filmsWithGenres = moviesData.results.map((movie) => {
            const movieGenres = movie.genre_ids.map((genreId) => genresMap.get(genreId));
            return { ...movie, genres: movieGenres };
          });

          films.innerHTML = createCards(filmsWithGenres);
          console.log(moviesData);
        })
        .catch((err) => console.error('error:' + err));
    })
    .catch((err) => console.error('error:' + err));
}

function createCards(arr) {
  return arr
    .map(
      ({ poster_path, title, release_date, id, genres }) => {
      const movieYear = new Date(release_date).getFullYear();
      return`
      <div class="film" id="${id}">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
        <h1>${title}</h1>
        <p><span>${genres.join(', ')}</span>${movieYear}</p>
      </div>`;
    })
    .join('');
}

// Отримання кнопок пагінації та обробка їх кліків
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const currentPageSpan = document.getElementById('currentPage');

prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    currentPageSpan.textContent = currentPage;
    displayFilms(currentPage);

    // Прокручуємо сторінку до верху
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Зробить прокрутку плавною
    });
  }
});

nextPageBtn.addEventListener('click', () => {
  currentPage += 1;
  currentPageSpan.textContent = currentPage;
  displayFilms(currentPage);

  // Прокручуємо сторінку до верху
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Зробить прокрутку плавною
  });
});

// Виводимо фільми на першу сторінку при завантаженні сторінки
displayFilms(currentPage);
