import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const addReviewToOrder = (orderId, review) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/orders/${orderId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ review }),
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

export default addReviewToOrder;
