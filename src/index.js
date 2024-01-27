import axios from 'axios';
import fetchBreeds from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';
import { fetchById } from './js/cat-api';
axios.defaults.headers.common['x-api-key'] =
  'live_EoW54H3YGthvuy3FZOdNRzDKAo3oTN81nlkgj6hP3P53J8f2vlewIwzUUDCcTun6';

const select = document.querySelector('.breed-select');
const cardInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(cat => {
    select.insertAdjacentHTML('beforeend', cat);
    return cat;
  })
  .then(cat => {
    select.onchange = () => {
      cardInfo.innerHTML = '';
      fetchById(select.value).then(elem => {
        cardInfo.insertAdjacentHTML(
          'beforeend',
          `
        <p>${elem.name}</p>
        <p>${elem.description}</p>
        `
        );
      });
      fetchCatByBreed(select.value).then(elem => {
        cardInfo.insertAdjacentHTML('afterbegin', elem);
      });
    };
  });
