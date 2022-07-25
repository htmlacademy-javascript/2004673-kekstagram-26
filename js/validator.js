import { checkRange, isEscapeKey } from './util.js';
import { uploadFormElement, closeUploadOverlay, hideUploadOverlay, unHideOverlay } from './form.js';
import { sendData } from './api.js';
import { MAX_TAGS, TAGS_REGEX, ERROR_MESSAGES } from './data.js';

const bodyElement = document.querySelector('body');
const textHashtagElement = uploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

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

textHashtagElement.addEventListener('keydown', onInputEscKeydown);
textDescriptionElement.addEventListener('keydown', onInputEscKeydown);

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

  const pristine = new Pristine(uploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__item--invalid',
    successClass: 'img-upload__item--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'p',
    errorTextClass: 'img-upload__error'
  });

  pristine.addValidator(
    textHashtagElement,
    isHashtagsCorrect,
    ERROR_MESSAGES.hashtagsCorrect
  );

  pristine.addValidator(
    textHashtagElement,
    isHashtagsCountCorrect,
    ERROR_MESSAGES.hashtagsCount
  );

  pristine.addValidator(
    textHashtagElement,
    isHashtagDuplicate,
    ERROR_MESSAGES.hashtagsUnique
  );

  pristine.addValidator(
    textDescriptionElement,
    checkRange,
    ERROR_MESSAGES.commentLength
  );

  let successMessage, successButton, errorMessage, errorButton;

  let onSuccessMessageRemoveSuccessMessage = () => {};
  let onErrorMessageRemoveErrorMessage = () => {};

  const blockSubmit = () => {
    submitButtonElement.disabled = true;
    submitButtonElement.textContent = 'Публикую...';
  };

  const unBlockSubmit = () => {
    submitButtonElement.disabled = false;
    submitButtonElement.textContent = 'Опубликовать';
  };

  const onSuccessMessageEscKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      onSuccessMessageRemoveSuccessMessage();
    }
  };

  const onErrorMessageEscKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      onErrorMessageRemoveErrorMessage();
      evt.stopPropagation();
    }
  };

  const createSuccessMessage = () => {
    const dataFragment = document.createDocumentFragment();
    successMessage = successTemplate.cloneNode(true);
    dataFragment.appendChild(successMessage);
    bodyElement.appendChild(dataFragment);
    successButton = successMessage.querySelector('.success__button');
  };

  const createErrorMessage = () => {
    const dataFragment = document.createDocumentFragment();
    errorMessage = errorTemplate.cloneNode(true);
    dataFragment.appendChild(errorMessage);
    bodyElement.appendChild(dataFragment);
    errorButton = errorMessage.querySelector('.error__button');
  };

  const onSuccessMessageClick = (evt) => {
    if(evt.target === successMessage) {
      onSuccessMessageRemoveSuccessMessage();
    }
  };

  const onErrorMessageClick = (evt) => {
    if(evt.target === errorMessage) {
      onErrorMessageRemoveErrorMessage();
    }
  };

  const addEventToSuccessMessage = () => {
    successButton.addEventListener('click', onSuccessMessageRemoveSuccessMessage);
    successMessage.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEscKeydown);
  };

  const addEventToErrorMessage = () => {
    errorButton.addEventListener('click', onErrorMessageRemoveErrorMessage);
    errorMessage.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEscKeydown);
  };

  onSuccessMessageRemoveSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  };

  onErrorMessageRemoveErrorMessage = () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
    unHideOverlay();
  };

  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      blockSubmit();
      sendData(
        () => {
          unBlockSubmit();
          closeUploadOverlay();
          createSuccessMessage();
          addEventToSuccessMessage();
        },
        () => {
          unBlockSubmit();
          hideUploadOverlay();
          createErrorMessage();
          addEventToErrorMessage();
        },
        new FormData(uploadFormElement)
      );
    }
  });
};

export {formValidation};
