'use strict';

// TEMP: Simple In-Memory Database
const express = require('express');

const data = require('./db/notes');

const app = express();
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const requestedID = req.params.id;
  const findID = data.find(item => item.id === Number(requestedID));
  res.json(findID);
});



//Listen for incoming connections
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});



console.log('hello world!');

// INSERT EXPRESS APP CODE HERE...
