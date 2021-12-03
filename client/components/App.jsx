import React from 'react';
import axios from 'axios';

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
      <div>Hello There From React!</div>
    )
  }
}

export default App;