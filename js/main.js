import { renderThumbnails } from './thumbnails.js';
import { initUploadModal, setUserFormSubmit, closePhotoEditor } from './upload-photo-form.js';
import { onSmallerClick, onBiggerClick } from './scale.js';
import { onEffectChange } from './slider-effect.js';
import { getData } from './api.js';
import { showMessage } from './util.js';
import { initFilters } from './filters.js';

// Получаем данные с сервера и инициализируем приложение
getData()
  .then((pictures) => {
    // Отрисовываем миниатюры
    renderThumbnails(pictures);
    // Сортировка миниатюр
    initFilters(pictures);

  })
  .catch((error) => {
    showMessage(error, 'Не удалось загрузить фотографии');
  });

initUploadModal(); // Форма загрузки фото
onSmallerClick(); // Масштабирование изображения -
onBiggerClick(); // Масштабирование изображения +

document.querySelector('.effects__list').addEventListener('change', onEffectChange); // Эффекты для изображения

// Отправка формы
setUserFormSubmit(() => {
  showMessage('success'); // Показываем сообщение об успехе
  closePhotoEditor(); // Закрываем форму редактирования
});
