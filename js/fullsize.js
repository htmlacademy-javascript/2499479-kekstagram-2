const bigPicture = document.querySelector('.big-picture'); // Окно полноразмерного фото
const closeButton = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрытия
const imageElement = bigPicture.querySelector('.big-picture__img img'); // Само фото
const likesCount = bigPicture.querySelector('.likes-count'); // Лайки
const commentsList = bigPicture.querySelector('.social__comments'); // Список комментариев
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count'); // Показываемые комментарии
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count'); // Всего комментариев
const caption = bigPicture.querySelector('.social__caption'); // Описание фото
const commentCounterBlock = bigPicture.querySelector('.social__comment-count'); // Блок счётчика комментариев
const commentsLoader = bigPicture.querySelector('.comments-loader'); // Кнопка загрузки новых комментариев

// Функция закрытия окна (перенесена выше, до использования)
const closeBigPicture = () => {
  bigPicture.classList.add('hidden'); // Прячем окно
  document.body.classList.remove('modal-open'); // Включаем скролл

};

// Функция закрытия по Esc (тоже перенесена выше)
const onEscKeyPress = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

// Функция для создания комментария
const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.appendChild(img);
  commentElement.appendChild(text);

  return commentElement;
};

// Функция для заполнения окна данными
const fillBigPicture = (photoData) => {
  imageElement.src = photoData.url;
  likesCount.textContent = photoData.likes;
  caption.textContent = photoData.description;

  // Заполняем комментарии
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  //commentsList.innerHTML = '';

  photoData.comments.forEach((comment) => {
    commentsList.appendChild(createCommentElement(comment));
  });

  // Записываем количество комментариев
  commentShownCount.textContent = photoData.comments.length;
  commentTotalCount.textContent = photoData.comments.length;

  // Прячем элементы, с которыми будем работать позже
  commentCounterBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

// Функция для открытия окна
const openBigPicture = (photoData) => {
  fillBigPicture(photoData);
  bigPicture.classList.remove('hidden'); // Показываем окно
  document.body.classList.add('modal-open'); // Отключаем скролл страницы

  // Добавляем обработчики закрытия
  document.addEventListener('keydown', onEscKeyPress);
  closeButton.addEventListener('click', closeBigPicture);
};

// Экспортируем функцию открытия
export { openBigPicture };
