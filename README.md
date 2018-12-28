# PrimeThree Server

#### PrimeThree Server is an API server built to sync with PrimeThree Client (React App) However it is a fully functioning server that you can use with your front end program of choice.

# Instructions
- Choose Clone in the github repo and copy the web URL (https://github.com/JacobMacInnis/primethree-server.git)
- Open CLI and cd to desired location
- Enter following git commands
```
$ git clone https://github.com/JacobMacInnis/primethree-server.git

$ cd primethree-server

$ npm install
```
- and to turn on the server locally
```
$ node app.js
```


# Routes

### POST Route `/api/primes`
The POST route requires an `input` property in the request body that contains a three digit string such as '123' or '003'.  The route validates the string and searches the first 10,000 prime numbers for a number that contains these digits in order. 

#### ex...
#### for the POST of '123' the response would be

```javascript
{ 
  input: "123", 
  result: "1123", 
  index: 187, 
  date: "2018-12-28T12:50:18.235Z", 
  id: "5c261c0ab40e3d0347771a37"
}
```

the response object shows the number sent, the first prime number that contains '123', the index shows this is the 187th prime number, the date submitted and the id of the new addition to the Mongo database.

### GET Route `/api/primes`

The GET route responds with an array of objects of previous results from the POST route.

#### ex...

```javascript
[
{input: "123", result: "1123", index: 187, date: "2018-12-27T15:24:32.073Z", id: "5c24eeb07270f14beea"},
{input: "124", result: "1249", index: 203, date: "2018-12-27T15:25:50.759Z", id: "5c24eefe7270f14beea"},
{input: "125", result: "1259", index: 204, date: "2018-12-27T15:25:59.911Z", id: "5c24ef077270f14beea"}
]
```


# Data persistence

## Persistence solutions

PrimeThree uses MongoDB for data persistance.  

### MongoDB

This app uses a NOSQL Mongo database. Each search is saved in the db.   the three digit number searched, the result of searching within the first 10,000 prime numbers.  A time stamp is also saved in order to keep track of the order of searches.

#### Mongo Schema Search Result

```javascript
const searchSchema = new mongoose.Schema({
  input: { type: String, required: true },
  result: { type: String, required: true },
  index: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});
```

