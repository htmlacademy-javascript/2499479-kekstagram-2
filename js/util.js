import {getData} from './data.js';

const { NAMES, MESSAGES, DESCRIPTIONS } = getData();
const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//Функция для генерации случайных данных
function generateData() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    //Генерация фотографии
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomItem(DESCRIPTIONS),
      likes: getRandomInt(15, 200),
      comments: generateComments()
    };
    photos.push(photo);
  }
  return photos;
}

//Функция для генерации случайных комментариев
function generateComments() {
  const numComments = getRandomInt(0, 30);
  const comments = [];

  for (let i = 0; i < numComments; i++) {
    const comment = {
      id: getRandomInt(1, 1000),
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomItem(MESSAGES),
      name: getRandomItem(NAMES)
    };
    comments.push(comment);
  }

  return comments;
}


// Функция для генерации случайного числа в диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для выбора случайного элемента из массива
function getRandomItem(randomElement) {
  return randomElement[Math.floor(Math.random() * randomElement.length)];
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export { generateData, isEscapeKey, showAlert };
