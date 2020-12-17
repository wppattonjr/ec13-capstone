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
    this.getEntries(journalId).then((resp) => {
      this.setState({
        entries: resp,
      });
    });

    entryData.getAllEntryPrompts().then((response) => {
      this.setState({
        prompts: response,
      });
    });
  };

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

  // getPrompts = () => {
  //   entryData.getAllEntryPrompts().then((response) => {
  //     this.setState({
  //       prompts: response,
  //     });
  //   });
  // };

  // promptButton = () => {
  //   const randomPrompt = this.state.prompts[
  //     Math.floor(Math.random() * this.state.prompts.length)
  //   ];
  //   entryData.getAllEntryPrompts(randomPrompt).then((response) => {
  //     this.setState({
  //       randomPrompt: response,
  //     });
  //     console.warn('Look Here', response);
  //   });
  // }

  // getPrompt = () => {
  //   const allPrompts = entryData
  //     .getAllEntryPrompts()
  //     .then((response) => Object.keys(response.data));
  //   const arrlength = allPrompts.length;
  //   const randomPrompt = this.state.prompts[
  //     Math.floor(Math.random() * arrlength)
  //   ];
  //   entryData.getAllEntryPrompts(allPrompts[randomPrompt]).then((response) => {
  //     this.setState({
  //       randomPrompt: response,
  //     });
  //     return response;
  //   });
  // };

  removeEntry = (e) => {
    const removedEntry = this.state.entries.filter(
      (entry) => entry.entryId !== e.target.id,
    );
    this.setState({
      entries: removedEntry,
    });
    entryData.deleteEntry(e.target.id).then(() => {
      this.loadData();
    });
    entryData.deleteJournalEntry(e.target.id);
  };

  render() {
    const { entries, journal } = this.state;
    const renderEntries = () => entries.map((entry) => (
        <EntryTable
          key={entries.entryId}
          entry={entry}
          removeEntry={this.removeEntry}
          onUpdate={this.loadData}
        />
    ));

    return (
      <ModalBody>
        <AppModal title={'Create Entry'} buttonLabel={'Create Entry'}>
          <EntryForm journal={journal} onUpdate={this.loadData} />
        </AppModal>
        <AppModal
          className='entry-prompts'
          title={'Prompt'}
          buttonLabel={'Get Prompt'}
        >
          <ModalBody >
            <h2>Prompt Goes Here</h2>
          </ModalBody>
        </AppModal>
        <div>
          <h1 className='table-title'>{journal.journalName}</h1>
        </div>
        <div className='table-of-journal-entries'>
          <Table bordered>
            <tbody>
              <tr>
                <td>
                  {entries.length > 0
                    ? renderEntries()
                    : 'There are no journal entries.'}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </ModalBody>
    );
  }
}
