// Импортируем необходимые функции из других модулей
import { uploadForm } from './upload-photo-form.js';
// Константа, определяющая шаг изменения масштаба изображения
const SCALE_STEP = 0.25;
const MAX_SCALE = 1;
const MIN_SCALE = 0.25;

// Находим элементы формы загрузки изображения в DOM
const img = uploadForm.querySelector('.img-upload__preview img'); // Превью изображения
const smaller = uploadForm.querySelector('.scale__control--smaller'); // Кнопка уменьшения масштаба
const bigger = uploadForm.querySelector('.scale__control--bigger'); // Кнопка увеличения масштаба
const scaleControl = uploadForm.querySelector('.scale__control--value'); // Поле с текущим масштабом


// Переменная для хранения текущего масштаба изображения (по умолчанию 1)
let scale = 1;

const updateScale = () => {
  img.style.transform = `scale(${scale})`;
  scaleControl.value = `${scale * 100}%`; // Обновляем значение в поле масштаба
};

// Функция уменьшения масштаба изображения
const onSmallerClick = () => {
  if (scale > MIN_SCALE) { // Проверяем, что масштаб больше минимального значения
    scale -= SCALE_STEP; // Уменьшаем масштаб
    updateScale();
  }
};

// Функция увеличения масштаба изображения

const onBiggerClick = () => {
  if (scale < MAX_SCALE) {
    scale += SCALE_STEP; // Увеличиваем масштаб
    updateScale();
  }
};
// Добавляем обработчик клика по кнопке уменьшения масштаба
smaller.addEventListener('click', onSmallerClick);

// Добавляем обработчик клика по кнопке увеличения масштаба
bigger.addEventListener('click', onBiggerClick);

export { onSmallerClick, onBiggerClick };
