import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loader = document.querySelector('.loader');

export default function fetchBreeds() {
  loader.classList.add('show');
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data
        .map(element => {
          return `<option value="${element.id}">${element.name}</option>`;
        })
        .join('');
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      console.log('Error', error);
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return `<img src="${data[0].url}" class="img" width="600" height="400">`;
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      console.log('Error', error);
    });
}

export function fetchById(breedId) {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data.find(cat => {
        return cat.id === breedId;
      });
    })
    .catch(error => {
      console.log('Error', error);
    });
}
