import { openBigPicture } from './fullsize.js';

const picturesContainer = document.querySelector('.pictures'); // Блок с миниатюрами

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const template = document.querySelector('#picture').content.cloneNode(true);
    const pictureElement = template.querySelector('.picture');

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    // Добавляем обработчик клика
    pictureElement.addEventListener('click', () => openBigPicture(photo));

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
