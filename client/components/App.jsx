import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Form, Button, Modal } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: [],
      currentHoliday: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      modal: false,
      formName: '',
      date: ''
    }
    this.getHolidays = this.getHolidays.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.selectHoliday = this.selectHoliday.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentDidMount() {
    this.getHolidays();
  }

  getHolidays() {
    axios.get('/holidays')
      .then(results => {
        this.setState({
          holidays: results.data,
          currentHoliday: results.data[0]
        })
        return results;
      })
      .then(results => {
        this.calculateTime(this.state.currentHoliday.holidaydate);
        setInterval(() => this.calculateTime(this.state.currentHoliday.holidaydate), 1000);
      })
      .catch(err => {
        console.log('GET Holidays error: ', err);
      })
  }

  selectHoliday(id) {
    id = Number(id);
    let holiday;
    for (let i = 0; i < this.state.holidays.length; i++) {
      if (this.state.holidays[i].id === id) {
        holiday = this.state.holidays[i];
        break;
      }
    }
    this.setState({currentHoliday: holiday}, this.calculateTime(holiday.holidaydate))
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  handleFormChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  submitForm(e) {
    let entries = e.split(',');
    const myDate = new Date(entries[1]);
    myDate.setHours( myDate.getHours() + 5 );
    axios.post('/holidays', {
      name: entries[0],
      date: myDate
    })
      .then(() => {
        this.closeModal();
        this.getHolidays();
      })
  }

  calculateTime(holidayDate) {
    const targetDate = new Date(holidayDate);
    const currentDate = new Date();

    const totalSeconds = (targetDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    this.setState({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  render() {
    if (this.state.holidays.length === 0) {
      return null;
    }

    return (
      <div className="full">
        <Navbar bg="dark">
          <NavDropdown title="Holidays" onSelect={(eventKey) => this.selectHoliday(eventKey)}>
            {this.state.holidays.map(holiday => {
              return <NavDropdown.Item key={holiday.id} eventKey={holiday.id}>{holiday.holidayname}</NavDropdown.Item>
            })}
          </NavDropdown>
          <Button variant="dark" onClick={this.openModal}>
            Add Holiday/Event
          </Button>
        </Navbar>
        <Modal show={this.state.modal}>
          <Modal.Header closeButton>
            <Modal.Title>Fill Holiday/Event Below</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formName">
              <Form.Label>Event Title: </Form.Label>
              <Form.Control type="text" onChange={this.handleFormChange} placeholder="ex. Birthday"/>
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date: </Form.Label>
              <Form.Control type="date" onChange={this.handleFormChange}/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" onClick={() => this.submitForm(`${this.state.formName},${this.state.date}`)}>Submit</Button>
            <Button variant="secondary" onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <div className="main">
          <div className="title">
              {this.state.currentHoliday.holidayname}
          </div>
          <div className="time">
            <div className="days">
              <p>{this.state.days}</p>
              <span>Days</span>
            </div>
            <div className="hours">
              <p>{this.state.hours}</p>
              <span>Hours</span>
            </div>
            <div className="minutes">
              <p>{this.state.minutes}</p>
              <span>Minutes</span>
            </div>
            <div className="seconds">
              <p>{this.state.seconds}</p>
              <span>Seconds</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;