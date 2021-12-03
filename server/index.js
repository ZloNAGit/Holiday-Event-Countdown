const express = require('express');
const { db } = require('../database');
const app = express();

let PORT = 3000;
const router = require('./routes.js');

app.use(express.json());
app.use(express.static('dist'));
app.use('/', router);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    })
  })
  .catch(err => {
    console.log('DB sync error: ', err);
  });