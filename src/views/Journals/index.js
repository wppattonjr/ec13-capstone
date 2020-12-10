import React from 'react';
import JournalCards from '../../components/Cards/journalCards';
import JournalForm from '../../components/Forms/JournalForm';
import getUid from '../../helpers/data/authData';
import journalData from '../../helpers/data/journalData';
import AppModal from '../../components/AppModal';
import entryData from '../../helpers/data/entryData';

export default class Journals extends React.Component {
  state = {
    journals: [],
  };

  componentDidMount() {
    this.getJournals();
  }

  getJournals = () => {
    const currentUserId = getUid();
    journalData.getAllUserJournals(currentUserId).then((response) => {
      this.setState(
        {
          journals: response,
        },
      );
    });
  };

  removeJournal = (e) => {
    const removedJournal = this.state.journals.filter((journal) => journal.journalId !== e.target.id);
    this.setState({
      journals: removedJournal,
    });

    journalData.deleteJournal(e.target.id)
      .then(() => {
        this.getJournals();
      });
    entryData.deleteJournalEntry(e.target.id) && entryData.deleteEntry(e.target.id);
  }

  render() {
    const { journals } = this.state;
    const showJournals = () => journals.map((journal) => (
      <JournalCards key={journal.journalId} onUpdate={this.getJournals} journal={journal} removeJournal={this.removeJournal} />
    ));
    return (
      <>
        <AppModal title={'Create Journal'} buttonLabel={'Create Journal'}>
          <JournalForm onUpdate={this.getJournals} />
        </AppModal>
        <div className='d-flex justify-content-center m5'>
        {showJournals()}
      </div>
    </>
    );
  }
}
