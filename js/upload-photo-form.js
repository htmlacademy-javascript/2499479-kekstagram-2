import { isEscapeKey, showRedAlert, showAlert, showMessage } from './util.js';
import { sendData } from './api.js';
import { sliderNone } from './slider-effect.js';
import { fileUpload } from './image-upload.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const imagePreview = photoEditorForm.querySelector('.img-upload__preview img');
const effectsPreviews = photoEditorForm.querySelectorAll('.effects__preview');

const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error',
  errorTextTag: 'div',
});

// Функция обновления состояния кнопки отправки
const updateSubmitButtonState = () => {
  const isValid = pristine.validate();
  submitButton.disabled = !isValid;
};

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

// Обработчик клика по кнопке закрытия редактора
const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};

// Обработчик закрытия редактора по нажатию клавиши Escape
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

// Инициализация модального окна загрузки фото
const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    if (fileUpload(uploadFileControl, imagePreview, effectsPreviews, showAlert)) {
      photoEditorForm.classList.remove('hidden');
    }
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
    updateSubmitButtonState();
  });
};

// Закрытие редактора фото
function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  pristine.reset();
  sliderNone();
  updateSubmitButtonState();
}

// Блокировка кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

// Разблокировка кнопки отправки
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Валидатор для хэштегов с подробными сообщениями об ошибках
pristine.addValidator(hashtagInput, (value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return true;
  }

  const hashtags = trimmedValue.split(/\s+/).filter((item) => item !== '');
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  if (hashtags.length > 5) {
    return false;
  }

  const lowerCaseTags = hashtags.map((item) => item.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);
  if (uniqueTags.size !== hashtags.length) {
    return false;
  }

  return hashtags.every((hashtag) => {
    if (hashtag === '#') {
      return false;
    }
    return hashtagRegex.test(hashtag);
  });
}, (value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return '';
  }

  const hashtags = trimmedValue.split(/\s+/).filter((item) => item !== '');

  if (hashtags.length > 5) {
    return 'Нельзя указать больше 5 хэштегов!';
  }

  const lowerCaseTags = hashtags.map((item) => item.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);
  if (uniqueTags.size !== hashtags.length) {
    return 'Хэштеги не должны повторяться!';
  }

  for (const hashtag of hashtags) {
    if (hashtag === '#') {
      return 'Хэштег не может быть только #!';
    }

    if (hashtag[0] !== '#') {
      return 'Хэштег должен начинаться с #!';
    }

    if (hashtag.length > 20) {
      return 'Максимальная длина хэштега - 20 символов!';
    }

    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)) {
      return 'Недопустимые символы в хэштеге!';
    }
  }

  return '';
});

// Валидатор для комментария
pristine.addValidator(commentInput, (value) => value.length <= 140, 'Комментарий не должен превышать 140 символов!');

let isFormSubmitting = false;

// Функция обработки отправки формы
const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isFormSubmitting) {
      return;
    }

    const isValid = pristine.validate();

    if (isValid) {
      isFormSubmitting = true;
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showRedAlert(err.message);
        })
        .finally(() => {
          unblockSubmitButton();
          isFormSubmitting = false;
        });
    } else {
      // Принудительно показываем все ошибки при попытке отправки
      updateSubmitButtonState();
    }
  });
};

// Настройка обработчика успешной отправки формы
setUserFormSubmit(() => {
  showMessage();
  closePhotoEditor();
});

// Обновление состояния при изменении полей ввода
hashtagInput.addEventListener('input', () => {
  pristine.validate(hashtagInput);
  updateSubmitButtonState();

  // Принудительно показываем ошибку, если она есть
  const errorElement = hashtagInput
    .closest('.img-upload__field-wrapper')
    .querySelector('.pristine-error');

  if (errorElement) {
    errorElement.style.display = 'block';
    errorElement.style.visibility = 'visible';
  }
});

commentInput.addEventListener('input', () => {
  pristine.validate(commentInput);
  updateSubmitButtonState();
});

// Запрет закрытия окна при вводе текста в хэштеги или комментарий
hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

export { setUserFormSubmit, initUploadModal, closePhotoEditor };
