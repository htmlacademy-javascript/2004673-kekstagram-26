import {
  MIN_SCALE_VALUE,
  MAX_SCALE_VALUE,
  DEFAULT_SCALE_VALUE,
  SCALE_VALUE_STEP,
  FILE_TYPES,
  SLIDER_EFFECT_PARAMETERS,
  FILTER_EFFECT_TYPES}
  from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const uploadPreview = uploadForm.querySelector('.img-upload__preview')
  .querySelector('img');
const uploadFile = uploadForm.querySelector('#upload-file');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const effectsList = uploadForm.querySelector('.effects__list');
const uploadEffectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectsPreview = uploadForm.querySelectorAll('.effects__preview');

let scaleValue = DEFAULT_SCALE_VALUE;

const showPhoto = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const photoSrc = URL.createObjectURL(file);
  if(matches) {
    uploadPreview.src = photoSrc;
    effectsPreview.forEach((elem) => {
      elem.style.backgroundImage = `url("${photoSrc}")`;
    });
  }
};

const scaleToDefault = () => {
  uploadPreview.style.transform = `scale(${DEFAULT_SCALE_VALUE/100})`;
  scaleControlValue.value = `${DEFAULT_SCALE_VALUE} %`;
};

const scalePhoto = () => {
  uploadPreview.style.transform = `scale(${scaleValue/100})`;
  scaleControlValue.value = `${scaleValue} %`;
};

const increaseScale = () => {
  if(scaleValue + SCALE_VALUE_STEP <= MAX_SCALE_VALUE) {
    scaleValue += SCALE_VALUE_STEP;
    scalePhoto();
  }
};

const decreaseScale = () => {
  if(scaleValue - SCALE_VALUE_STEP >= MIN_SCALE_VALUE) {
    scaleValue -= SCALE_VALUE_STEP;
    scalePhoto();
  }
};

const addImgPreviewScale = () => {
  scaleToDefault();
  scaleControlSmaller.addEventListener('click', decreaseScale);
  scaleControlBigger.addEventListener('click', increaseScale);
};

const hideSlider = () => {
  uploadEffectLevel.classList.add('hidden');
  effectLevelValue.value = '';
  uploadPreview.style.removeProperty('filter');
};

const showSlider = () => {
  uploadEffectLevel.classList.remove('hidden');
};

noUiSlider.create(effectLevelSlider, {
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
    uploadPreview.style.filter = `${FILTER_EFFECT_TYPES[filter]}(${filterValue}px)`;
    effectLevelValue.value = `${filterValue}px`;
    return;
  }
  if (filter === 'marvin') {
    uploadPreview.style.filter = `${FILTER_EFFECT_TYPES[filter]}(${filterValue}%)`;
    effectLevelValue.value = `${filterValue}%`;
    return;
  }
  uploadPreview.style.filter = `${FILTER_EFFECT_TYPES[filter]}(${filterValue})`;
  effectLevelValue.value = `${filterValue}`;
};

const addEffectPreviewClass = (str) => {
  uploadPreview.classList.add(`effects__preview--${str}`);
};

const addSlider = (data) => {
  if (data.value === 'none') {
    hideSlider();
  } else {
    effectLevelSlider.noUiSlider.updateOptions(SLIDER_EFFECT_PARAMETERS[`${data.value}`]);
    showSlider();
    addEffectPreviewClass(data.value);
    addFilter(data.value, effectLevelSlider.noUiSlider.get());
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    effectLevelSlider.noUiSlider.on('update', () => {
      addFilter(data.value, effectLevelSlider.noUiSlider.get());
    });
  }
};

const addPreviewEffects = () => {
  effectsList.addEventListener('click', (evt) => {
    if(evt.target.name === 'effect') {
      uploadPreview.removeAttribute('class');
      addSlider(evt.target);
    }
  });
};

const addPreviewFunctional = () => {
  addImgPreviewScale();
  addPreviewEffects();
};

export {uploadPreview, showPhoto, scaleToDefault, addPreviewFunctional, hideSlider};
