import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import journalData from '../../helpers/data/journalData';

export default class JournalForm extends Component {
  state = {
    journalId: this.props.journal?.journalId || '',
    journalName: this.props.journal?.journalName || '',
    imageUrl: this.props.journal?.imageUrl || '',
    userId: this.props.journal?.userId || '',
  }

  componentDidMount() {
    const userId = getUser();
    this.setState({
      userId,
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`journals/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);

      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.journalId === '') {
      journalData.createJournal(this.state)
        .then(() => {
          this.props.onUpdate();
        });
    } else {
      journalData.updateJournal(this.state)
        .then(() => {
          this.props.onUpdate(this.props.journal.journalId);
        });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Journal Form</h1>
        <input
          type='text'
          name = 'journalName'
          value={this.state.journalName}
          onChange={this.handleChange}
          placeholder='Journal Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name = 'imageUrl'
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an Image URL or Upload a File'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          className='m-2'
          type='file'
          id='myFile'
          name='filename'
          accept='image/*'
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
