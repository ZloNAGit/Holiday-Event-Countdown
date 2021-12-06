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
    model.addHoliday(req.body.name, req.body.date)
      .then(() => {
        res.sendStatus(200);
        console.log('Holiday added!');
      })
      .catch(err => {
        console.log('Error adding holiday: ', err);
      })
  }
}