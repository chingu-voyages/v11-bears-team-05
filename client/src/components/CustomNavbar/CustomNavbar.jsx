import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';

import { logoutUser } from '../../actions/actions';

class CustomNavbar extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  logout = () => {
    const { logout, history } = this.props;

    axios
      .post('api/users/logout', null, {
        headers: { 'x-auth': localStorage.getItem('key') }
      })
      .then(response => {
        logout();
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'There was an error logging out, please try again.'
        });
      });
  };

  render() {
    const { loggedIn } = this.props;

    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>App</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {loggedIn ? (
                <>
                  <NavItem>
                    <Link to='/main'>Home</Link>
                  </NavItem>
                  <NavItem>
                    <Button
                      color='link'
                      className='logout-link'
                      onClick={this.logout}
                    >
                      Logout
                    </Button>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <Link to='/register'>Register</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/login'>Login</Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({ loggedIn: state.loginReducer.loggedIn });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomNavbar)
);
