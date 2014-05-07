/* 
 * Authored by @LucasBlancas
 */

//import required libraries
var $ = require('node-jquery');

var db;
require('mongodb').connect("mongodb://localhost:27017/shareyourfood", function(err, database) {
    if(err) throw err;
    db = database;
});

//TODO need to define a response schema for each HTTP VERB (GET, POST, PUT, DELETE)
exports.findEmail = function(req, res) {
    db.collection("user", function(err, collection){
        if(err) res.status(500).json(err);

        // no email provided, then find all
        if (req.params.address === undefined)
            collection.find().toArray(function(err, docs){
                if(err) res.status(500).json(err);
                else res.status(200).json(docs);
            });
        else
            collection.findOne({"address": req.params.address}, function(err, item){
                if(err) res.status(500).json(err);
                else res.status(200).json(item === null ? {} : item);
            });

        collection.find().toArray(function(err, docs){
            if(err) console.error(err.message);
            else console.log(docs.length);
        });
    });
};

exports.addEmail = function(req, res) {
    db.collection("user", function(err, collection){
        if(err) res.status(500).json(err);

        collection.insert(req.params, function(err, docs){
            if(err) res.status(500).json(err);
            else res.status(200).json(docs[0]);
        });

        collection.find().toArray(function(err, docs){
            if(err) console.error(err.message);
            else console.log(docs.length);
        });
    });
};

exports.deleteEmail = function(req, res) {
    db.collection("user", function(err, collection){
        if(err) res.status(500).json(err);

        email = collection.findOne({_id: req.params._id});
        collection.remove({_id: req.params._id, address: req.params.address}, function(err, numberOfRemovedDocs){
            if(err) res.status(500).json(err);
            else res.status(200).json(email);
        });

        collection.find().toArray(function(err, docs){
            if(err) console.error(err.message);
            else console.log(docs.length);
        });
    });
};
