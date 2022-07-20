const ARRAY_LENGTH = 25;
const DELAY = 500;
const PHOTOS_TO_SHOW = 10;
const MAX_COMMENT_LENGTH = 140;
const ALERT_SHOW_TIME = 10000;
const COMMENTS_TO_SHOW = 5;
const DATA_SOURCE = 'https://26.javascript.pages.academy/kekstagram/data';
const DATA_RECIPIENT = 'https://26.javascript.pages.academy/kekstagram';
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;
const MAX_TAGS = 5;
const TAGS_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const SLIDER_EFFECT_PARAMETERS = {
  'chrome': {range: {min: 0, max: 1}, start: 1, step: 0.1},
  'sepia': {range: {min: 0, max: 1}, start: 1, step: 0.1},
  'marvin': {range: {min: 0, max: 100}, start: 100, step: 0.1},
  'phobos': {range: {min: 0, max: 3}, start: 3, step: 0.1},
  'heat': {range: {min: 1, max: 3}, start: 3, step: 0.1},
};
const FILTER_EFFECT_TYPES = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};
const ERROR_MESSAGES = {
  hashtagsCorrect: 'Хэштег должен начинаться с #, быть длиной от 2 до 20 символов, содержать только буквы и цифры, отделяться от соседей пробелом',
  hashtagsCount: 'Возможно использовать не боле 5 тэгов',
  hashtagsUnique: 'Все хештеги должны быть уникальными',
  commentLength: 'комментарий должен быть не более 140 символов',
};

export {
  MAX_COMMENT_LENGTH,
  ARRAY_LENGTH,
  ALERT_SHOW_TIME,
  COMMENTS_TO_SHOW,
  DATA_RECIPIENT,
  DATA_SOURCE,
  MIN_SCALE_VALUE,
  MAX_SCALE_VALUE,
  DEFAULT_SCALE_VALUE,
  SCALE_VALUE_STEP,
  FILE_TYPES,
  SLIDER_EFFECT_PARAMETERS,
  FILTER_EFFECT_TYPES,
  MAX_TAGS,
  TAGS_REGEX,
  ERROR_MESSAGES,
  PHOTOS_TO_SHOW,
  DELAY};
