'use strict';

function primePrint(start,stop) {
  let primeList = [];
for (let i=start; i< stop; i++) {
    for (let j=2; j*j<=i;j++) {
      if (i % j === 0) {
        break;
      } else if (j+1 > Math.sqrt(i)) {
        let n = i.toString();
        primeList.push(n);
      }
    }
  }
  console.log(primeList);
}

primePrint(2,500);
primePrint(500,1000);