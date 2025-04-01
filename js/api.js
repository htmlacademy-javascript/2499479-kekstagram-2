import { showAlert, showRedAlert } from './util.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные.',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText = null, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      if (method === Method.GET) {
        showRedAlert(errorText || err.message);
      } else {
        showAlert(errorText || err.message);
      }
      throw new Error(errorText ?? err.message);
    });

const getData = () => load(
  Route.GET_DATA,
  ErrorText.GET_DATA
);

const sendData = (body) => load(
  Route.SEND_DATA,
  ErrorText.SEND_DATA,
  Method.POST,
  body
);

export { getData, sendData };
