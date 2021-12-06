const { db, DataTypes } = require('./index.js');

const Holidays = db.define('holidays', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  holidayname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  holidaydate: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  theme: {
    type: DataTypes.TEXT
  }
}, {timestamps: false});

module.exports = {
  getHolidays: () => {
    return Holidays.findAll()
  },
  addHoliday: (name, date) => {
    return Holidays.create({
      holidayname: name,
      holidaydate: date
    })
  }
}