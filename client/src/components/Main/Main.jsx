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
    axios
      .get(`api/groups/`, {
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
    const { userId } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <h1>Main Page</h1>
            <ul>
              {groups.map((group, ind) => {
                if (group._creator === userId) {
                  return (
                    <li key={ind}>
                      <Link to={`/event/${group._id}`}>{group.name}</Link>
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
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
