// HTML DOM

const mainInfo = document.querySelector('.mainInfo .container')
const mainBackgroundImg =  document.querySelector('.mainInfo')
let titleMain = document.querySelector('.titleMain')
const actorBlock = document.querySelector('.actorBlock')
const recomondBlock = document.querySelector('.recomondBlock')

// fetch API

const API_key = 'api_key=66d51fdaf1c5dc58a0b0cde186d28671';
const baseURL = 'https://api.themoviedb.org/3';
const API_url =  baseURL +'/discover/movie?sort_by=popularity.desc&' + API_key;
const img_url = 'https://image.tmdb.org/t/p/w500'

// ID MAIN LINK

let mainLink = `https://api.themoviedb.org/3/movie/${localStorage.getItem('filmID')}?api_key=66d51fdaf1c5dc58a0b0cde186d28671&language=en-US`

getMains(mainLink)

function getMains(links) {
  fetch(links)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    showEachMovie(data)
})
}

function showEachMovie(data) {
  
  mainInfo.innerHTML = ``
  
     const {title, vote_average, release_date, poster_path, backdrop_path, id, original_language, overview, genres} = data

     mainBackgroundImg.style.backgroundImage = `url('${img_url + backdrop_path}')`
     titleMain.innerText = title

  mainInfo.innerHTML = `
  <img class="filmIDimg" src="${img_url + poster_path}" alt="${title}">

  <div class="textInfo">
      <h1>${title}</h1>

      <div class="moreInfo">
        <div>
        <div>
        <span class="whiteSpan">Ranking: </span>
        <span class="rank">${vote_average}</span>
        </div>
        <div class="flex">
        <span class="whiteSpan">Year: </span>
        <p class="date">${release_date}</p>  
        </div>
        </div>     

        <span class="genreSpan">GENRES :</span>
        <div class="genreDiv">
        ${genres.map(genre => {
          return `<p>${genre.name}</p>`
        })}
        </div>
      </div>


      <h3>overview</h3>
      <p class="overviewText">${overview}</p>

      <br>

      <div class="btnBlock">
      <button class="watchBtn">
      <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 16 16" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg"><path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path></svg>
      Watch Trailer
  </button>
      </div>
  `


}

let actorApi = `https://api.themoviedb.org/3/movie/${localStorage.getItem('filmID')}/credits?api_key=66d51fdaf1c5dc58a0b0cde186d28671&language=en-US`

getActorLink(actorApi)

function getActorLink(actorLink) {
  fetch(actorLink)
.then(res => res.json())
.then(actor => {
  console.log('actors', actor.cast);
  showActors(actor.cast)
})
}



function showActors(actor) {
  actorBlock.innerHTML = ``

  // const {original_name, profile_path } = actor.cast

actor.forEach(actors => {
  
  let actorBox = document.createElement('div')
  actorBox.classList.add('actorBox')
  let actorImg = document.createElement('img')
  actorImg.classList.add('actorImg')
  actorImg.setAttribute('src', `${img_url + actors.profile_path}`)
  actorBox.appendChild(actorImg)
  let trueName = document.createElement('h3')
  trueName.innerText = actors.original_name
  actorBox.appendChild(trueName)
  
  actorBlock.appendChild(actorBox)
});

}

let recommendApi = `https://api.themoviedb.org/3/movie/${localStorage.getItem('filmID')}/similar?api_key=66d51fdaf1c5dc58a0b0cde186d28671&language=en-US&page=1`

fetch(recommendApi)
.then(res => res.json())
.then(rec => showRec(rec.results))

function showRec (rec) {

  recomondBlock.innerHTML = ``
  
  rec.forEach(film => {
    console.log(film);

    let recBox = document.createElement('div')
    recBox.classList.add('recBox')
    let recImg = document.createElement('img')
    recImg.classList.add('recImg')
    recImg.setAttribute('src', `${img_url + film.poster_path}`)
    recBox.appendChild(recImg)
    


    recomondBlock.appendChild(recBox)
  })

}

