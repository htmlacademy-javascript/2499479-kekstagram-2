import { openBigPicture } from './fullsize.js';

const picturesContainer = document.querySelector('.pictures'); // Блок с миниатюрами

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const template = document.querySelector('#picture').content.cloneNode(true);
    const pictureElement = template.querySelector('.picture');

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    // Добавляем обработчик клика
    pictureElement.addEventListener('click', () => openBigPicture(picture));

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const clearPictures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture'); // Ищите по классу ваших миниатюр
  pictures.forEach((picture) => picture.remove());
};

export { renderThumbnails, clearPictures };
