const extensions = ['jpg', 'jpeg', 'png'];

const isValidImageFormat = (file) => {
  if (!file) {
    return false;
  }
  const fileName = file.name.toLowerCase();
  return extensions.some((type) => fileName.endsWith(type));
};

const uploadFile = (fileInput, previewImage, effectsPreviews, onError) => {
  const file = fileInput.files[0];

  if (!isValidImageFormat(file)) {
    onError('Допустимые форматы изображений: JPG, JPEG, PNG');
    fileInput.value = ''; // Очищаем поле загрузки
    return false;
  }

  const fileURL = URL.createObjectURL(file);
  previewImage.src = fileURL;

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${fileURL})`;
  });
  return true;
};

export { uploadFile };
