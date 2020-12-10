import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

export default class MyNavbar extends Component {
  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { user } = this.props;
    return (
        <div className="MyNavbar">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to='/journals'>I Need to Write</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link to='/journals' className="nav-link" href="#">Journals</Link>
                </li>
                <li className="nav-item">
                  <Link to='/single-entry' className="nav-link" href="#">Create Entry</Link>
                </li>
              </ul>
              <div className="form-inline my-2 my-lg-0">
                {user && (
                  <button className="nav-link btn btn-danger" onClick={this.logMeOut}>Logout</button>
                )}
              </div>
            </div>
          </nav>
        </div>
    );
  }
}
