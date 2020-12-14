import axios from 'axios';

const baseUrl = 'https://ec13-capstone-default-rtdb.firebaseio.com';

const getJournalEntries = (journalId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/journal-entries.json?orderBy="journalId"&equalTo="${journalId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getAnEntry = (entryId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/entries/${entryId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createEntry = (entryObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/entries.json`, entryObj)
    .then((response) => {
      axios.patch(`${baseUrl}/entries/${response.data.name}.json`, { entryId: response.data.name }).then((resp) => {
        resolve(resp);
      });
    }).catch((error) => reject(error));
});

const updateEntry = (entryObj) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/entries/${entryObj.entryId}.json`, entryObj).then((response) => {
    console.warn(response);
    resolve(response);
  }).catch((error) => reject(error));
});

const deleteEntry = (entryId) => axios.delete(`${baseUrl}/entries/${entryId}.json`);

const getEntryPrompts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/prompts.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAnEntryPrompt = (promptId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/prompts/${promptId}.json`).then((response) => {
    console.warn('Look Here', response);
    resolve(response.data);
  }).catch((error) => reject(error));
});
// Journal Entry Join Tables
const createJournalEntry = (userId, journalId, entryId) => {
  axios.post(`${baseUrl}/journal-entries.json`, {
    userId,
    journalId,
    entryId,
  }).catch((error) => console.warn(error));
};

const updateJournalEntry = (entryId) => {
  axios.get(`${baseUrl}/journal-entries.json?orderBy="entryId"&equalTo="${entryId}"`).then((response) => {
    console.warn('Look Here', response);
    axios.patch(`${baseUrl}/journal-entries/${response.journalId}.json`);
  });
};

const deleteJournalEntry = (entryId) => {
  axios.get(`${baseUrl}/journal-entries.json?orderBy="entryId"&equalTo="${entryId}"`).then((response) => {
    const deleteThis = Object.keys(response.data);
    deleteThis.forEach((join) => {
      axios.delete(`${baseUrl}/journal-entries/${join}.json`);
    });
  });
};

export default {
  getJournalEntries,
  getAnEntry,
  createEntry,
  updateEntry,
  deleteEntry,
  createJournalEntry,
  deleteJournalEntry,
  updateJournalEntry,
  getEntryPrompts,
  getAnEntryPrompt,
};
