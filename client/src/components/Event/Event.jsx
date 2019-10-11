import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, InputGroup, Input } from 'reactstrap';
import { FRIENDS_NAME_INCOMPLETE } from '../../actions/types';

class Event extends React.Component {
  state = {
    friendsName: '',
    cuisineType: 'chinese',
    error: '',
    group: {
      id: null,
      name: null
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/groups/${id}`, {
        headers: { Authorization: localStorage.getItem('key') }
      })
      .then(response => {
        this.setState({ group: response.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'There was an error retrieving the group, please try again.'
        });
      });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendInvite = () => {
    const { friendsName } = this.state;
    const { history } = this.props;

    if (!friendsName) {
      this.setState({ error: FRIENDS_NAME_INCOMPLETE });
    } else {
      console.log(friendsName);
      history.push('/main');
    }
  };

  closePoll = () => {
    console.log('Close poll, tally votes!');
  };

  submitVote = e => {
    const { cuisineType } = this.state;
    console.log(cuisineType);
  };

  render() {
    const { id } = this.props.match.params;
    const { error, group } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <h1>{group.name}</h1>
            <h2>Sep 27</h2>
            {error ? <h3>Error: {error}</h3> : null}
            Select a cuisine type
            <select
              className='select'
              name='cuisineType'
              onChange={this.handleChange}
              value={this.cuisineType}
            >
              <option value='chinese'>Chinese</option>
              <option value='greek'>Greek</option>
              <option value='italian'>Italian</option>
              <option value='ukranian'>Ukranian</option>
            </select>
            <Button color='primary' onClick={this.submitVote}>
              Vote
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Invite Friends</h2>
            <InputGroup>
              <Input
                placeholder='FirstName LastName'
                value={this.state.friendsName}
                onChange={this.handleChange}
              />
            </InputGroup>
            <Button color='secondary' onClick={this.sendInvite}>
              Invite
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Current Votes</h2>
            <ul>
              <li>Chinese - 3</li>
              <li>Greek - 2</li>
              <li>Italian - 1</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color='danger' onClick={this.closePoll}>
              Close Poll
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Event;
