import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const submitForm = e => {
  console.log('submit form');
  e.preventDefault();
};

const Login = () => (
  <div className='container'>
    <Form>
      <FormGroup row>
        <Label for='email' sm={6}>
          Email
        </Label>
        <Col sm={6}>
          <Input type='email' name='email' id='email' />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='password' sm={6}>
          Password
        </Label>
        <Col sm={6}>
          <Input type='password' name='password' id='password' placeholder='' />
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm={{ size: 10, offset: 2 }}>
          <Button onClick={submitForm}>Submit</Button>
        </Col>
      </FormGroup>
    </Form>
  </div>
);

export default Login;
