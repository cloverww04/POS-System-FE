import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPayments = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/payment`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const addPayment = (orderId, paymentType, tip) => new Promise((resolve, reject) => {
  const requestBody = {
    Tip: tip,
    PaymentType: paymentType,
  };

  fetch(`${dbUrl}/api/orders/${orderId}/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

export {
  getPayments,
  addPayment,
};
