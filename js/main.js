import { renderThumbnails } from './thumbnails.js';
import { initUploadModal, setUserFormSubmit, closePhotoEditor } from './upload-photo-form.js';
import { onSmallerClick, onBiggerClick } from './scale.js';
import { onEffectChange } from './slider-effect.js';
import { getData } from './api.js';
import { showMessage, showRedAlert } from './util.js';
import { initFilters } from './filters.js';

// Загрузка данных с сервера
getData()
  .then((pictures) => {
    // Отрисовываем миниатюры
    renderThumbnails(pictures);
    // Сортировка миниатюр
    initFilters(pictures);
  })
  .catch(() => {
    showRedAlert('Не удалось загрузить фотографии.');
  });

initUploadModal();
onSmallerClick();
onBiggerClick();
document.querySelector('.effects__list').addEventListener('change', onEffectChange);

// Отправка формы
setUserFormSubmit(
  () => { // Успешная отправка
    showMessage('success');
    closePhotoEditor();
  },
  () => { // Ошибка отправки
    showRedAlert('Не удалось отправить форму. Попробуйте ещё раз.');
  }
);
