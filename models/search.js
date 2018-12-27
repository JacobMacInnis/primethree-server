'use strict';
const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  input: { type: String, required: true },
  result: { type: String, required: true },
  index: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Transform output during `res.json(data)`, `console.log(data)` etc.
searchSchema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Search', searchSchema);