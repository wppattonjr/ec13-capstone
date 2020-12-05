import React from 'react';
import Auth from '../../components/Auth';
import getUid from '../../helpers/data/authData';
import journalData from '../../helpers/data/journalData';
import JournalCard from '../../components/Cards/JournalCard';

export default class Home extends React.Component {
  state = {
    journals: [],
  };

  componentDidMount() {
    this.getJournals();
  }

  getJournals = () => {
    const userId = getUid();
    journalData.getAllUserJournals(userId).then((journals) => {
      this.setState({
        journals,
      });
    });
  };

  loadComponent = () => {
    const { user } = this.props;
    let component = '';
    if (user === null) {
      component = <Home />;
    } else if (user) {
      component = this.state.journals.length
        && this.state.journals.map((journal) => (
          <JournalCard key={journal.journalId} journal={journal} />
        ));
    } else {
      component = <Auth />;
    }
    return component;
  };

  render() {
    return (
      <div>
        <h1 className='mt-5 justify-content-center'>
          Welcome to Your Personal Journal
        </h1>
        {this.loadComponent()}
      </div>
    );
  }
}
