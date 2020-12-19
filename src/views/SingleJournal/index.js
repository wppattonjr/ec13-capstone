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
    randomPrompt: [],
  };

  componentDidMount() {
    this.loadData();

    // const journalId = this.props.match.params.id;

    // this.getJournalInfo(journalId);

    // // this.getPrompts();

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

  randomPrompt = () => {
    console.warn(this.state.prompts.length);
    const promptArray = [];
    for (const obj of Object.entries(this.state.prompts)) {
      promptArray.push(obj);
    }
    const randomNumber = Math.floor(Math.random() * Math.floor(promptArray.length));
    console.warn(promptArray[randomNumber][1]);
    this.setState({
      rPrompt: promptArray[randomNumber][1].prompt,
    });
    // ([Math.floor(Math.random() * this.state.prompts.length)]).then((response) => {
    //   this.setState({
    //     randomPrompt: response,
    //   });
    //   console.warn('PROMPT', response);
    // });
  };

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
  //     }); return response;
  //   });
  // };

  // getPrompt = () => entryData.getAllEntryPrompts().then((response) => {
  //   const promptArray = [];
  //   console.warn('PROMPT', promptArray);
  //   response.forEach((item) => {
  //     promptArray.push(entryData.getSingleEntryPrompt(item.entryId));
  //   });
  //   return Promise.all([...promptArray]);
  // });

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

    const renderEntries = () => (
      entries.map((entry) => (
        <EntryTable key={entry.entryId} entry={entry} removeEntry={this.removeEntry} {...this.props} />
      ))
    );

    return (
      <ModalBody>
        <AppModal className='mt-3 mb-3' title={'Create Entry'} buttonLabel={'Create Entry'}>
          <EntryForm journal={journal} onUpdate={this.loadData} {...this.props} />
        </AppModal>
        <div className=''>
          <button className='btn-lg mt-3 mb-3' onClick={ () => { this.randomPrompt(); } }>Prompt Me!</button>
              {this.state.rPrompt}
        </div>
        <div>
          <h1>{entries.journalName}</h1>
        </div>
        <div className='table-of-journal-entries'>
          <Table bordered>
            <tbody>
              <tr>
                <td>
                  {entries.length
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
