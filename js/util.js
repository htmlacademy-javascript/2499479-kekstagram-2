import { ALERT_SHOW_TIME } from './data.js';

const showRedAlert = (message) => {
  // Находим шаблон и клонируем его
  const redAlertContainerTemplate = document.querySelector('#data-error')
    .content
    .querySelector('.data-error');

  const alertContainer = redAlertContainerTemplate.cloneNode(true);

  // Устанавливаем текст ошибки, если он передан
  const alertTitle = alertContainer.querySelector('.data-error__title');
  if (message && alertTitle) {
    alertTitle.textContent = message;
  }

  // Добавляем стили
  redAlertContainerTemplate.style.zIndex = '100';
  redAlertContainerTemplate.style.position = 'absolute';
  redAlertContainerTemplate.style.left = '0';
  redAlertContainerTemplate.style.top = '0';
  redAlertContainerTemplate.style.right = '0';
  redAlertContainerTemplate.style.padding = '10px 3px';
  redAlertContainerTemplate.style.fontSize = '30px';
  redAlertContainerTemplate.style.textAlign = 'center';
  redAlertContainerTemplate.style.backgroundColor = 'red';

  // Добавляем контейнер в DOM
  document.body.append(redAlertContainerTemplate);

  // Автоматическое скрытие через 5 секунд
  setTimeout(() => {
    redAlertContainerTemplate.remove();
  }, ALERT_SHOW_TIME);
};

// Блок с сообщением об ошибке
const alertContainerTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

// Блок с сообщением об успехе
const messageContainerTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const isEscapeKey = (evt) => evt.key === 'Escape';

// Сообщение с ошибкой
const showAlert = (message) => {
  const alertContainer = alertContainerTemplate.cloneNode(true);
  const alertCloseButton = alertContainer.querySelector('.error__button');
  const alertMessage = alertContainer.querySelector('.error__message');

  if (alertMessage) {
    alertMessage.textContent = message;
  }

  alertContainer.style.zIndex = 100;

  document.body.append(alertContainer);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onCloseAlertClick();
    }
  };

  const onOutBoxClick = (evt) => {
    if (!alertContainer.querySelector('.error__inner').contains(evt.target)) {
      evt.preventDefault();
      onCloseAlertClick();
    }
  };

  function onCloseAlertClick() {
    alertContainer.remove();
    alertCloseButton.removeEventListener('click', onCloseAlertClick);
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onOutBoxClick);
  }

  alertCloseButton.addEventListener('click', onCloseAlertClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onOutBoxClick);
};

// Сообщение об успешной отправке
const showMessage = () => {
  const messageContainer = messageContainerTemplate.cloneNode(true);
  const messageCloseButton = messageContainer.querySelector('.success__button');

  messageContainer.style.zIndex = 100;

  document.body.append(messageContainer);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onCloseMessageClick();
    }
  };

  const onOutBoxClick = (evt) => {
    if (!messageContainer.querySelector('.success__inner').contains(evt.target)) {
      evt.preventDefault();
      onCloseMessageClick();
    }
  };

  function onCloseMessageClick() {
    messageContainer.remove();
    messageCloseButton.removeEventListener('click', onCloseMessageClick);
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onOutBoxClick);
  }

  messageCloseButton.addEventListener('click', onCloseMessageClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onOutBoxClick);
};

export { isEscapeKey, showRedAlert, showAlert, showMessage };
