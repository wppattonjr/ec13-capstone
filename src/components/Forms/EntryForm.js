import React, { Component } from 'react';
import moment from 'moment';
import getUser from '../../helpers/data/authData';
import entryData from '../../helpers/data/entryData';
import journalData from '../../helpers/data/journalData';

// Place needed items in state
export default class EntryForm extends Component {
  state = {
    entryId: this.props.entry?.entryId || '',
    entry: this.props.entry?.entry || '',
    userId: this.props.entry?.userId || '',
    modified: '',
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

  // handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (this.state.entryId === '') {
  //     entryData.createEntry(this.state)
  //       .then((response) => {
  //         const entryInJournalObj = {
  //           journalId: this.state.journalId,
  //           entryId: response.data.entryId,
  //           userId: this.state.userId,
  //         };
  //         journalData.createJournalEntry(entryInJournalObj);
  //       });
  //   } else {
  //     entryData.updateEntry(this.state);
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.entryId === '') {
      const newEntry = {
        entryId: this.state.entryId,
        entry: this.state.entry,
        userId: this.state.userId,
        journalId: this.state.journalId,
        modified: moment().format('MMMM Do YYYY, h:mm a'),
      };
      entryData
        .createEntry(newEntry)
        .then((response) => {
          const entryInJournal = {
            entryId: response.data.entryId,
            journalId: this.state.journalId,
            userId: this.state.userId,
          };
          journalData.createJournalEntry(entryInJournal);
          this.props.onUpdate();
        })
        .then(() => {
          this.props.onUpdate(this.state.journalId);
          this.setState({ success: true });
        });
    } else {
      const thisJournalEntry = {
        entryId: this.state.entryId,
        entry: this.state.entry,
        userId: this.state.userId,
        journalId: this.state.journalId,
        modified: moment().format('MMMM Do YYYY, h:mm a'),
      };
      entryData.updateEntry(thisJournalEntry).then(() => {
        this.props.onUpdate();
        this.setState({ success: true });
      },
      entryData.updateJournalEntry(thisJournalEntry),
      this.props.onUpdate());
      this.setState({ success: true });
    }
  };

  getJournals = (uid) => journalData.getAllUserJournals(uid).then((response) => response);

  componentDidUpdate(prevState) {
    if (prevState.modified !== this.props.modified) {
      this.getJournalEntries();
    }
  }

  render() {
    const {
      entry,
      journals,
      entryJournal,
      success,
    } = this.state;

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
      <div>
      { success && (<div className='alert alert-success' role='alert'>Your Journal Entry Has Been Updated!</div>)}
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
          name='journalId'
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
    </div>
    );
  }
}
