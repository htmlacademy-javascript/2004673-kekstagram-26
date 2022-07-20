import { DATA_RECIPIENT, DATA_SOURCE } from './data.js';

const getData = (onSuccess, onFail) => {
  fetch(DATA_SOURCE)
    .then((response) => {
      if(response.ok) {
        response.json()
          .then((data) => {
            onSuccess(data);
          });
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(DATA_RECIPIENT,
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      }
      else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
