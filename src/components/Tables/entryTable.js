import React, { Component } from 'react';
import { Table } from 'reactstrap';
import EntryForm from '../Forms/EntryForm';
import AppModal from '../AppModal';

export default class EntryTable extends Component {
  state = {
    entry: {},
  }

  componentDidMount() {
    this.setState({
      entry: this.props.entry,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.toggle();
  }

  render() {
    const { entry, onUpdate } = this.state;
    return (
    <Table>
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
                  <AppModal title={'Update Entry'} buttonLabel={'Update Entry'}><EntryForm entry={entry} onUpdate={onUpdate} /></AppModal>
                  {/* <AppModal className='btn btn-lg' title={'Update Entry'} buttonLabel={'Update Entry'}>
                  { Object.keys(entry).length && <EntryForm entry={entry} onUpdate={onUpdate} />}
                  </AppModal> */}
                </td>
                <td>
                  <button className='btn btn-lg btn-danger' id={entry.entryId} onClick={this.props.removeEntry}>Delete Entry</button>
                </td>
              </tr>
            </tbody>
        </Table>
    );
  }
}
