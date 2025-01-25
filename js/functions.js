//Первая функция

const checkLength = (lineText, maxLength) => {
  console.log('Длина строки: ' + lineText.length + ' символов');
  if (lineText.length > maxLength) {
    return console.log('Строка превышает максимальное колличество символов');
  }
  return lineText.length <= maxLength;
};

console.log('другая строка');
console.log(checkLength('другая строка', 20));

//Вторая функция (свой вариант)

const testPolydromString = (charset) => {
  charset = 'Лёша на полке клопа нашёл ';
  const normalCharset = charset.replaceAll(' ', '').toLowerCase();
  const reversCharset = normalCharset.split('').reverse().join('');
  return normalCharset === reversCharset;
};
console.log(testPolydromString(''));

//Вторая функция (вариант по дз)

const testPolydrom = (charsetPolydrom) => {
  let normalPolydrom = charsetPolydrom.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < normalPolydrom.length / 2; i++) {
    if (normalPolydrom[i] !== normalPolydrom[normalPolydrom.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

console.log(testPolydrom("Лёша на полке клопа нашёл"));
console.log(testPolydrom("Просто текст"));
