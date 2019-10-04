import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { INCOMPLETE_REGISTRATION } from '../../actions/types';
import { loginUser } from '../../actions/actions';

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row
} from 'reactstrap';

class Register extends React.Component {
  state = {
    nameFirst: '',
    nameLast: '',
    email: '',
    password: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = () => {
    // use axios to submit the registration
    // if it's successful, dispatch the login action and redirect
    const { nameFirst, nameLast, email, password } = this.state;
    const { login, history } = this.props;
    let authKey = '';

    if (!nameFirst || !nameLast || !email || !password) {
      this.setState({ error: INCOMPLETE_REGISTRATION });
    } else {
      const newUser = {
        nameFirst,
        nameLast,
        email,
        password
      };

      axios
        .post('api/users', newUser)
        .then(response => {
          localStorage.setItem('key', response.data.tokens[0].token);
          authKey = response.data.tokens[0].token;
          login(authKey);
          history.push('/main');
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: 'There was an error registering, please try again.'
          });
        });
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <h1>Register</h1>
            {error ? <h3>Error: {error}</h3> : null}
            <Form>
              <FormGroup row>
                <Label for='nameFirst' sm={6}>
                  First Name
                </Label>
                <Col sm={6}>
                  <Input
                    type='text'
                    name='nameFirst'
                    id='nameFirst'
                    value={this.state.nameFirst}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='nameLast' sm={6}>
                  Last Name
                </Label>
                <Col sm={6}>
                  <Input
                    type='text'
                    name='nameLast'
                    id='nameLast'
                    value={this.state.nameLast}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='email' sm={6}>
                  Email
                </Label>
                <Col sm={6}>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='password' sm={6}>
                  Password
                </Label>
                <Col sm={6}>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Button color='primary' onClick={this.submitForm}>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loginReducer.loggedIn,
  loginId: state.loginReducer.loginId
});

const mapDispatchToProps = dispatch => ({
  login: loginId => dispatch(loginUser(loginId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
