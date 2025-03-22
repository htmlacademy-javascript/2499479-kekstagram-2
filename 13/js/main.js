// Импорт данных
import { renderThumbnails } from './thumbnails.js';
import { initUploadModal, setUserFormSubmit, closePhotoEditor } from './upload-photo-form.js';
import { onSmallerClick, onBiggerClick } from './scale.js';
import { onEffectChange } from './slider-effect.js';
import { getData } from './api.js';
import { showMessage } from './util.js';

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
