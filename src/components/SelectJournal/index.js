import React, { Component } from 'react';
import journalData from '../../helpers/data/journalData';
import getUser from '../../helpers/data/authData';
import entryData from '../../helpers/data/entryData';

export default class SelectJournal extends Component {
  state = {
    journals: [],
  }

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId,
    });
    this.getUserJournals(userId);
  }

  handleChange =(e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    const { journal, userId } = this.state;
    const { entry } = this.props;
    e.preventDefault();
    entryData.createJournalEntry(userId, journal, entry);
  };

  getUserJournals = (userId) => {
    journalData.getAllUserJournals(userId).then((response) => {
      this.setState({ journals: response });
    });
  }

  render() {
    const { journals, entryJournal } = this.state;

    const populateDropdown = () => (
      journals.map((journal) => <option value={journal.journalId} id={journal.journalId}>{journal.journalName}</option>)
    );

    return (
      <div className='d-flex justify-content-center'>
        <form onSubmit={this.handleSubmit} className='add-entry-form'>
          <select
            className='form-control form-control-lg m-1'
            name='journal'
            value={entryJournal}
            onChange={this.handleChange}
            required>

              <option value='' selected disabled hidden>Add Entry to a Journal</option>
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
