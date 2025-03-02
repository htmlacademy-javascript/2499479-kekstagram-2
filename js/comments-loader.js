const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const commentCounterBlock = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const socialCommentTemplate = document.querySelector('.social__comment');

// Функция обновления счетчика комментариев
const updateCommentCounter = () => {
  const shownCount = Math.min(currentCount, comments.length);

  // Шаблонная строка
  commentCounterBlock.textContent = `${shownCount} из ${comments.length} комментариев`;
};

// Функция для отрисовки следующей порции комментариев
function renderNextComments() {
  const fragment = document.createDocumentFragment();
  const nextComments = comments.slice(currentCount, currentCount + COUNT_STEP);

  nextComments.forEach((comment) => {
    const commentNode = socialCommentTemplate.cloneNode(true);
    commentNode.querySelector('.social__picture').src = comment.avatar;
    commentNode.querySelector('.social__picture').alt = comment.name;
    commentNode.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(commentNode);
  });

  commentsList.appendChild(fragment);

  currentCount += nextComments.length;
  updateCommentCounter();

  if (currentCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

// Очистка комментариев при открытии нового фото
const clearComments = () => {
  currentCount = 0;
  commentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
};

// Рендер всех комментариев при открытии нового фото
const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  clearComments();
  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments);
};

export { clearComments, renderComments };
