import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: [],
      currentHoliday: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    }
    this.getHolidays = this.getHolidays.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.selectHoliday = this.selectHoliday.bind(this);
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
    let holiday = this.state.holidays[id - 1];
    this.setState({currentHoliday: holiday}, this.calculateTime(holiday.holidaydate))
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
      <div>
        <Navbar bg="dark" variant="light">
          <NavDropdown title="Holidays" onSelect={(eventKey) => this.selectHoliday(eventKey)}>
            {this.state.holidays.map(holiday => {
              return <NavDropdown.Item key={holiday.id} eventKey={holiday.id}>{holiday.holidayname}</NavDropdown.Item>
            })}
          </NavDropdown>
        </Navbar>
        <div className="title">
            {this.state.currentHoliday.holidayname}
        </div>
        <div className="time">
          <div className="days">
            {this.state.days}
            Days
          </div>
          <div className="hours">
            {this.state.hours}
            Hours
          </div>
          <div className="minutes">
            {this.state.minutes}
            Minutes
          </div>
          <div className="seconds">
            {this.state.seconds}
            Seconds
          </div>
        </div>
      </div>
    )
  }
}

export default App;