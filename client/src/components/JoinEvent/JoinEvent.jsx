import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class JoinEvent extends React.Component {
  submitForm = e => {
    const { history } = this.props;
    history.push('/event/1');
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Join Event</h1>
            Select an event
            <select className='select'>
              <option>Team Lunch - Sep 27</option>
              <option>Team Lunch - Oct 4</option>
              <option>Dinner Date - Oct 11</option>
            </select>
            <Button color='primary' onClick={this.submitForm}>
              Join
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JoinEvent;
