import { getData } from './api.js';
import { createThumbnails } from './thumbnails.js';
import { addFormChangeHandler } from './form.js';
import { addPreviewFunctional } from './picture.js';
import { formValidation } from './validator.js';
import { alert } from './util.js';
import {onWindowLoadShowFilters, addFilters} from './sort.js';

getData (
  (serverData) => {
    createThumbnails(serverData);
    addFilters(serverData);
  },
  () => {
    alert('Не удалось загрузить данные с сервера. Попробуйте позже');
  }
);

window.addEventListener('load', onWindowLoadShowFilters);
addFormChangeHandler();
formValidation();
addPreviewFunctional();
