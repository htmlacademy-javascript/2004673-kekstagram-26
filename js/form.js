import { isEscapeKey } from './util.js';
import { scaleToDefault, showPhoto, uploadPreviewElement, hideSlider } from './picture.js';

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelElement = uploadFormElement.querySelector('#upload-cancel');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');

let uploadFileOpenUploadOverlayHandler = () => {};
let closeUploadOverlay = () => {};

const onUploadFormEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onUploadCancelClick = () => {
  closeUploadOverlay();
};

uploadFileOpenUploadOverlayHandler = () => {
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.remove('modal-open');
  showPhoto();
  document.addEventListener('keydown', onUploadFormEscKeydown);
  uploadCancelElement.addEventListener('click', onUploadCancelClick);
  scaleToDefault();
  hideSlider();
};

const hideUploadOverlay = () => {
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const unHideOverlay = () => {
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

closeUploadOverlay  = () => {
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  uploadCancelElement.removeEventListener('click', onUploadCancelClick);
  uploadPreviewElement.removeAttribute('style');
  uploadPreviewElement.removeAttribute('class');
  uploadFormElement.reset();
};

const addFormChangeHandler = () => {
  uploadFileElement.addEventListener('change', uploadFileOpenUploadOverlayHandler);
};

export {uploadFormElement, uploadFileElement, addFormChangeHandler, closeUploadOverlay, unHideOverlay, hideUploadOverlay};
