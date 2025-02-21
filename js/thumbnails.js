import { generateData } from './util.js';

const renderThumbnails = () => {
  const picturesContainer = document.querySelector('.pictures'); //Контейнер для вставки фото
  const pictureTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture'); //Шаблон элемента

  const photos = generateData(); //Генерация массива фото

  const fragment = document.createDocumentFragment(); //Используем DocumentFragment для оптимизации

  photos.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true); //Клонируем шаблон
    const photo = pictureElement.querySelector('.picture__img');
    photo.src = url; //Подставляем URL изображения
    photo.alt = description; //Подставляем описание

    pictureElement.querySelector('.picture__likes').textContent = likes; //Выводим лайки
    pictureElement.querySelector('.picture__comments').textContent = comments.length; // Колличество комментариев

    fragment.appendChild(pictureElement); // добавляем элемент в DocumentFragment
  });
  picturesContainer.appendChild(fragment); // Добавляем все элементы в контейнер
};

export { renderThumbnails };
