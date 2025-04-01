import { renderThumbnails, clearPictures } from './thumbnails.js';
import { debounce } from './debounce.js';
import { MAX_NUMBER_RANDOM_PICTURES, RERENDER_DELAY } from './data.js';

//функция сортировки
const initFilters = (pictures) => {
  const sortBlock = document.querySelector('.img-filters');

  // Показываем блок фильтров (если скрыт)
  sortBlock.classList.remove('img-filters--inactive');

  // Проверка и отображение блока
  if (!sortBlock) {
    throw new Error('Блок фильтров не найден!');
  }
  sortBlock.classList.remove('img-filters--inactive'); // Показываем блок с кнопками сортировки

  // Элементы кнопок
  const sortDefault = sortBlock.querySelector('#filter-default');
  const sortRandom = sortBlock.querySelector('#filter-random');
  const sortDiscussed = sortBlock.querySelector('#filter-discussed');

  // Функция активации кнопки
  const setActiveButton = (activeButton) => {
    [sortDefault, sortRandom, sortDiscussed].forEach((button) => {
      button?.classList.remove('img-filters__button--active');
    });
    activeButton?.classList.add('img-filters__button--active');
  };

  // Обработчики (с дебаунсом и очисткой)

  const debouncedRender = debounce((filteredPictures) => {
    clearPictures();
    renderThumbnails(filteredPictures);
  }, RERENDER_DELAY);

  sortDefault?.addEventListener('click', () => {
    setActiveButton(sortDefault);
    debouncedRender([...pictures]); // Исходный порядок
  });

  sortRandom?.addEventListener('click', () => {
    setActiveButton(sortRandom);
    debouncedRender([...pictures].sort(() => Math.random() - 0.5).slice(0, MAX_NUMBER_RANDOM_PICTURES));
  });

  sortDiscussed?.addEventListener('click', () => {
    setActiveButton(sortDiscussed);
    debouncedRender([...pictures].sort((a, b) => b.comments.length - a.comments.length));
  });
};

export {initFilters};
