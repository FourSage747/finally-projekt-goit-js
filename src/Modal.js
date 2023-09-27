const films = document.querySelector('.gallery_film');
const modal = document.querySelector('.modal');
const clos = document.querySelector('.close');
const modal_wd = document.querySelector('.modal_wd');
const key = '51543c3005cb7c47e497dbf65a114fb5';

films.addEventListener('click', (evt) => {
    if (evt.target.nodeName !== "IMG") {
        return;
    }
    wind();
    modal_wd.innerHTML = '';
    const filmElement = evt.target.closest('.film');
    const movieId = filmElement.id;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`;
    const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            fetch(videoUrl)
                .then(response => response.json())
                .then(video => {
                    const result = video.results.find(function(element) {
                        return element.type === "Trailer";
                      });
                    const element = result.key;
                    modal_wd.innerHTML = createModal(data, element);
                    const library = document.querySelector('.add_remove')
                    AddRemove(library, filmElement, movieId);
                    console.log(movieId);
                })
                .catch(error => {
                    console.error('Помилка запиту до API:', error);
                });
        })
        .catch(error => {
            console.error('Помилка запиту до API:', error);
        });
});
clos.addEventListener('click', wind);

function wind () {
    modal.classList.toggle("open");
}

function AddRemove (library, filmElement, movieId) {
    const id = localStorage.getItem(movieId);
    if (id) {
        filmElement.classList.add("my_library");
        library.classList.add("active");
        library.textContent = "remove from my library";
    }
    library.addEventListener('click', () => {
        library.classList.toggle("active");
        filmElement.classList.toggle("my_library");
        if (filmElement.closest('.my_library')) {
            library.textContent = "remove from my library";
            localStorage.setItem(movieId, movieId);
        }
        else {
            library.textContent = "add to my library";
            localStorage.removeItem(movieId);
        }
    });
}

function createModal ({ poster_path, title, vote_average, vote_count, popularity, original_title, overview, genres }, element) {
    const genre = genres[0].name;
    return `
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
        <div class="modal_wd1">
            <h1>${title}</h1>
            <div class="modal_wd2">
                <ul>
                    <li>Vote / Votes</li>
                    <li>Popularity</li>
                    <li>Original Title</li>
                    <li>Genre</li>
                </ul>
                <ul>
                    <li>${vote_average} / ${vote_count}</li>
                    <li>${popularity}</li>
                    <li>${original_title}</li>
                    <li>${genre}</li>
                </ul>
            </div>
            <span>About</span>
            <p>${overview}</p>
            <button type="button" class="add_remove">add to my library</button>
        </div>
        <iframe width="240" src="https://www.youtube.com/embed/${element}" frameborder="0" allowfullscreen></iframe>
    `;
}