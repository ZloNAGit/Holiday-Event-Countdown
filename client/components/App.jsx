import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

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
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            Logo
          </Navbar.Brand>
        </Navbar>
      </div>
    )
  }
}

export default App;