# PrimeThree Server
#### PrimeThree Server is an API server built to sync with PrimeThree Client (React App) However it is a fully functioning server that you can use with your front end program of choice.

#### the endpoint /api/primes has one POST route and one GET route.

### /api/primes POST route
endpoint requires a input property that contains a three digit string such as '123' or '003'.  The route validates the string and searches the first 10,000 prime numbers for a number that contains these digits in order. 
ex...
for the POST of '123' the response would be

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

### /api/primes GET route

```javascript

{input: "123", result: "1123", index: 187, date: "2018-12-27T15:24:32.073Z", id: "5c24eeb07270f14beea7ccd3"},
{input: "124", result: "1249", index: 203, date: "2018-12-27T15:25:50.759Z", id: "5c24eefe7270f14beea7ccd4"},
{input: "125", result: "1259", index: 204, date: "2018-12-27T15:25:59.911Z", id: "5c24ef077270f14beea7ccd5"}

```


# Data persistence

## Persistence solutions

PrimeThree uses MongoDB for data persistance.  

### MongoDB

This app uses a NOSQL Mongo database. Each search is saved in the db.   the three digit number searched, the result of searching within the first 10,000 prime numbers.  A time stamp is also saved in order to keep track of the order of searches.

#### Document storage

