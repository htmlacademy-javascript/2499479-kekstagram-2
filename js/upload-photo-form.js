import { isEscapeKey, showAlert, showMessage } from './util.js';
import { sendData } from './api.js';
import { sliderNone } from './slider-effect.js';

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
});

// Функция для проверки формата изображения
const isValidImageFormat = (fileName) => {
  const allowedFormats = ['.jpg', '.jpeg', '.png'];
  return allowedFormats.some((format) => fileName.toLowerCase().endsWith(format));
};

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

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};

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

const showUploadedImage = () => {
  const file = uploadFileControl.files[0];
  if (!file) {
    return;
  }

  // Проверяем формат файла
  if (!isValidImageFormat(file.name)) {
    showAlert('Допустимые форматы изображений: JPG, JPEG, PNG');
    uploadForm.reset(); // Сбрасываем форму, если формат не подходит
    return;
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imagePreview.src = reader.result;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });
  });

  reader.readAsDataURL(file);
};

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    showUploadedImage();
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
    updateSubmitButtonState();
  });
};

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  pristine.reset();
  sliderNone();
  updateSubmitButtonState();
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Валидатор для хэштегов
pristine.addValidator(hashtagInput, (value) => {
  if (!value || !value.trim()) {
    return true;
  }

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

  if (hashtags.length > 5) {
    return false;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return hashtags.every((tag) => {
    if (tag === '#') {
      return false;
    }
    return hashtagPattern.test(tag);
  });
}, 'Некорректные хэштеги! Хэштег должен начинаться с #, быть уникальным, содержать до 19 символов после решётки (буквы, цифры), максимум 5 хэштегов. Дубликаты запрещены.');

// Валидатор для комментария
pristine.addValidator(commentInput, (value) => value.length <= 140, 'Комментарий не должен превышать 140 символов!');

let isFormSubmitting = false;

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
          showAlert(err.message);
        })
        .finally(() => {
          unblockSubmitButton();
          isFormSubmitting = false;
        });
    }
  });
};

setUserFormSubmit(() => {
  showMessage();
  closePhotoEditor();
});

hashtagInput.addEventListener('input', updateSubmitButtonState);
commentInput.addEventListener('input', updateSubmitButtonState);

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
