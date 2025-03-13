import { clearComments, renderComments } from './comments-loader.js';

const bigPicture = document.querySelector('.big-picture'); // Окно фото
const closeButton = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрытия

// Функция закрытия окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden'); // Скрываем окно
  document.body.classList.remove('modal-open'); // Возвращаем скролл
  document.removeEventListener('keydown', onEscKeyPress); // Убираем esc
  closeButton.removeEventListener('click', closeBigPicture); // Убираем клик на закрытие
  clearComments(); // Очищаем комментарии
};

// Обработчик закрытия по ESC
function onEscKeyPress(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

// Функция открытия фото
const openBigPicture = (photoData) => {
  bigPicture.querySelector('.big-picture__img img').src = photoData.url;
  bigPicture.querySelector('.likes-count').textContent = photoData.likes;
  bigPicture.querySelector('.social__caption').textContent = photoData.description;

  clearComments(); // Очищаем комментарии перед открытием нового фото
  renderComments(photoData.comments); // Рисуем комментарии

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyPress);
  closeButton.addEventListener('click', closeBigPicture);
};

export { openBigPicture };
