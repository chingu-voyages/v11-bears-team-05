import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

const Main = () => (
  <Container>
    <Row>
      <Col>
        <h1>Main Page</h1>
        <ul>
          <li>
            <Link to='/event/1'>Team Lunch - Sep 27</Link>
          </li>
          <li>
            <Link to='/event/2'>Team Lunch - Oct 4</Link>
          </li>
          <li>
            <Link to='/event/3'>Dinner Date - Oct 11</Link>
          </li>
        </ul>
        <Link to='/join-event'>
          <Button color='primary'>Join A Group Event</Button>
        </Link>
        <Link to='/new-event'>
          <Button color='secondary'>Start A New Group Event</Button>
        </Link>
      </Col>
    </Row>
  </Container>
);

export default Main;
