import { isEscapeKey } from './util.js';
import { scaleToDefault, showPhoto, uploadPreview, hideSlider } from './picture.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('#upload-cancel');
const uploadFile = uploadForm.querySelector('#upload-file');

let openUploadOverlay = () => {};
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

openUploadOverlay = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.remove('modal-open');
  showPhoto();
  document.addEventListener('keydown', onUploadFormEscKeydown);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  scaleToDefault();
  hideSlider();
};

const hideUploadOverlay = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const unHideOverplay = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

closeUploadOverlay  = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  uploadPreview.removeAttribute('style');
  uploadPreview.removeAttribute('class');
  uploadForm.reset();
};

const addFormChangeHandler = () => {
  uploadFile.addEventListener('change', openUploadOverlay);
};

export {uploadForm, uploadFile, addFormChangeHandler, closeUploadOverlay, unHideOverplay, hideUploadOverlay};
