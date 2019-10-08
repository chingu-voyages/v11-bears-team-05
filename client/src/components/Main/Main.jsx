import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

class Main extends React.Component {
  state = {
    groups: []
  };

  componentDidMount() {
    const { userId } = this.props;

    axios
      .get(`api/groups/${userId}`, null, {
        headers: { Authorization: localStorage.getItem('key') }
      })
      .then(response => {
        this.setState({ groups: response.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'There was an error creating the group, please try again.'
        });
      });
  }

  render() {
    const { groups } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <h1>Main Page</h1>
            <ul>
              {groups.map((group, ind) => (
                <li key={ind}>{group.name}</li>
              ))}
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
  }
}

const mapStateToProps = state => ({ userId: state.loginReducer.userId });

export default connect(mapStateToProps)(Main);
