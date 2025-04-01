import { SCALE_STEP, MAX_SCALE, MIN_SCALE } from './data.js';

// Находим элементы формы загрузки изображения в DOM
const img = document.querySelector('.img-upload__preview img'); // Превью изображения
const smaller = document.querySelector('.scale__control--smaller'); // Кнопка уменьшения масштаба
const bigger = document.querySelector('.scale__control--bigger'); // Кнопка увеличения масштаба
const scaleControl = document.querySelector('.scale__control--value'); // Поле с текущим масштабом


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

const resetScale = () => {
  scale = 1; // Сбрасываем масштаб к значению по умолчанию
  updateScale(); // Обновляем отображение
};

export { onSmallerClick, onBiggerClick, resetScale };
