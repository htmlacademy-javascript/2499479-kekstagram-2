//Массив случайных имен для авторов комментариев
const names = ['Артём', 'Алексей', 'Семён', 'Светлана', 'Петр', 'Катерина', 'Валера', 'Юлия', 'Елена', 'Илья'];

//Массив сообщений для комментариев
const messages = [
  'Вау!!! Какая красота',
  'Что-то как-то не ОК =/',
  'Удали страницу',
  'Когда деньги вернешь, фотки он постит....',
  'Почему игноришь?',
  'Друг называется, мы когда встретимся????',
  'Ну и фигня конечно, но ладно ЛАЙК)'
];


//Функция для генерации случайных данных
function generateData() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    //Генерация фотографии
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии номер ${i}`,
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
      message: getRandomItem(messages),
      name: getRandomItem(names)
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

// Генерация данных
const photosData = generateData();
console.log(photosData);


