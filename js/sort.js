import { DELAY, PHOTOS_TO_SHOW } from './data.js';
import { picturesElement, createThumbnails } from './thumbnails.js';
import { getRandomArrayElement, debounce } from './util.js';

const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersButtonsElement = imgFiltersElement.querySelectorAll('.img-filters__button');

const compareComments = (dataA, dataB) => dataB.comments.length - dataA.comments.length;

const onWindowLoadShowFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const showDefault = (data) => {
  createThumbnails(data);
};

const showRandom = (data) => {
  let results = [];
  while (results.length < PHOTOS_TO_SHOW) {
    results.push(getRandomArrayElement(data));
    results = results.filter((k, i, arr) => arr.indexOf(k) === i);
  }
  createThumbnails(results);
};

const showDiscussed = (data) => {
  let results = data.slice();
  results = results.sort(compareComments);
  createThumbnails(results);
};

const addFilters = (data) => {
  const onFilterButtonClick = (evt) => {
    evt.preventDefault();
    if(!evt.target.classList.contains('img-filters__button--active')) {
      const filterButtonActive = imgFiltersElement.querySelector('.img-filters__button--active');
      filterButtonActive.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }
    const pictures = picturesElement.querySelectorAll('.picture');
    pictures.forEach((elem) => elem.remove());

    if (evt.target.id === 'filter-random') {
      showRandom(data);
      return;
    }
    if (evt.target.id === 'filter-discussed') {
      showDiscussed(data);
      return;
    }
    showDefault(data);
  };
  const debounceOnFilterButtonClick = debounce(onFilterButtonClick, DELAY);
  imgFiltersButtonsElement.forEach((elem) => elem.addEventListener('click', debounceOnFilterButtonClick));
};

export {onWindowLoadShowFilters, addFilters};

