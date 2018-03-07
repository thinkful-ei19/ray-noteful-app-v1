'use strict';

const express = require('express');
const morgan = require('morgan');

const notesRouter = require('./router/notes.router');

// const logger = require('./middleware/logger');
const { PORT } = require('./config');

// Create an Express application
const app = express();




// Log all requests
app.use(morgan('dev'));

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());

app.use('/v1/api', notesRouter);


// DEMO: a rudimentary way to test our error handler
app.get('/throw', (req, res, next) => {
  throw new Error('Boom!!');
});

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// NOTE: we'll prevent stacktrace leak in later exercise
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
