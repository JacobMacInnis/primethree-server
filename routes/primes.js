'use strict';

const express = require('express');

const router = express.Router();

const Search = require('../models/search');
const primeNumbers = require('../utils/primeNumbers');

/*======POST /Users======*/
router.post('/', (req, res, next) => {
  const { input } = req.body;
  
  const requiredFields = ['input'];
  const missingField = requiredFields.find(field => !(field in req.body));
  
  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: `Missing '${missingField}' in request body`,
      location: missingField
    });
  }
  const stringFields = ['input'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  const sizedFields = {
    input: {
      min: 3,
      max: 3
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  // Search for first prime number containing three digits...

  let result = '-1';
  let idxOf;
  let index = 0;
  for (let i = 0; i < primeNumbers.length; i++) {
    idxOf = primeNumbers[i].indexOf(input);
    if (idxOf !== -1) {
      result = primeNumbers[i];
      index = i;
      break;
    }
  }
  let newData = {
    input,
    result,
    index,
  };
  Search.create(newData)
    .then(result => {
      return res.status(201).location('/api/primes').json(result);
    })
    .catch(err => {
      next(err);
    });
});

/*======GET /primes======*/
router.get('/', (req, res, next) => {

  Search.find({})
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;