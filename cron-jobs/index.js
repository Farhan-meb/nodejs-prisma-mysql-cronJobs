var cron = require('node-cron');
const _delete = require('../helpers/deleteFolderFiles');

//runs everyday at 02:38 pm
// cron.schedule("00 38 14 * * *", function(){
//     console.log('hello!');
// })

//runs every 1 hour
// cron.schedule("0 0 */1 * * *", function(){
//     _delete.deleteImages();
// })
