'use strict';
const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  input: { type: String, required: true },
  result: { type: String, required: true },
  index: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

searchSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result.__v;
    result.id = result._id.toString();
    delete result._id;
  }
});

module.exports = mongoose.model('Search', searchSchema);