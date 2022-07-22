import { openBigPicture } from './bigpicture.js';
import { renderComments } from './comments.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = (data) => {
  const dataFragment = document.createDocumentFragment();
  const photo = pictureTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = data.url;
  photo.querySelector('.picture__img').alt = data.description;
  photo.querySelector('.picture__likes').textContent = data.likes;
  photo.querySelector('.picture__comments').textContent = data.comments.length;
  dataFragment.appendChild(photo);
  picturesContainer.appendChild(dataFragment);
  photo.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComments(data);
    openBigPicture(data);
  });
};

const createThumbnails = (data) => {
  for(let k = 0; k < data.length; k++) {
    createThumbnail(data[k]);
  }
};

export {picturesContainer, createThumbnails};
