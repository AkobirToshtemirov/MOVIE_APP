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


// start PAGINATION

const prev = document.getElementById('prev')
const current = document.getElementById('current')
const next = document.getElementById('next')

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = '';
let totalPages = 100;



getMovie(API_url)


function getMovie(url) {
  lastUrl = url;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(data.results.length !==0) {
      showMovies(data.results)
      currentPage = data.page;
      nextPage = currentPage + 1;
      prevPage = currentPage - 1;
      totalPages = data.total_pages;
      current.innerText = currentPage;

      if(currentPage <= 1) {
        prev.classList.add('disabled')
        next.classList.remove('disabled')
      } else if(currentPage >= totalPages) {
        prev.classList.remove('disabled')
        next.classList.add('disabled')
      } else {
        prev.classList.remove('disabled')
        next.classList.remove('disabled')
      }

      tags.scrollIntoView({behavior: 'smooth'})

    } else {
      mainTag.innerHTML = '<h1 class="noResult">No Results Found</h1>'
    }
    console.log(data.results);
  })
}


prev.addEventListener('click', () => {
  if(prevPage > 0) {
    pageCall(prevPage)
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages) {
    pageCall(nextPage)
  }
})

function pageCall(page) {
  let urlSplit = lastUrl.split('?');
  let queryParametres = urlSplit[1].split('&');
  let key = queryParametres[queryParametres.length - 1].split('=');
  if(key[0] != 'page') {
    let url = lastUrl + '&page=' + page;
    getMovie(url);
  } else {
    key[1] = page.toString();
    let a = key.join('=');
    queryParametres[queryParametres.length - 1] = a;
    let b = queryParametres.join('&');
    let url = urlSplit[0] + '?' + b;
    getMovie(url);
  }
}


function showMovies(data) {

  mainTag.innerHTML = ''

  data.forEach(movie => {
    const {title, poster_path, vote_average} = movie
    const link = document.createElement('a')
    link.setAttribute('href', `/page/movies.html`)
    // link.setAttribute('target', '_blank')
    const movieElem = document.createElement('div');
    movieElem.classList.add('movie');
    movieElem.innerHTML = `
    <img src="${poster_path? img_url + poster_path: "http://via.placeholder.com/1080x1580"}" alt="${title}">
  
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
  selectedGenre = [];
  setgGenre()
  if(searchTerm) {
    getMovie(search_url + '&query=' + searchTerm)
  }
})


const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

const tags = document.getElementById('tags')
let selectedGenre = [];
setgGenre()

function setgGenre() {
  tags.innerHTML = ``;

  genres.forEach((genre) => {
    const t = document.createElement('div')
    t.classList.add('tag')
    t.id = genre.id
    t.innerText = genre.name
    t.addEventListener('click', () => {
      if(selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if(selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if(id == genre.id) {
              selectedGenre.splice(idx, 1)
            }
          })
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovie(API_url + '&with_genres=' + encodeURI(selectedGenre.join(',')));
      highlightSelection()
    })
    tags.appendChild(t)
  })
}

function highlightSelection() {
  const allTags = document.querySelectorAll('.tag');
  allTags.forEach(tag => {
    tag.classList.remove('highlight')
  })

  clearBtn()

  if(selectedGenre.length != 0) {
    selectedGenre.forEach(id => {
      const highlightedTag = document.getElementById(id)
      highlightedTag.classList.add('highlight')
    })
  }
}


function clearBtn() {
  let clearBtn = document.getElementById('clear')
  if(clearBtn) {
    clearBtn.classList.add('highlightClear')
  } else {
    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlightClear');
    clear.id = 'clear';
    clear.innerText = 'clear X';
    clear.addEventListener('click', () => {
      selectedGenre = [];
      setgGenre();
      getMovie(API_url);
    })
    tags.appendChild(clear)
  }
}

const menuBtn = document.querySelector('.menuBtn')

menuBtn.addEventListener('click', () => {
  if(tags.classList.contains('newResTag')) {
    tags.classList.remove('newResTag')
  } else {
    tags.classList.add('newResTag')
  }
})

console.log(genres);


// created by Akobir Toshtemirov
