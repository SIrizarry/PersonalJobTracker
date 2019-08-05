//Express
const express = require('express')
const app = express()

const path = require('path');
const logger = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uri = process.env.DB_URI;

const routes = require('./routes/index');

//ton of middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next()
});
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '../public'));

//Connect to mongo server
mongoose.connect(uri, {useNewUrlParser: true}, function(){
  console.log('database connected');
})

//Routing
app.get('/api/getJobs', routes.getJobs);

app.post('/api/addJob', routes.addJob);

app.get('/api/getCompanies', routes.getCompanies);

app.post('/api/addCompany', routes.addCompany);

//Any request that does not match an existing one is sent here
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + '../public/index.html'));
});

//catch 404
app.use(function(req, res, next){
  const err = new Error('Not Found'); 
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  //only provide error in dev
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;