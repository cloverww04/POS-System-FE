import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getEmpRevenue = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/revenue/${id}`, {
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

export default getEmpRevenue;
