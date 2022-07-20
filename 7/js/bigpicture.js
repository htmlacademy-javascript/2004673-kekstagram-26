import { isEscapeKey } from './util.js';

const body = document.querySelector('body');

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img')
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
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscKeydown);
  };

  closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  };

  bigPictureCancel.addEventListener('click', () => {
    closeBigPicture();
  });

  bigPictureImg.src = data.url;
  bigPicture.alt = data.description;
  openPicture();
};

export {openBigPicture};
