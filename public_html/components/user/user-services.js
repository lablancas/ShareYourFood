/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

angular.module('user.services',['ngResource'])
        .factory('User', ['$resource', function($resource) {
            return $resource('http://localhost:9090/api/user/:email', {email:'@email'});
}]);