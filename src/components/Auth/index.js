import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import GoogleButton from 'react-google-button';
import JournalImage from './small_journal.png';

export default class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className='Auth'>
        <img src={JournalImage} alt='journal icon'/>
        <h3>I Need to Write</h3>
        <GoogleButton onClick={this.loginClickEvent} />
      </div>
    );
  }
}
