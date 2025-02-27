//Импорт данных
import { generateData } from './util.js';
import { renderThumbnails } from './thumbnails.js';

// Генерация данных
const photos = generateData();

// Отрисовываем миниатюры
renderThumbnails(photos);
