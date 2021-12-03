const model = require('./model.js');

module.exports = {
  get: (req, res) => {
    model.getHolidays()
      .then(holidays => {
        res.send(holidays);
      })
      .catch(err => {
        console.log('Controller getHolidays error: ', err);
      })
  },
  add: (req, res) => {

  },
  delete: (req, res) => {

  }
}