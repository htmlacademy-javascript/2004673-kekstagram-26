import {
  MIN_SCALE_VALUE,
  MAX_SCALE_VALUE,
  DEFAULT_SCALE_VALUE,
  SCALE_VALUE_STEP,
  FILE_TYPES,
  SLIDER_EFFECT_PARAMETERS,
  FILTER_EFFECT_TYPES}
  from './data.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const scaleControlSmallerElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = uploadFormElement.querySelector('.scale__control--value');
const uploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview')
  .querySelector('img');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const effectLevelValueElement = uploadFormElement.querySelector('.effect-level__value');
const effectsListElement = uploadFormElement.querySelector('.effects__list');
const uploadEffectLevelElement = uploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = uploadFormElement.querySelector('.effect-level__slider');
const effectsPreviewElement = uploadFormElement.querySelectorAll('.effects__preview');

let scaleValue = DEFAULT_SCALE_VALUE;

const showPhoto = () => {
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const photoSrc = URL.createObjectURL(file);
  if(matches) {
    uploadPreviewElement.src = photoSrc;
    effectsPreviewElement.forEach((elem) => {
      elem.style.backgroundImage = `url("${photoSrc}")`;
    });
  }
};

const scaleToDefault = () => {
  uploadPreviewElement.style.transform = `scale(${DEFAULT_SCALE_VALUE/100})`;
  scaleControlValueElement.value = `${DEFAULT_SCALE_VALUE} %`;
};

const scalePhoto = () => {
  uploadPreviewElement.style.transform = `scale(${scaleValue/100})`;
  scaleControlValueElement.value = `${scaleValue} %`;
};

const onImgPreviewIncreaseScale = () => {
  if(scaleValue + SCALE_VALUE_STEP <= MAX_SCALE_VALUE) {
    scaleValue += SCALE_VALUE_STEP;
    scalePhoto();
  }
};

const onImgPreviewDecreaseScale = () => {
  if(scaleValue - SCALE_VALUE_STEP >= MIN_SCALE_VALUE) {
    scaleValue -= SCALE_VALUE_STEP;
    scalePhoto();
  }
};

const addImgPreviewScale = () => {
  scaleToDefault();
  scaleControlSmallerElement.addEventListener('click', onImgPreviewDecreaseScale);
  scaleControlBiggerElement.addEventListener('click', onImgPreviewIncreaseScale);
};

const hideSlider = () => {
  uploadEffectLevelElement.classList.add('hidden');
  effectLevelValueElement.value = '';
  uploadPreviewElement.style.removeProperty('filter');
};

const showSlider = () => {
  uploadEffectLevelElement.classList.remove('hidden');
};

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if(Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

const addFilter = (filter, filterValue) => {
  if (filter === 'phobos') {
    uploadPreviewElement.style.filter = `${FILTER_EFFECT_TYPES[filter]}(${filterValue}px)`;
    effectLevelValueElement.value = `${filterValue}px`;
    return;
  }
  if (filter === 'marvin') {
    uploadPreviewElement.style.filter = `${FILTER_EFFECT_TYPES[filter]}(${filterValue}%)`;
    effectLevelValueElement.value = `${filterValue}%`;
    return;
  }
  uploadPreviewElement.style.filter = `${FILTER_EFFECT_TYPES[filter]}(${filterValue})`;
  effectLevelValueElement.value = `${filterValue}`;
};

const addEffectPreviewClass = (str) => {
  uploadPreviewElement.classList.add(`effects__preview--${str}`);
};

const addSlider = (data) => {
  if (data.value === 'none') {
    hideSlider();
  } else {
    effectLevelSliderElement.noUiSlider.updateOptions(SLIDER_EFFECT_PARAMETERS[`${data.value}`]);
    showSlider();
    addEffectPreviewClass(data.value);
    addFilter(data.value, effectLevelSliderElement.noUiSlider.get());
    effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
    effectLevelSliderElement.noUiSlider.on('update', () => {
      addFilter(data.value, effectLevelSliderElement.noUiSlider.get());
    });
  }
};

const addPreviewEffects = () => {
  effectsListElement.addEventListener('click', (evt) => {
    if(evt.target.name === 'effect') {
      uploadPreviewElement.removeAttribute('class');
      addSlider(evt.target);
    }
  });
};

const addPreviewFunctional = () => {
  addImgPreviewScale();
  addPreviewEffects();
};

export {uploadPreviewElement, showPhoto, scaleToDefault, addPreviewFunctional, hideSlider};
