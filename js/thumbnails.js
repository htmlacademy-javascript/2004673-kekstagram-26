import { openBigPicture } from './big-picture.js';
import { renderComments } from './comments.js';

const picturesElement = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = (data) => {
  const dataFragment = document.createDocumentFragment();
  const photoElement = pictureTemplate.cloneNode(true);
  const photoImgElement = photoElement.querySelector('.picture__img');
  photoImgElement.src = data.url;
  photoImgElement.alt = data.description;
  photoElement.querySelector('.picture__likes').textContent = data.likes;
  photoElement.querySelector('.picture__comments').textContent = data.comments.length;
  dataFragment.appendChild(photoElement);
  picturesElement.appendChild(dataFragment);
  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComments(data);
    openBigPicture(data);
  });
};

const createThumbnails = (data) => {
  data.forEach((elem) => {
    createThumbnail(elem);
  });
};

export {picturesElement, createThumbnails};
