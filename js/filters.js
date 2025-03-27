const imgFilters = document.querySelector('.img-filters');

const sortDefault = imgFilters.querySelector('#filter-default'); // Кнопка сортировки «по умолчанию»
const sortRandom = imgFilters.querySelector('#filter-random'); // Кнопка сортировки «случайные»
const sortDiscussed = imgFilters.querySelector('#filter-discussed'); // Кнопка сортировки «обсуждаемые»

const sortInput = imgFilters.querySelector('#sort-input'); // Скрытый инпут

// По умолчанию — фотографии в изначальном порядке с сервера.
const sortDefaultClick = (cb) => {
  sortDefault.addEventListener('click', () => {
    sortDefault.classList.add('img-filters__button--active');
    sortRandom.classList.remove('img-filters__button--active');
    sortDiscussed.classList.remove('img-filters__button--active');

    sortInput.value = 'default';
    cb();
  });
};

// Случайные — 10 случайных, не повторяющихся фотографий.
const sortRandomClick = (cb) => {
  sortRandom.addEventListener('click', () => {
    sortDefault.classList.remove('img-filters__button--active');
    sortRandom.classList.add('img-filters__button--active');
    sortDiscussed.classList.remove('img-filters__button--active');

    sortInput.value = 'random';
    cb();
  });
};

// Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
const sortDiscussedClick = (cb) => {
  sortDiscussed.addEventListener('click', () => {
    sortDefault.classList.remove('img-filters__button--active');
    sortRandom.classList.remove('img-filters__button--active');
    sortDiscussed.classList.add('img-filters__button--active');

    sortInput.value = 'discussed';
    cb();
  });
};

// Функция сортировки изображений по id (по умолчанию)
const comparePicturesIds = (pictureA, pictureB) => {
  const rankIdA = pictureA.id;
  const rankIdB = pictureB.id;

  return rankIdA - rankIdB;
};

// Функция сортировки изображений по комментариям (обсуждаемые)
const comparePicturesComments = (pictureA, pictureB) => {
  const rankCommentsA = pictureA.comments.length;
  const rankCommentsB = pictureB.comments.length;

  return rankCommentsB - rankCommentsA;
};

export {imgFilters, sortInput, comparePicturesIds, comparePicturesComments, sortDefaultClick, sortRandomClick, sortDiscussedClick};
