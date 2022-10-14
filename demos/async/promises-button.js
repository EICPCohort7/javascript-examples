// Placeholder

let separateButton = document.getElementById('separate-button');
let chainedButton = document.getElementById('chained-button');
let asyncAwaitButton = document.getElementById('async-button');

function handleSeparateButton() {
  console.log('1) Fetching data');
  let responsePromise = fetch('http://localhost:8000/movies?_delay=3000');
  let resultsPromise = responsePromise.then((response) => {
    console.log('2) Successful response!', response.status);
    return response.json();
  });

  resultsPromise.then((movies) => {
    console.log('3) Parsed results!', movies);
    let output = document.getElementById('movie-results');
    output.textContent = `There are ${movies.length} movies.`;
  });
  console.log('4) Event handler finished.');
}

// Promise.then(onSuccess, onError)
function handleChainedButton() {
  console.log('1) Chained: Fetching data');
  fetch('http://localhost:8000/movies')
    .then((response) => {
      console.log('2) Chained: Successful response:', response.status);
      return response.json();
    })
    .then((movies) => {
      console.log('3) Chained: Parsed results!', movies);
      let output = document.getElementById('movie-results');
      output.textContent = `There are ${movies.length} movies.`;
    })
    .catch((error) => {
      console.error('Something went wrong:', error);
    });
  console.log('4) Chained: Event handler finished.');
}

async function handleAsyncAwaitButton() {
  console.log('1) async/await: Fetching data');

  // use 'await' in front of a call that returns a Promise
  try {
    let response = await fetch('http://localhost:8000/movies?_delay=2000');
    console.log('2) async/await: Successful response:', response.status);
    let movies = await response.json();
    console.log('3) async/await: Parsed results!', movies);
    let output = document.getElementById('movie-results');
    output.textContent = `There are ${movies.length} movies.`;
  } catch (error) {
    console.error('async/await: Something went wrong!', error);
  }
  console.log('4) async/await: Event handler finished');
}

async function someOtherFunction() {
  let otherResponse = await fetch('...whatever');
  let otherResults = await otherResponse.json();
  // Do something else...
}

separateButton.addEventListener('click', handleSeparateButton);
chainedButton.addEventListener('click', handleChainedButton);
asyncAwaitButton.addEventListener('click', handleAsyncAwaitButton);
