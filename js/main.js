//Импорт данных
import { generateData } from './util.js';
import { renderThumbnails } from './thumbnails.js';
import { initUploadModal } from './upload-photo-form.js';

// Генерация данных
const photos = generateData();

// Отрисовываем миниатюры
renderThumbnails(photos);

initUploadModal();

