// import noUiSlider from './vendor/noislider/noislider.js';
// import { uploadForm } from './upload-photo-form.js';
// const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
// const sliderElement = imgUploadWrapper.querySelector('.effect-level__slider');
// const effectLevelElement = imgUploadWrapper.querySelector('.effect-level');
// const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
// const img = uploadForm.querySelector('.img-upload__preview img');

// noUiSlider.create(sliderElement, {
//   start: 1,
//   connect: 'lower',
//   range: {
//     min: 0,
//     max: 1,
//   },
//   format: {
//     to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
//     from: (value) => parseFloat(value),
//   }
// });

// sliderElement.noUiSlider.on('update', () => {
//   effectLevelValue.value = sliderElement.noUiSlider.get();
// });

// effectLevelElement.classList.add('hidden');

// const onEffectChange = (evt) => {
//   const effect = evt.target.value;

//   if (effect === 'none') {
//     effectLevelElement.classList.add('hidden');
//     img.style.filter = 'none';
//   } else {
//     effectLevelElement.classList.remove('hidden');
//   }

//   switch (effect) {
//     case 'chrome':
//       sliderElement.noUiSlider.updateOptions({
//         range: { min: 0, max: 1 },
//         start: 1,
//         step: 0.1,
//       });
//       sliderElement.noUiSlider.on('update', () => {
//         img.style.filter = `grayscale(${effectLevelValue.value})`;
//       });
//       break;
//     case 'sepia':
//       sliderElement.noUiSlider.updateOptions({
//         range: { min: 0, max: 1 },
//         start: 1,
//         step: 0.1,
//       });
//       sliderElement.noUiSlider.on('update', () => {
//         img.style.filter = `sepia(${effectLevelValue.value})`;
//       });
//       break;
//     case 'marvin':
//       sliderElement.noUiSlider.updateOptions({
//         range: { min: 0, max: 100 },
//         start: 100,
//         step: 1,
//       });
//       sliderElement.noUiSlider.on('update', () => {
//         img.style.filter = `invert(${effectLevelValue.value}%)`;
//       });
//       break;
//     case 'phobos':
//       sliderElement.noUiSlider.updateOptions({
//         range: { min: 0, max: 3 },
//         start: 3,
//         step: 0.1,
//       });
//       sliderElement.noUiSlider.on('update', () => {
//         img.style.filter = `blur(${effectLevelValue.value}px)`;
//       });
//       break;
//     case 'heat':
//       sliderElement.noUiSlider.updateOptions({
//         range: { min: 1, max: 3 },
//         start: 3,
//         step: 0.1,
//       });
//       sliderElement.noUiSlider.on('update', () => {
//         img.style.filter = `brightness(${effectLevelValue.value})`;
//       });
//       break;
//   }
// };

// export { onEffectChange };
