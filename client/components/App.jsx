import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: []
    }
    this.getHolidays = this.getHolidays.bind(this);
  }

  componentDidMount() {
    this.getHolidays();
  }

  getHolidays() {
    axios.get('/holidays')
      .then(results => {
        this.setState({holidays: results.data})
      })
      .catch(err => {
        console.log('GET Holidays error: ', err);
      })
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
      </div>
    )
  }
}

export default App;