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
const showAlert = () => {
  const alertContainer = alertContainerTemplate.cloneNode(true);
  const alertCloseButton = alertContainer.querySelector('.error__button');

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

export { isEscapeKey, showAlert, showMessage};
