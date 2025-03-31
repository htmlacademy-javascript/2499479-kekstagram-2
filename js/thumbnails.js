import { openBigPicture } from './fullsize.js';
import { throttle } from './throttle.js'; // Предполагается, что throttle вынесен в отдельный модуль

const picturesContainer = document.querySelector('.pictures');

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const template = document.querySelector('#picture').content.cloneNode(true);
    const pictureElement = template.querySelector('.picture');

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    // Ограничиваем частоту кликов
    pictureElement.addEventListener('click', throttle(() => {
      openBigPicture(picture);
    }, 300)); // Задержка 300 мс

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const clearPictures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

export { renderThumbnails, clearPictures };
