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
      time: null
    }
    this.getHolidays = this.getHolidays.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
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
        this.calculateTime(results.data[0].holidaydate);
      })
      .catch(err => {
        console.log('GET Holidays error: ', err);
      })
  }

  calculateTime(holidayDate) {
    const targetDate = new Date(holidayDate);
    const currentDate = new Date();

    console.log('targetDate: ', targetDate);
    console.log('targetDate variant: ', new Date("25 Dec 2021"));
    console.log('currentDate: ', currentDate);

    const totalSeconds = (targetDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    console.log(days, hours, minutes, seconds)
  }

  render() {
    if (this.state.holidays.length === 0) {
      return null;
    }

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <NavDropdown title="Holidays">
            {this.state.holidays.map(holiday => {
              return <NavDropdown.Item>{holiday.holidayname}</NavDropdown.Item>
            })}
          </NavDropdown>
        </Navbar>
        <div>
          <div className="days">
            Days
          </div>
          <div className="hours">
            Hours
          </div>
          <div className="minutes">
            Minutes
          </div>
          <div className="seconds">
            Seconds
          </div>
        </div>
      </div>
    )
  }
}

export default App;