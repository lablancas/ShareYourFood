/* 
 * Authored by @LucasBlancas
 */

var controller = require('./user-controller');

module.exports = function(app){
    app.route('/api/user/:email')
        .get(controller.findUserByEmail)
        .post(controller.addUserByEmail)
        .delete(controller.deleteUserByEmail);
};  