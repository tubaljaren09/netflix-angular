// src/app/constants/requests.ts
const apiKey = '6c1da559fcff94b3b34dd3e939e1db51';
export const Requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
  requestPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`,
};
