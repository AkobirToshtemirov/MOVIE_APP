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

        <div class="genreDiv">
        <span class="genreSpan">GENRES :</span>
        <p> ${genres.map(genre => {
          return genre.name
        })} </p>
        
        </div>
      </div>


      <h3>overview</h3>
      <p class="overviewText">${overview}</p>
      <p></p> <i>website is created by <b>Akobir_Dev</b></i> </p>

      <br>

      <div class="btnBlock">
      <button id="watchId" class="watchBtn">
      <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 16 16" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg"><path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path></svg>
      Watch Trailer
  </button>
      </div>
  `

  document.getElementById("watchId").addEventListener('click', () => {
    console.log(id);
    openNav(data)
  })

}

const overlayContent = document.getElementById("overlay-content")

/* Open when someone click's on the span element */
function openNav(data) {
  let id = data.id
  fetch(baseURL + '/movie/' + id + '/videos?' + API_key)
  .then(res => res.json())
  .then(videoData => {
    console.log(videoData);

    if(videoData) {
      document.getElementById("myNav").style.width = "100%";

      if(videoData.results.length > 0) {
        let embed = [];

        videoData.results.forEach((video) => {
          let {key, name, site} = video

          if(site == "YouTube") {
            embed.push(`
            <div class="swiper-slide"><iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            `)
          }

        })

        console.log(embed);

        let content = `
        <h2 style="color: #fff;">${data.original_title}</h2>
        <br>
        
        <div class="swiper mySwiper">
        <div class="swiper-wrapper">
        ${embed.join('')}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>

        `     
        overlayContent.innerHTML = content
      } else {
        overlayContent.innerHTML = `<h1 style="color: #fff;">No Results Found</h1>`
      }
    }
  })


  document.body.style.overflow = 'hidden'
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.body.style.overflowY = 'scroll'
}

const swiperWrapper = document.querySelector('.swiper-wrapper')

// function showVideos() {
//   let embedClasses = document.querySelectorAll('.embed')

//   embedClasses.forEach(item => {
//     let swiperTag = document.createElement('div')
//     swiperTag.classList.add('swiper-slide')
//     swiperTag.appendChild(item)
//   })

//   // embedClasses.forEach((embedTag, idx) => {
//   //   if(activeSlide == idx) {
//   //     embedTag.classList.add('show')
//   //     embedTag.classList.remove('hide')
//   //   } else {
//   //     embedTag.classList.add('hide')
//   //     embedTag.classList.remove('show')
//   //   }
//   // })

// }


let actorApi = `https://api.themoviedb.org/3/movie/${localStorage.getItem('filmID')}/credits?api_key=66d51fdaf1c5dc58a0b0cde186d28671&language=en-US`

getActorLink(actorApi)

function getActorLink(actorLink) {
  fetch(actorLink)
.then(res => res.json())
.then(actor => {
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
    

    let recBox = document.createElement('a')
    recBox.setAttribute('href', `../page/movies.html`)
    recBox.classList.add('recBox')
    let recDiv = document.createElement('div')
    recDiv.classList.add('recDiv')
    recBox.appendChild(recDiv)
    let recImg = document.createElement('img')
    recImg.classList.add('recImg')
    recImg.setAttribute('src', `${img_url + film.poster_path}`)
    recDiv.appendChild(recImg)
    recomondBlock.appendChild(recBox)
    
    recBox.addEventListener('click', () => {
      localStorage.setItem('filmID', film.id)
    })
    
  })

}
