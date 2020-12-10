import axios from 'axios';

const baseUrl = 'https://ec13-capstone-default-rtdb.firebaseio.com';

const getAllUserJournals = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/journals.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const createJournal = (journalObj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/journals.json`, journalObj)
    .then((response) => {
      axios
        .patch(`${baseUrl}/journals/${response.data.name}.json`, { journalId: response.data.name }).then((patchResponse) => {
          resolve(patchResponse);
        }).catch((error) => reject(error));
    });
});

const updateJournal = (journalObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseUrl}/journals/${journalObj.journalId}.json`, journalObj)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const deleteJournal = (journalId) => axios.delete(`${baseUrl}/journals/${journalId}.json`);

const getSingleJournal = (journalId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/journals/${journalId}.json`).then((response) => {
    resolve(response.data);
  });
});

const createJournalEntry = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/journal-entries.json`, object).then((response) => {
      axios.patch(`${baseUrl}/journal-entries/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchResponse) => {
          resolve(patchResponse);
        }).catch((error) => reject(error));
    });
});

export default {
  getAllUserJournals,
  createJournal,
  updateJournal,
  deleteJournal,
  getSingleJournal,
  createJournalEntry,
};
