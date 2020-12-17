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
        <Table entry={entry}>
          <thead>
            <tr>
              <th>Last Modified</th>
              <th>Journal Entry</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
            <tbody >
              <tr>
                <td>{entry.modified}</td>
                <td>{entry.entry}</td>
                <td>
                  <AppModal className='btn btn-lg' title={'Update Entry'} buttonLabel={'Update Entry'}>
                  { Object.keys(entry).length && <EntryForm entry={entry} onUpdate={onUpdate} />}
                  </AppModal>
                </td>
                <td>
                  <button className='btn btn-lg btn-danger' id={entry.entryId} onClick={(e) => removeEntry(e)}>Delete Entry</button>
                </td>
              </tr>
            </tbody>
        </Table>
    );
  }
}

export default EntryTable;
