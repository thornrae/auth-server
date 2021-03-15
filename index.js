'use strict';

// Start up DB Server
const mongoose = require('mongoose');
const server = require('./src/server.js');
require('dotenv').config();

// require('./src/server.js').start(process.env.PORT);



const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect('mongodb://localhost:27017/authserver', options)
  .then( () => {
    server.start(3333)
  })

// Start the web server
