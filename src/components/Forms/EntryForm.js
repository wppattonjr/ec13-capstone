import React, { Component } from 'react';
import getUser from '../../helpers/data/authData';
import entryData from '../../helpers/data/entryData';
import journalData from '../../helpers/data/journalData';

// Place needed items in state
export default class EntryForm extends Component {
  state = {
    entryId: this.props.entry?.entryId || '',
    entry: this.props.entry?.entry || '',
    userId: this.props.entry?.userId || '',
    journalId: this.props.entry?.journalId || '',
    journals: [],
  };

  componentDidMount() {
    const userId = getUser();
    this.getJournals(userId).then((response) => {
      this.setState({
        userId,
        journals: response,
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.entryId === '') {
      const newEntry = {
        entryId: this.state.entryId,
        entry: this.state.entry,
        userId: this.state.userId,
        journalId: this.state.journal,
      };
      entryData
        .createEntry(newEntry)
        .then((response) => {
          const entryInJournal = {
            entryId: response.data.entryId,
            journalId: this.state.journal,
            userId: this.state.userId,
          };
          journalData.createJournalEntry(entryInJournal);
        })
        .then(() => {
          this.props.onUpdate();
        });
    } else {
      entryData.updateEntry(this.state).then(() => {
        this.props.onUpdate();
      },
      journalData.createJournalEntry(this.props.entryId),
      this.props.onUpdate(this.props.entry.entryId));
    }
  };

  getJournals = (uid) => journalData.getAllUserJournals(uid).then((response) => response);

  render() {
    const { entry, journals, entryJournal } = this.state;

    const populateDropdown = () => journals.map((journal) => (
        <option
          value={journal.journalId}
          key={journal.journalId}
          id={journal.journalId}
        >
          {journal.journalName}
        </option>
    ));

    return (
      <form onSubmit={this.handleSubmit} className='add-entry-form'>
        <textarea
          type='text'
          name='entry'
          value={entry}
          onChange={this.handleChange}
          placeholder='Add journal entry here'
          className='form-control form-control-lg m1'
          required
        />
        <select
          className='form-control form-control-lg m-1'
          name='journal'
          ref={this.entryRef}
          value={entryJournal}
          onChange={this.handleChange}
          required
        >
          <option value=''>Add Entry to a Journal</option>
          {Object.keys(journals).length && populateDropdown()}
        </select>
        <button className='btn form-button form-button-text mt-1'>
          Submit
        </button>
      </form>
    );
  }
}
