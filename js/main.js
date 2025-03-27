// Импорт данных
import { renderThumbnails } from './thumbnails.js';
import { initUploadModal, setUserFormSubmit, closePhotoEditor } from './upload-photo-form.js';
import { onSmallerClick, onBiggerClick } from './scale.js';
import { onEffectChange } from './slider-effect.js';
import { getData } from './api.js';
import { showMessage } from './util.js';
import './filters.js';
import {debounce} from './debounce.js';
import {sortDefaultClick, sortRandomClick, sortDiscussedClick} from './filters.js';
import {renderPictures} from './pictures.js';

const RERENDER_DELAY = 500; // Задержка перерисовки изображений

getData((pictures) => {
  renderPictures(pictures);
  initUploadModal(pictures);

  sortDefaultClick(debounce(
    () => renderPictures(pictures),
    RERENDER_DELAY,
  ));

  sortRandomClick(debounce(
    () => renderPictures(pictures),
    RERENDER_DELAY,
  ));

  sortDiscussedClick(debounce(
    () => renderPictures(pictures),
    RERENDER_DELAY,
  ));
});

// Отрисовываем миниатюры
getData()
  .then((pictures) => {
    renderThumbnails(pictures); // Передаем данные с сервера в функцию отрисовки
  })
  .catch((error) => {
    throw new Error(error);
  });

//форма загрузки фото
initUploadModal();

//масштабирования изображения
onSmallerClick();
onBiggerClick();

//эффекты для изображения
document.querySelector('.effects__list').addEventListener('change', onEffectChange);

//отправка формы
setUserFormSubmit(() => {
  showMessage(); // Показываем сообщение об успехе
  closePhotoEditor(); // Закрываем форму редактирования
});
