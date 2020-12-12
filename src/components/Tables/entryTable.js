import React, { Component } from 'react';
import { Table } from 'reactstrap';
import EntryForm from '../Forms/EntryForm';
import AppModal from '../AppModal';

class EntryTable extends Component {
  render() {
    const
      {
        entry,
        removeEntry,
        onUpdate,
      } = this.props;
    return (
        <Table>
            <tbody>
              <tr key={entry.entryId}>
                <td>{entry.modified}</td>
                <td>{entry.entry}</td>
                <tr> <button id={entry.entryId} onClick={(e) => removeEntry(e)}>Delete Entry</button>
                </tr>
              </tr>
              <tr>
                <tr>
                  <AppModal title={'Update Entry'} buttonLabel={'Update Entry'}>
                  { Object.keys(entry).length && <EntryForm entry={entry} onUpdate={onUpdate} />}
                  </AppModal>
                </tr>
              </tr>
            </tbody>
        </Table>
    );
  }
}

export default EntryTable;
