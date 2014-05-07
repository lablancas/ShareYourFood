/* 
 * Authored by @LucasBlancas
 */

var mongoose = require('mongoose');

// define model attributes
var UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    }
});

// define model static methods
//UserSchema.statics.method = function(){};

// define model instance methods
//UserSchema.methods.login = function(){};

// define model virtual methods
//UserSchema.virtual('virtual.attribute').get(function(){});
//UserSchema.virtual('virtual.attribute').set(function(var){});

mongoose.model('User', UserSchema);