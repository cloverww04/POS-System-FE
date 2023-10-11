import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllEmps = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/employees`, {
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

const deleteEmp = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/api/employees/${id}`, {
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

export {
  getAllEmps,
  deleteEmp,
};
