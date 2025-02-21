//Импорт данных из файла утил
import { generateData } from './util.js';
import { renderThumbnails } from './thumbnails.js';

// Генерация данных
const photosData = generateData();
photosData();
renderThumbnails();
