import React, { Component } from 'react';
import { Table } from 'reactstrap';
import EntryForm from '../Forms/EntryForm';
import AppModal from '../AppModal';

class EntryTable extends Component {
  render() {
    const { entry, removeEntry, onUpdate } = this.props;
    return (
        <Table key={entry.entryId} striped>
            <thead>
              <tr>
                <th>Last Updated</th>
                <th>Journal Entry</th>
                <th>View/Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{entry.entryTime}</td>
                <td>{entry.entry}</td>
                <td>
                  <button id={entry.entryId} onClick={(e) => removeEntry(e)}>Delete Entry</button>
                </td>
              </tr>
              <tr>
                <td>
                  <AppModal title={'Update Entry'} buttonLabel={'Update Entry'}>
                  { Object.keys(entry).length && <EntryForm entry={entry} onUpdate={onUpdate} />}
                  </AppModal>
                </td>
              </tr>
            </tbody>
        </Table>
    );
  }
}

export default EntryTable;
