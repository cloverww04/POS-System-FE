import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const deleteItem = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/order/menuitem/${orderId}/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      if (res.ok) {
        resolve();
      }
    })
    .catch(reject);
});

const addItemToOrder = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/order/menuitem/${orderId}/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId, itemId }),
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

const getAllItems = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/menuitems`, {
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

export {
  deleteItem,
  addItemToOrder,
  getAllItems,
};
