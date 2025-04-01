
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
function updateSliderOptions(effect) {
  const options = {
    'chrome': {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
      filter: (value) => `grayscale(${value})`
    },
    'sepia': {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
      filter: (value) => `sepia(${value})`
    },
    'marvin': {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      filter: (value) => `invert(${value}%)`
    },
    'phobos': {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
      filter: (value) => `blur(${value}px)`
    },
    'heat': {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
      filter: (value) => `brightness(${value})`
    }
  };

  if (options[effect]) {
    sliderElement.noUiSlider.updateOptions({
      range: options[effect].range,
      start: options[effect].start,
      step: options[effect].step
    });

    sliderElement.noUiSlider.on('update', () => {
      const value = sliderElement.noUiSlider.get();
      img.style.filter = options[effect].filter(value);
      effectLevelValue.value = value;
    });
  }
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
    updateSliderOptions(effect); // Используем новую функцию вместо старого кода
  }
};

export { onEffectChange, sliderNone };
