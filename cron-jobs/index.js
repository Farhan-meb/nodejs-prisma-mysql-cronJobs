var cron = require('node-cron');

let counter = 1;

//runs everyday at 12:31 pm

const job = cron.schedule("00 31 12 * * *", function(){
    console.log('hello!', counter++);
})
module.exports = { job }