import { displayFilms } from './Home';
const films = document.querySelector('.gallery_film');
const ul = document.querySelector('.ul');
const menuA = document.querySelectorAll('.menu_a');
const key = '51543c3005cb7c47e497dbf65a114fb5';
const pagination = document.querySelector('.section1');
const header = document.querySelector('header');
const input = document.querySelector('.div');
const messege_error = document.querySelector('.p1');
let currentPage = 1;

ul.addEventListener('click', async (evt) => {
    evt.preventDefault();
    if (evt.target.nodeName !== "A") {
        return;
    }
    if (evt.target.closest('.js_a')) {
        return;
    }
    menuA.forEach(menA => {
        menA.classList.toggle("js_a");
    });
    if (evt.target.textContent.toLowerCase() === "my library") {
        header.classList.add("mylibrary");
        input.style.visibility = 'hidden';
        pagination.style.display = 'none';
        films.innerHTML = '';

        if(localStorage.length === 0) {
            messege_error.style.display = 'block';
            return;
        }
        messege_error.style.display = 'none';
        let allMoviesHtml = ''; 
        
        for (let i = 0; i < localStorage.length; i += 1) {
            const id = localStorage.key(i);
            const value = localStorage.getItem(id);
            console.log(`Ключ: ${id}, Значення: ${value}`);
            const apiUrl = `https://api.themoviedb.org/3/movie/${value}?api_key=${key}`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Помилка запиту до API');
                }

                const data = await response.json();
                allMoviesHtml += createMyLibrary(data);
                films.innerHTML = allMoviesHtml; 
            } catch (error) {
                console.error('Помилка запиту до API:', error);
            }
        }
    } else {
        header.classList.remove("mylibrary");
        input.style.visibility = 'visible';
        messege_error.style.display = 'none';
        displayFilms(currentPage);
        pagination.style.display = 'block';
    }
    
});

function createMyLibrary({ poster_path, title, release_date, id, genres }) {
    const movieYear = new Date(release_date).getFullYear();
    return `
      <div class="film" id="${id}">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
        <h1>${title}</h1>
        <p><span>${genres[0].name}</span>${movieYear}</p>
      </div>`;
}

