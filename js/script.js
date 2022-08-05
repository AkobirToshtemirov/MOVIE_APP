//TMDB API

const API_key = 'api_key=66d51fdaf1c5dc58a0b0cde186d28671';
const baseURL = 'https://api.themoviedb.org/3';
const API_url =  baseURL +'/discover/movie?sort_by=popularity.desc&' + API_key;
const img_url = 'https://image.tmdb.org/t/p/w500'

//search Information

const search_url = baseURL + '/search/movie?'+ API_key;

// HTML DOM main

const mainTag = document.querySelector('#main .container')
const formInput = document.querySelector('#form')
const search = document.querySelector('.search')

getMovie(API_url)

function getMovie(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    showMovies(data.results)
    console.log(data.results);
  })
}

function showMovies(data) {

  mainTag.innerHTML = ''

  data.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie
    const link = document.createElement('a')
    link.setAttribute('href', `/page/movies.html`)
    // link.setAttribute('target', '_blank')
    const movieElem = document.createElement('div');
    movieElem.classList.add('movie');
    movieElem.innerHTML = `
    <img src="${img_url + poster_path}" alt="${title}">
  
    <div class="movieInfo">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>

    
      <button class="watchNow">Watch Now <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 16 16" height="20px" width="30px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path></svg></button>

    `
    link.appendChild(movieElem)
    mainTag.appendChild(link)
    movieElem.addEventListener('click', () => {
      localStorage.setItem('filmID', movie.id)
    })


  });
}

function getColor(vote) {
  if(vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

formInput.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if(searchTerm) {
    getMovie(search_url + '&query=' + searchTerm)
  }
})

// created by Akobir Toshtemirov
