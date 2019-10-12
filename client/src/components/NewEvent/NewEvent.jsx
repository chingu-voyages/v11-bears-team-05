import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { INCOMPLETE_NEW_EVENT } from '../../actions/types';
import { recordCoords } from '../../actions/actions';

class NewEvent extends React.Component {
  state = {
    eventName: '',
    eventDate: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  geoSuccess = position => {
    const { eventName } = this.state;
    const { history } = this.props;

    const newEvent = {
      name: eventName,
      coordinates: [position.coords.latitude, position.coords.longitude]
    };

    recordCoords([position.coords.latitude, position.coords.longitude]);

    axios
      .post('api/groups', newEvent, {
        headers: { Authorization: localStorage.getItem('key') }
      })
      .then(response => {
        history.push('/main');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'There was an error creating the group, please try again.'
        });
      });
  };

  submitForm = () => {
    const { eventName, eventDate } = this.state;

    if (!eventName || !eventDate) {
      this.setState({ error: INCOMPLETE_NEW_EVENT });
    } else {
      navigator.geolocation.getCurrentPosition(this.geoSuccess);
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <h1>New Event</h1>
            {error ? <h3>Error: {error}</h3> : null}
            <Form>
              <FormGroup row>
                <Label for='eventName' sm={6}>
                  Event Name
                </Label>
                <Col sm={6}>
                  <Input
                    type='text'
                    name='eventName'
                    id='eventName'
                    value={this.state.eventName}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='eventDate' sm={6}>
                  Event Date
                </Label>
                <Col sm={6}>
                  <Input
                    type='date'
                    name='eventDate'
                    id='eventDate'
                    value={this.state.eventDate}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Button color='primary' onClick={this.submitForm}>
                  Create
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  recordCoordinates: coords => dispatch(recordCoords(coords))
});

export default connect(
  null,
  mapDispatchToProps
)(NewEvent);
