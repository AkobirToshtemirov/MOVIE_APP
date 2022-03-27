//TMDB API

const API_key = 'api_key=66d51fdaf1c5dc58a0b0cde186d28671';
const baseURL = 'https://api.themoviedb.org/3';
const API_URl =  baseURL +'/discover/movie?sort_by=popularity.desc&' + API_key;

console.log(API_URl);

