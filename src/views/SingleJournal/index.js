import React from 'react';
import entryData from '../../helpers/data/entryData';
import journalData from '../../helpers/data/journalData';
import EntryTable from '../../components/Tables/entryTable';
import EntryForm from '../../components/Forms/EntryForm';
import AppModal from '../../components/AppModal';

export default class SingleJournal extends React.Component {
  state = {
    journal: {},
    entries: [],
  };

  componentDidMount() {
    const journalId = this.props.match.params.id;

    this.getJournalInfo(journalId);

    this.getEntries(journalId).then((resp) => this.setState({ entries: resp }));
  }

  getJournalInfo = (journalId) => {
    journalData.getSingleJournal(journalId).then((response) => {
      this.setState({
        journal: response,
      });
    });
  };

  getEntries = (journalId) => entryData.getJournalEntries(journalId).then((response) => {
    const entryArray = [];
    response.forEach((item) => {
      entryArray.push(entryData.getAnEntry(item.entryId));
    });
    return Promise.all([...entryArray]);
  });

  removeEntry = (e) => {
    const removedEntry = this.state.entries.filter((entry) => entry.entryId
    !== e.target.id);
    this.setState({
      entries: removedEntry,
    });
    entryData.deleteEntry(e.target.id)
      .then(() => {
        this.getEntries();
      });
    entryData.deleteJournalEntry(e.target.id);
  }

  render() {
    const { entries, journal } = this.state;
    const renderEntries = () => (
      entries.map((entry) => (
        <EntryTable key={entry.entryId} entry={entry} removeEntry={this.removeEntry} onUpdate={this.removeEntry}/>
      ))
    );

    return (
      <>
        <AppModal title={'Add/Update Entry'} buttonLabel={'Add/Update Entry'}>
          <EntryForm key={journal.journalId} onUpdate={this.getEntries} entry={this.state.entries}/>
        </AppModal>
        <div>
          <h1 className='d-flex justify-content-center'>{journal.journalName}</h1>
            {renderEntries()}
          </div>
        </>
    );
  }
}
