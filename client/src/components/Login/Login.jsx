import React from 'react';
import { connect } from 'react-redux';
import { INCOMPLETE_LOGIN } from '../../actions/types';
import { loginUser } from '../../actions/actions'

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Container
} from 'reactstrap';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = () => {
    // use axios to connect to the back end and check the given login and password
    // if the login was successful, dispatch an action to save the Id to the state, then redirect to the main
    // page
    const { email, password } = this.state;
    const { login, history } = this.props;

    if (!email || !password) {
      this.setState({ error: INCOMPLETE_LOGIN });
    } else {
      const user = {
        email,
        password
      };

      console.log(user);

      // let's assume we were able to register successfully
      let loggedInSuccessfully = true;

      if (loggedInSuccessfully) {
        login(123);
        history.push('/main');
      }
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <h1>Login</h1>
            {error ? <h3>Error: {error}</h3> : null}
            <Form>
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
                  />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Button color='primary' onClick={this.submitForm}>
                  Login
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
)(Login);
