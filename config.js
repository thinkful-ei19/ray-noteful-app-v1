'use strict';
module.exports.PORT = 8080;

const express = require('express');
const app = express();
app.use(express.static('public'));

function logger(req, res, next) {
  const currentDate = new Date();
  console.log(currentDate, req.method, req.url);
  next();
}


