const moment = require('moment');

// let date = new Date();
//
// console.log(date.getMonth());


// let date = moment();
// date.add(1, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

new Date().getTime();
let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let myDate = moment();
console.log(myDate.format('h:mm a'));