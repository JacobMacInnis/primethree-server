'use strict';
const Search = require('./../models/search');
// const seedUsers = require('../db/seed/users');

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { TEST_MONGODB_URI } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

let input = '123';
let result = '1123';
let index = 187;
let newData = {
  input,
  result,
  index,
};

describe('PrimeThree API - /primes Endpoint', function () {
  function clearDB() {}
  before(function () {
    return mongoose.connect(TEST_MONGODB_URI, {useNewUrlParser: true});
  });
    
  beforeEach(() => {
  });
  
  afterEach(function () {
    return clearDB();
  });

  after(function () {
    return mongoose.disconnect();
  });
  /*=====Primes ENDPOINT=====*/

  /*=====Post: /primes=====*/
  describe('/api/primes', function () {
    describe('POST', function () {
      it('should return stats object', function () {
        
        return chai
          .request(app)
          .post('/api/primes')
          .send(newData)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('_id','input','result','index', 'date', '__v');
          });
      });
    });
  });
});
