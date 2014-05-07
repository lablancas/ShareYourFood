/* 
 * Authored by @LucasBlancas
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    UserModel = require('./user-model'),
    User = mongoose.model('User');
    
exports.findAllUsers = function(req, res, next){
    User.find(function(err, users){
       if(err) res.status(500).json(err);
       else if(!users) res.status(200).json({error: "no users found"});
       else {
           res.status(200).json(users);
           console.log("found users, %s", users.length);
       }
    });
};

exports.findUserById = function(req, res, next){
    User.findById(req.params.id, function(err, user){
       if(err) res.status(500).json(err);
       else if(!user) res.status(200).json({error: "no user found"});
       else {
           res.status(200).json(user);
           console.log("found user, %s", user.email);
       }
    });
};
    
exports.findUserByEmail = function(req, res, next){
    User.findOne({email: req.params.email}, function(err, user){
       if(err) res.status(500).json(err);
       else if(!user) res.status(200).json({error: "no user found"});
       else {
           res.status(200).json(user);
           console.log("found user, %s", user.email);
       }
    });
};

exports.addUserByEmail = function(req, res, next){
    User.create({ email: req.params.email}, function (err, user) {
      if (err) res.status(500).json(err);
      else {
          res.status(200).json(user);
          console.log("added new user, %s", user.email);
      }
    });
};

exports.deleteUserById = function(req, res, next){
    User.findByIdAndRemove(req.params.id, function(err, user){
       if(err) res.status(500).json(err);
       if(!user) res.status(200).json({error: "no user found"});
       res.status(200).json(user);
       console.log("deleted user, %s", user.email);
    });
};

exports.deleteUserByEmail = function(req, res, next){
    User.findOneAndRemove({email: req.params.email}, function(err, user){
       if(err) res.status(500).json(err);
       if(!user) res.status(200).json({error: "no user found"});
       res.status(200).json(user);
       console.log("deleted user, %s", user.email);
    });
};