'use strict';

// TEMP: Simple In-Memory Database
const express = require('express');

const data = require('./db/notes');

const app = express();
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  if (searchTerm) {
    const result = data.filter(item => item.title.includes(searchTerm));
    res.json(result);
  }
  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const requestId = req.params.id;
  const findId = data.find(item => item.id === Number(requestId));
  res.json(findId);
});



//Listen for incoming connections
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});



console.log('hello world!');

// INSERT EXPRESS APP CODE HERE...
