'use strict';
const Search = require('./../models/search');
// const seedUsers = require('../db/seed/users');

const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');


const { TEST_MONGODB_URI } = require('../config');

chai.use(chaiHttp);
const expect = chai.expect;
const sandbox = sinon.createSandbox();

let input = '123';
let result = '1123';
let index = 187;
let newData = {
  input,
  result,
  index,
};
let badData = {};

describe('PrimeThree API - /primes Endpoint', () => {
  before(() => {
    return mongoose.connect(TEST_MONGODB_URI, {useNewUrlParser: true});
  });
    
  beforeEach(() => {
    return Search.create(newData);
  });
  
  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(() => {
    return mongoose.disconnect();
  });
  /*=====Primes ENDPOINT=====*/

  /*=====Post: /primes=====*/
  describe('/api/primes', () => {
    describe('POST', () => {
      it('should return stats object', () => {
        return chai
          .request(app)
          .post('/api/primes')
          .send(newData)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('id','input','result','index', 'date');
          });
      });
      it('should return error when missing `input`', () => {
        badData = {
          result,
          index
        };
        return chai
          .request(app)
          .post('/api/primes')
          .send(badData)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('code','reason','message', 'location');
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal("Missing \'input\' in request body");
            expect(res.body.location).to.equal('input');
          });
      });
      it('should return error when `input` is not type String', () => {
        badData = {
          input: 123,
          result,
          index
        };
        return chai
          .request(app)
          .post('/api/primes')
          .send(badData)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('code','reason','message', 'location');
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Incorrect field type: expected string');
            expect(res.body.location).to.equal('input');
          });
      });
      it('should return error when `input` is More than three characters long', () => {
        badData = {
          input: '1234',
          result,
          index
        };
        return chai
          .request(app)
          .post('/api/primes')
          .send(badData)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('code','reason','message', 'location');
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Must be at most 3 characters long');
            expect(res.body.location).to.equal('input');
          });
      });
      it('should return error when `input` is Less than three characters long', () => {
        badData = {
          input: '12',
          result,
          index
        };
        return chai
          .request(app)
          .post('/api/primes')
          .send(badData)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys('code','reason','message', 'location');
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Must be at least 3 characters long');
            expect(res.body.location).to.equal('input');
          });
      });
    });
    // GET Endpoint
    describe('GET', () => {
      it('should return an array of objects', () => {
        return chai
          .request(app)
          .get('/api/primes')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(1); 
          });
      });
    });
    describe('Both GET and POST errors', () => {
      it('should catch errors and respond properly', () => {
        // This sinon function doesn't shut off so I use it for the rest of error testing...
        sandbox.stub(Search.schema.options.toJSON, 'transform').throws('FakeError');
        return chai
          .request(app)
          .post('/api/primes')
          .send(newData)
          .then(res => {
            expect(res).to.have.status(500);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.equal('Internal Server Error'); 
          });
      });
      it('should catch errors and respond properly GET endpoing', () => {
        return chai
          .request(app)
          .get('/api/primes')
          .then(res => {
            expect(res).to.have.status(500);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body.message).to.equal('Internal Server Error'); 
          });
      });
    });
  });
});
