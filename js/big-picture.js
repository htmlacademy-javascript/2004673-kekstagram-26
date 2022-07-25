import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img')
  .querySelector('img');

const openBigPicture = (data) => {

  let closeBigPicture = () => {};

  const onBigPictureEscKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  const openPicture = () => {
    bigPictureElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscKeydown);
  };

  closeBigPicture = () => {
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  };

  bigPictureCancelElement.addEventListener('click', () => {
    closeBigPicture();
  });

  bigPictureImgElement.src = data.url;
  bigPictureElement.alt = data.description;
  openPicture();
};

export {openBigPicture};
