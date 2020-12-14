import React from 'react';
import { ModalBody, Table } from 'reactstrap';
import entryData from '../../helpers/data/entryData';
import journalData from '../../helpers/data/journalData';
import EntryTable from '../../components/Tables/entryTable';
import EntryForm from '../../components/Forms/EntryForm';
import AppModal from '../../components/AppModal';

export default class SingleJournal extends React.Component {
  state = {
    journal: {},
    entries: [],
    prompts: [],
  };

  componentDidMount() {
    this.loadData();
    // const journalId = this.props.match.params.id;

    // this.getJournalInfo(journalId);

    // this.getPrompts();

    // this.getEntries(journalId).then((resp) => this.setState({ entries: resp }));
  }

  loadData = () => {
    const journalId = this.props.match.params.id;
    journalData.getSingleJournal(journalId).then((response) => {
      this.setState({
        journal: response,
      });
    });
    this.getEntries(journalId).then((resp) => (
      this.setState({
        entries: resp,
      })
    ));
  }

  getJournalInfo = (journalId) => {
    journalData.getSingleJournal(journalId).then((response) => {
      this.setState({
        journal: response,
      });
    });
  };

  getEntries = (journalId) => (
    entryData.getJournalEntries(journalId).then((response) => {
      const entryArray = [];
      response.forEach((item) => {
        entryArray.push(entryData.getAnEntry(item.entryId));
      });
      return Promise.all([...entryArray]);
    })
  )

  getPrompts = () => {
    entryData.getEntryPrompts().then((response) => {
      this.setState({
        prompts: response,
      });
    });
  }

  randomPrompt = () => {
    const randomizePrompts = this.state.prompts[
      Math.floor(Math.random() * this.state.prompts.length)
    ];
    entryData.getEntryPrompts(randomizePrompts).then((response) => {
      this.setState({
        randomPrompt: response,
      });
      console.warn('Prompt', response);
    });
  }

  removeEntry = (e) => {
    const removedEntry = this.state.entries.filter((entry) => entry.entryId
    !== e.target.id);
    this.setState({
      entries: removedEntry,
    });
    entryData.deleteEntry(e.target.id)
      .then(() => {
        this.loadData();
      });
    entryData.deleteJournalEntry(e.target.id);
  }

  render() {
    const { entries, journal, prompts } = this.state;
    const renderEntries = () => (
      entries.map((entry) => (
        <EntryTable key={entry.entryId} entry={entry} removeEntry={this.removeEntry} onUpdate={this.loadData}/>
      ))
    );

    return (
      <ModalBody>
        <AppModal className='create-entry-button' title={'Create Entry'} buttonLabel={'Create Entry'}>
          <EntryForm journal={journal} onUpdate={this.loadData} />
        </AppModal>
        <AppModal className='entry-prompts' title={'Prompt'} buttonLabel={'Get Prompt'}>
          <ModalBody key={prompts.promptId} >
          </ModalBody>
        </AppModal>
        <div>
          <h1 className='table-title'>{journal.journalName}</h1>
        </div>
      <div className='table-of-journal-entries'>
        <Table bordered>
          <tbody>
            <tr>
              <td>{renderEntries()}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      </ModalBody>
    );
  }
}
