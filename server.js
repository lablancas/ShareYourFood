/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express'),
        session = require('express-session'),
        MongoStore = require('connect-mongo')(session),
        app = express();

var setting = {
    host : "localhost",
    port : "27017",
    db : "shareyourfood"
};

// conect to mongodb and startup express app
require('mongoose').connect(setting.host, setting.db, setting.port, function(err, database) {
    if(err) throw err;
    
    app.use(require('morgan')('dev')); // add logging using morgan
    
    app.use(require('cookie-parser')());// required before session.
    
    app.use(session(
            { secret: 'this is no secret', 
              cookie: { secure: false },
              store:  new MongoStore({ db: setting.db, host: setting.host, port: setting.port })
            }
    ));
    
    app.use(express.static(__dirname + '/public_html')); // static content
    
    app.use(require('./server/cors/cors-controller').cors);// CORS support for all routes
    require('./server/user/user-routes')(app);// user routes
    
    app.use(require('errorhandler')()); // add error handler

    var server =  app.listen(9090, function() {
        console.log('Listening on port %d', server.address().port);
    });
    
});
