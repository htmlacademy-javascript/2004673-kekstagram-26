import { MAX_COMMENT_LENGTH, ALERT_SHOW_TIME } from './data.js';

const getRandomNumber = (min, max) => {
  if ((min < 0) || (max < 0) || (min === max)) {
    return -1;
  }
  return (max > min) ? Math.floor(Math.random() * (max - min + 1) + min)
    : Math.floor(Math.random() * (min - max + 1) + max);
};

const checkRange = (inputtxt) => inputtxt.length <= MAX_COMMENT_LENGTH;

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length -1)];

const clearContainer = (container) => {
  container.innerHTML = '';
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const alert = (message) => {
  const alertElement = document.createElement('p');
  alertElement.style.zIndex = '100';
  alertElement.style.position = 'fixed';
  alertElement.style.left = '0';
  alertElement.style.top = '0';
  alertElement.style.padding = '20px';
  alertElement.style.fontSize = '16px';
  alertElement.style.textAlign = 'center';
  alertElement.style.backgroundColor = '#ff0000';
  alertElement.textContent = message;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (cb, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, checkRange, clearContainer, isEnterKey, isEscapeKey, alert, debounce, getRandomArrayElement};
