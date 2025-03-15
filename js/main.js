//Импорт данных
import { generateData } from './util.js';
import { renderThumbnails } from './thumbnails.js';
import { initUploadModal } from './upload-photo-form.js';
import { onSmallerClick, onBiggerClick } from './scale.js';
import { onEffectChange } from './slider-effect.js';
// Генерация данных
const photos = generateData();

// Отрисовываем миниатюры
renderThumbnails(photos);

initUploadModal();
onSmallerClick();
onBiggerClick();
document.querySelector('.effects__list').addEventListener('change', onEffectChange);
