import { isEscapeKey, showAlert } from './util.js';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// Функция для блокировки/разблокировки кнопки в зависимости от валидации
const updateSubmitButtonState = () => {
  const isValid = pristine.validate(); // Проверяем валидацию формы
  submitButton.disabled = !isValid; // Блокируем кнопку, если есть ошибки
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

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
    updateSubmitButtonState(); // Проверяем валидацию при открытии формы
  });
};

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  pristine.reset();
  updateSubmitButtonState(); // Обновляем состояние кнопки при закрытии формы
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

  // Проверка на максимальное количество хэштегов
  if (hashtags.length > 5) {
    return false;
  }

  // Проверка на уникальность хэштегов
  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  // Проверка формата каждого хэштега
  return hashtags.every((tag) => {
    // Проверка на пустой хэштег (только решётка)
    if (tag === '#') {
      return false;
    }
    return hashtagPattern.test(tag);
  });
}, 'Некорректные хэштеги! Хэштег должен начинаться с #, быть уникальным, содержать до 19 символов после решётки (буквы, цифры), максимум 5 хэштегов. Дубликаты запрещены.');

// Валидатор для комментария
pristine.addValidator(commentInput, (value) => value.length <= 140, 'Комментарий не должен превышать 140 символов!');

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

hashtagInput.addEventListener('input', updateSubmitButtonState); // Обновляем состояние кнопки при изменении хэштегов
commentInput.addEventListener('input', updateSubmitButtonState); // Обновляем состояние кнопки при изменении комментария

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

export { uploadForm, setUserFormSubmit, initUploadModal, closePhotoEditor };
