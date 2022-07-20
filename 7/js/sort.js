import { DELAY, PHOTOS_TO_SHOW } from './data.js';
import { picturesContainer, createThumbnails } from './thumbnails.js';
import { getRandomArrayElement, debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersButtons = imgFilters.querySelectorAll('.img-filters__button');

const compareComments = (dataA, dataB) => dataB.comments.length - dataA.comments.length;

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const showDefault = (data) => {
  createThumbnails(data);
};

const showRandow = (data) => {
  let result = [];
  while (result.length < PHOTOS_TO_SHOW) {
    result.push(getRandomArrayElement(data));
    result = result.filter((k, i, arr) => arr.indexOf(k) === i);
  }
  createThumbnails(result);
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
      const filterButtonActive = imgFilters.querySelector('.img-filters__button--active');
      filterButtonActive.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }
    const pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach((elem) => elem.remove());

    if (evt.target.id === 'filter-random') {
      showRandow(data);
      return;
    }

    if (evt.target.id === 'filter-discussed') {
      showDiscussed(data);
      return;
    }
    showDefault(data);
  };
  const debounceOnFilterButtonClick = debounce(onFilterButtonClick, DELAY);
  imgFiltersButtons.forEach((elem) => elem.addEventListener('click', debounceOnFilterButtonClick));
};

export {showFilters, addFilters};

