import React from 'react';
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

import { INCOMPLETE_NEW_EVENT } from '../../errorConstants';

class NewEvent extends React.Component {
  state = {
    eventName: '',
    eventDate: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = () => {
    const { eventName, eventDate } = this.state;
    const { history } = this.props;

    if (!eventName || !eventDate) {
      this.setState({ error: INCOMPLETE_NEW_EVENT });
    } else {
      const newEvent = {
        eventName,
        eventDate
      };

      console.log(newEvent);

      // let's assume we were able to add an event successfully
      let eventAddedSuccessfully = true;

      if (eventAddedSuccessfully) {
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

export default NewEvent;
