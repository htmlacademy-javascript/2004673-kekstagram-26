import { checkRange, isEscapeKey } from './util.js';
import { uploadForm, closeUploadOverlay, hideUploadOverlay, unHideOverplay  } from './form.js';
import { sendData } from './api.js';
import { MAX_TAGS, TAGS_REGEX, ERROR_MESSAGES } from './data.js';

const body = document.querySelector('body');
const textHashtag = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onInputEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

textHashtag.addEventListener('keydown', onInputEscKeydown);
textDescription.addEventListener('keydown', onInputEscKeydown);

const formValidation = () => {
  const isHashtagsCorrect = (data) => {
    if(data.length > 0) {
      const tagsArray = data.split(' ');
      return(tagsArray.every((elem) => TAGS_REGEX.test(elem)));
    }
    return true;
  };

  const isHashtagsCountCorrect = (data) => {
    const tagsArray = data.split(' ');
    return(tagsArray.length <= MAX_TAGS);
  };

  const isHashtagDuplicate = (data) => {
    const tagsArray = data.split(' ');
    const uniqueTags = [...new Set(tagsArray.map((elem) => elem.toLowerCase()))];
    return (tagsArray.length === uniqueTags.length);
  };

  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    successClass: 'img-upload__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'img-upload__error'
  });

  pristine.addValidator(
    textHashtag,
    isHashtagsCorrect,
    ERROR_MESSAGES.hashtagsCorrect
  );

  pristine.addValidator(
    textHashtag,
    isHashtagsCountCorrect,
    ERROR_MESSAGES.hashtagsCount
  );

  pristine.addValidator(
    textHashtag,
    isHashtagDuplicate,
    ERROR_MESSAGES.hashtagsUnique
  );

  pristine.addValidator(
    textDescription,
    checkRange,
    ERROR_MESSAGES.commentLength
  );

  let successMessage, successButton, errorMessage, errorButton;

  let removeSuccessMessage = () => {};
  let removeErrorMessage = () => {};

  const blockSubmit = () => {
    submitButton.disabled = true;
    submitButton.textContent = 'Публикую...';
  };

  const unBlockSubmit = () => {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  };

  const onSuccessMessageEscKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      removeSuccessMessage();
    }
  };

  const onErrorMessageEscKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      removeErrorMessage();
      evt.stopPropagation();
    }
  };

  const createSuccessMessage = () => {
    const dataFragment = document.createDocumentFragment();
    successMessage = successTemplate.cloneNode(true);
    dataFragment.appendChild(successMessage);
    body.appendChild(dataFragment);
    successButton = successMessage.querySelector('.success__button');
  };

  const createErrorMessage = () => {
    const dataFragment = document.createDocumentFragment();
    errorMessage = errorTemplate.cloneNode(true);
    dataFragment.appendChild(errorMessage);
    body.appendChild(dataFragment);
    errorButton = errorMessage.querySelector('.error__button');
  };

  const onSuccessMessageClick = (evt) => {
    if(evt.target === successMessage) {
      removeSuccessMessage();
    }
  };

  const onErrorMessageClick = (evt) => {
    if(evt.target === errorMessage) {
      removeErrorMessage();
    }
  };

  const eventToSuccessMessage = () => {
    successButton.addEventListener('click', removeSuccessMessage);
    successMessage.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscKeydown);
  };

  const eventToErrorMessage = () => {
    errorButton.addEventListener('click', removeErrorMessage);
    errorMessage.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscKeydown);
  };

  removeSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  };

  removeErrorMessage = () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
    unHideOverplay();
  };

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      blockSubmit();
      sendData(
        () => {
          unBlockSubmit();
          closeUploadOverlay();
          createSuccessMessage();
          eventToSuccessMessage();
        },
        () => {
          unBlockSubmit();
          hideUploadOverlay();
          createErrorMessage();
          eventToErrorMessage();
        },
        new FormData(uploadForm)
      );
    }
  });
};

export {formValidation};
