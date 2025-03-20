//Импорт данных
import { renderThumbnails } from './thumbnails.js';
import { initUploadModal } from './upload-photo-form.js';
import { onSmallerClick, onBiggerClick } from './scale.js';
import { onEffectChange } from './slider-effect.js';
import { closePhotoEditor } from './upload-photo-form.js';
import { setUserFormSubmit } from './upload-photo-form.js';
import { getData, sendData } from './api.js';

// Отрисовываем миниатюры
getData()
  .then((pictures) => {
    renderThumbnails(pictures); // Передаем данные с сервера в функцию отрисовки
  })
  .catch((error) => {
    throw new Error(error);
  });

initUploadModal();
onSmallerClick();
onBiggerClick();
document.querySelector('.effects__list').addEventListener('change', onEffectChange);

setUserFormSubmit(closePhotoEditor);
