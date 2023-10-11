import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/ordertypes`, {
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

const addTypeToOrder = (orderId, typeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/order/ordertype/${orderId}/${typeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId, typeId }),
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        resolve(data);
      } else {
        reject(new Error(`Failed to add item to order. Status: ${res.status}`));
      }
    })
    .catch((error) => {
      reject(error);
    });
});

export {
  getAllTypes,
  addTypeToOrder,
};
