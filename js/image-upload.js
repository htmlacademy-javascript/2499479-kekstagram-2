// const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// const fileChooser = document.querySelector('.img-upload__start input[type=file]');
// const preview = document.querySelector('.pictures');

// fileChooser.addEventListener('change', () => {
//   const file = fileChooser.files[0];
//   const fileName = file.name.toLowerCase();

//   const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
//   if (matches) {
//     preview.src = URL.createObjectURL(file);
//   }
// });

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const isValidImageFormat = (file) => {
  if (!file) {
    return false;
  }
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const fileUpload = (fileInput, previewImage, effectsPreviews, onError) => {
  const file = fileInput.files[0];

  if (!isValidImageFormat(file)) {
    onError('Допустимые форматы изображений: JPG, JPEG, PNG');
    fileInput.value = ''; // Очищаем поле загрузки
    return;
  }

  const fileURL = URL.createObjectURL(file);
  previewImage.src = fileURL;

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${fileURL})`;
  });
};

export { fileUpload };
