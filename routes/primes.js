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
      min: 1,
      max: 1
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

  let result = -1;
  let found;
  for (let i = 0; i < primeNumbers.length; i++) {
    found = primeNumbers[i].indexOf(input);
    if (found !== -1) {
      result = i;
      break;
    }
  }
  console.log(result);

  // Search.create({  })
  //   .then(result => {
  //     return res.status(201).location('/api/users/${result.id}').json(result);
  //   })
  //   .catch(err => {
  //     if (err.reason === 'ValidationError') {
  //       return res.status(err.code).json(err);
  //     }
  //     next(err);
  //   });
});

module.exports = router;