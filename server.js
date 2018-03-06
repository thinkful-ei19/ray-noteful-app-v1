'use strict';

// TEMP: Simple In-Memory Database
const express = require('express');

//Simple In-Memory Database
const data = require('./db/notes');
const simDB = require('./db/simDB'); 
const notes = simDB.initialize(data);

const { PORT } = require('./config');

const app = express();
app.use(express.static('public'));
app.use(express.json());


app.get('/api/notes', (req, res, next) => {
  const searchTerm = req.query.searchTerm;
  
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); //goes to error handler
    }
    res.json(list); //respons with filtered array
  });
  // const searchTerm = req.query.searchTerm;
  // if (searchTerm) {
  //   const result = data.filter(item => item.title.includes(searchTerm));
  //   res.json(result);
  // }
  // res.json(data);
});


app.get('/api/notes/:id', (req, res, next) => {
  const requestId = req.params.id;

  notes.find(requestId, (err, item) => {
    if(err) {
      console.error(err);
    } 
    if(item) {
      console.log(item);
    } else {
      console.log('not found');
    }
  });
});


app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


//Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});



console.log('hello world!');

// INSERT EXPRESS APP CODE HERE...
