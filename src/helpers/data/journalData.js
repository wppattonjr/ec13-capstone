import axios from 'axios';

const baseUrl = 'https://ec13-capstone-default-rtdb.firebaseio.com/journals';

const getAllUserJournals = (userId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}.json?orderBy="userID"&equalTo="${userId}"`)
    .then((response) => {
      resolve(Object.values(response.data));
    }).catch((error) => reject(error));
});

export default { getAllUserJournals };
