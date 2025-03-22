
// Элементы
const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const sliderElement = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevelElement = imgUploadWrapper.querySelector('.effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
const img = document.querySelector('.img-upload__preview img');

// Инициализация слайдера

noUiSlider.create(sliderElement, {
  start: 1,
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },

  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  }
});


// Скрываем слайдер по умолчанию
effectLevelElement.classList.add('hidden');

function sliderNone() {
  effectLevelElement.classList.add('hidden');
  img.style.filter = 'none';
}

// Функция для изменения эффекта
const onEffectChange = (evt) => {
  const effect = evt.target.value;

  // Скрываем или показываем слайдер
  if (effect === 'none') {
    effectLevelElement.classList.add('hidden');
    img.style.filter = 'none';
  } else {
    effectLevelElement.classList.remove('hidden');
  }

  // Обновляем параметры слайдера и применяем фильтры
  if (effect === 'chrome') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    });

    sliderElement.noUiSlider.on('update', () => {
      const value = sliderElement.noUiSlider.get();
      img.style.filter = `grayscale(${value})`;
      effectLevelValue.value = value;
    });
  } else if (effect === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    });

    sliderElement.noUiSlider.on('update', () => {
      const value = sliderElement.noUiSlider.get();
      img.style.filter = `sepia(${value})`;
      effectLevelValue.value = value;
    });
  } else if (effect === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    });

    sliderElement.noUiSlider.on('update', () => {
      const value = sliderElement.noUiSlider.get();
      img.style.filter = `invert(${value}%)`;
      effectLevelValue.value = value;
    });
  } else if (effect === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
    });

    sliderElement.noUiSlider.on('update', () => {
      const value = sliderElement.noUiSlider.get();
      img.style.filter = `blur(${value}px)`;
      effectLevelValue.value = value;
    });
  } else if (effect === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
    });

    sliderElement.noUiSlider.on('update', () => {
      const value = sliderElement.noUiSlider.get();
      img.style.filter = `brightness(${value})`;
      effectLevelValue.value = value;
    });
  }
};

export { onEffectChange, sliderNone };
