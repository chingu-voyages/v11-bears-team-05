import React from 'react';
import { connect } from 'react-redux';
import { LOGOUT } from '../../constants';
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

import './CustomNavbarStyles.scss';

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
    logout();
    history.push('/');
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
  logout: () => dispatch({ type: LOGOUT })
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomNavbar)
);
