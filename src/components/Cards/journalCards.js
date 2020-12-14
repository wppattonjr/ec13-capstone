import React, { Component } from 'react';
import {
  Card, CardBody, CardTitle, CardLink,
} from 'reactstrap';
import { IoBookSharp } from 'react-icons/io5';
import AppModal from '../AppModal';
import JournalForm from '../Forms/JournalForm';

class JournalCards extends Component {
  render() {
    const { journal, removeJournal, onUpdate } = this.props;
    return (
      <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{journal.journalName}</CardTitle>
        </CardBody>
        <img width="100%" src={journal.imageUrl} alt="" />
        <CardBody>
          <CardLink href={`/journals/${journal.journalId}`}><IoBookSharp size={50}/></CardLink> <br></br>
          <AppModal title={'Update Journal'}>
            { Object.keys(journal).length && <JournalForm journal={journal} onUpdate={onUpdate} />}
          </AppModal>
          <CardLink id={journal.journalId} onClick={(e) => removeJournal(e)} href="#" alt='delete'>Delete Journal</CardLink>
        </CardBody>
      </Card>
    </div>
    );
  }
}

export default JournalCards;
