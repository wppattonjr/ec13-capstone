import React, { Component } from 'react';
import {
  Card, CardTitle, CardText, CardImg, CardImgOverlay,
} from 'reactstrap';

class JournalCard extends Component {
  render() {
    const { journal } = this.props;
    return (
      <div className="w-50">
      <Card inverse>
        <CardImg width='100%' src='/assets/318x270.svg' alt='Card image cap' />
        <CardImgOverlay>
          <CardTitle tag='h5'>{journal.journalName}</CardTitle>
          <CardText>
          </CardText>
          <CardText>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </CardText>
        </CardImgOverlay>
      </Card>
    </div>
    );
  }
}

export default JournalCard;
