import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to our app!</h1>
          <div>
            This app is designed so you can join a group event and vote on a
            restaurant cuisine for that group event. Once the vote is over, the
            closest restaurant to the group owner with that cuisine type will be
            shown.
            <Form>
              <FormGroup row>
                <Col xs='3'>
                  <Link to='/register'>
                    <Button color='secondary'>Register</Button>
                  </Link>
                </Col>
                <Col xs='3'>
                  <Link to='/login'>
                    <Button color='primary'>Login</Button>
                  </Link>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
