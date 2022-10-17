/* global axios */
// Axios is a global, not ideal for the real world, good enough for this demo
let fetchButton = document.getElementById('fetch-button');
let axiosButton = document.getElementById('axios-button');
let apiHeader = document.getElementById('api-header');

async function handleFetchButton() {
  apiHeader.textContent = 'Fetching with fetch()';
  try {
    let response = await fetch('http://localhost:8000/movies');
    // fetch() does not throw an error if the response code is an error (>= 400)
    if (response.ok) {
      let movies = await response.json();
      renderMovies(movies);
    } else {
      if (response.status >= 400) {
        // Not required, just simpler for this example
        throw new Error('Bad response code:', response.status);
      }
    }
  } catch (error) {
    console.error('fetch: Something went wrong:', error);
  }
}

async function handleAxiosButton() {
  apiHeader.textContent = 'Fetching with the Axios library';
  try {
    let movies = await axios.get('http://localhost:8000/movies');
    renderMovies(movies.data);
  } catch (error) {
    // Could be an Axios error or a regular error
    // Axios errors have a response object available to query for details
    if (error.response) {
      // HTTP Error
      console.error('Axios: bad HTTP response:', error.response.status);
    } else {
      console.error('Axios: bad network error:', error);
    }
  }
}

function renderMovies(movies) {
  let tableBody = document.getElementById('movie-table');
  let rows = [];
  for (let movie of movies) {
    let tr = document.createElement('tr');
    tr.insertAdjacentHTML(
      'beforeend',
      `<td>${movie.title}</td><td>${movie.year}</td><td>${movie.rating}</td>`
    );
    rows.push(tr);
  }
  tableBody.replaceChildren(...rows);
}

fetchButton.addEventListener('click', handleFetchButton);
axiosButton.addEventListener('click', handleAxiosButton);
