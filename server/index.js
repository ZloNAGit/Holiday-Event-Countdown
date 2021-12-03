const express = require('express');
const { db } = require('../database');
const app = express();

let PORT = 3000;

app.use(express.json());
app.use(express.static('dist'));

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    })
  })
  .catch(err => {
    console.log('DB sync error: ', err);
  });