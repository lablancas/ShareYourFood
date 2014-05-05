/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//import required libraries
var express = require('express'), 
    notification = require('./server/notification');

//configure app
var app = express();
//app.use(require('body-parser')());
//app.use(require('cookie-parser')());
//app.use(require('express-session')({ secret: 'keyboard cat', key: 'sid', cookie: { secure: false }})); // secure: true requires HTTPS
//app.use(require('method-override')());
app.use(require('morgan')('dev')); // add logging using morgan
app.use(express.static(__dirname + '/public_html')); // static content

// CORS support for all routes
app.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*'); // http://localhost:3000
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' === req.method) return res.send(200);
  next();
});

// routing
app.route("/api/notification/:email?")
        .get(notification.get)
        .post(notification.post)
        .delete(notification.delete);

// Initialize connection once
require('mongodb').connect("mongodb://localhost:27017/shareyourfood", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(9090, function() {
    console.log('Listening on port %d', server.address().port);
  });
});