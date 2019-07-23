const log = require('electron-log');
log.transports.console.level = 'info';
log.transports.file.level = 'info';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const uri = process.env.MLAB_URI;
console.log(uri);
const db = mongoose.createConnection(uri, {useNewUrlParser: true});
const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: String,
  age: Number
});

const Test = db.model('test', testSchema);

const test = new Test({ name: 'Billy', age: 31 })

db.once('connected', function (err){
  if(err) { return console.error(err) }
  Test.create(test, function (err, doc){
    if(err) { return console.error(err) }
    console.log(doc)
    return db.close();
  })
});

// mongoose.connect('mongodb://admin:administrator123@ds253537.mlab.com:53537/fun4thedisabled', {useNewURLParser: true}, function(){
//   console.log('mongoose connected');
// })

/* GET home page. */
// router.get('/', function(req, res, next) {
//     log.info('Sending 200....');
//     res.send("200", "Success");
// });

module.exports = router;
