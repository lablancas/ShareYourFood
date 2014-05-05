/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//import required libraries
var $ = require('node-jquery');

// intialize static email array when starting node server
var emails = ["lablancas@gmail.com", "yngonzalez@gmail.com", "lucas.blancas@hp.com"];

// function to validate Email Format using an regular expression test
var isValidEmailFormat = function(email){
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
};

//TODO need to define a response schema for each HTTP VERB (GET, POST, PUT, DELETE)
exports.get = function(req, res) {
    if (req.params.email === undefined)
        res.status(200).json(emails);

    else if ($.inArray(req.params.email, emails) > -1) {
        i = $.inArray(req.params.email, emails);
        res.status(200).json({"email": emails[i]});
    }
    else
        res.status(200).json({});
    
    console.log(emails.length);
};

exports.post = function(req, res) {
    if (req.params.email === undefined)
        res.status(400).send("Invalid HTTP POST request: missing email");

    // update record ... TODO move to PUT later???
    else if ($.inArray(req.params.email, emails) > -1){
        i = $.inArray(req.params.email, emails);
        res.status(200).json({"email": emails[i]});
    }
    // add record
    else {
        emails.push(req.params.email);
        i = $.inArray(req.params.email, emails);
        res.status(200).json({"email": emails[i]});
    }
    
    console.log(emails.length);
};

exports.delete = function(req, res) {
    if (req.params.email === undefined)
        res.status(400).send("Invalid HTTP DELETE request: missing email");

    // delete record
    else if ($.inArray(req.params.email, emails) > -1) {
        deletedEmail = emails.splice($.inArray(req.params.email, emails), 1)[0];
        res.status(200).json({"email": deletedEmail});
    }

    // no delete complete. email not found
    //TODO inform requester that delete was not possible
    else
        res.status(200).json({});
    
    console.log(emails.length);
};