import React from 'react';
import { connect } from 'react-redux';

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
      name: null,
      votes: []
    },
    cuisines: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { coords } = this.props;

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

    axios
      .get(`/api/cuisines/${coords[0]}/${coords[1]}`, {
        headers: { Authorization: localStorage.getItem('key') }
      })
      .then(response => {
        this.setState({
          cuisines: response.data.cuisines,
          cuisineType: response.data.cuisines[0].cuisine.cuisine_name
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'There was an error retrieving the cuisines, please try again.'
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
    const { cuisineType, group } = this.state;
    const { history } = this.props;

    axios
      .post(`/api/joinvote/${group._id}/${cuisineType}`, null, {
        headers: { Authorization: localStorage.getItem('key') }
      })
      .then(response => {
        history.push('/main');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error:
            'There was an error voting for the cuisine, or you already voted for this event!'
        });
      });
  };

  render() {
    const { error, group, cuisines } = this.state;

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
              {cuisines.map(cuisine => (
                <option
                  value={cuisine.cuisine.cuisine_name}
                  key={cuisine.cuisine.cuisine_id}
                >
                  {cuisine.cuisine.cuisine_name}
                </option>
              ))}
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
              {group.votes.map(vote => (
                <li key={vote._id}>{vote.category}</li>
              ))}
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

const mapStateToProps = state => {
  return { coords: state.locationReducer.coords };
};

export default connect(mapStateToProps)(Event);
