'use strict';

// TEMP: Simple In-Memory Database
const express = require('express');

const data = require('./db/notes');

const app = express();
app.use(express.static('public'));

//Listen for incoming connections
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});



console.log('hello world!');

// INSERT EXPRESS APP CODE HERE...
