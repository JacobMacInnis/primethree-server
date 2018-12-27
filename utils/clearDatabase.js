'use strict';
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

mongoose.connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    console.log('successfully dropped documents from `search` collection');
    mongoose.disconnect();
  })
  .catch(err => {
    console.log(err);
  });