require('dotenv').config();


const db = require('./db/models');

//Node Modules Import

// express = require('express'),
// cors = require('cors'),
// bodyParser = require('body-parser'),
// sessions = require('client-sessions'),
// path = require('path'),









/* Confirming connection with remote Postgres server */

db.sequelize.authenticate()
  .then(()=> console.log('Database connection with render worked'))
  .catch(error => console.error('unable to connect to database', error));