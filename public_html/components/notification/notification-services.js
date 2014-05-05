/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

angular.module('notification.services',['ngResource'])
        .factory('Notification', ['$resource', function($resource) {
            return $resource('http://localhost:9090/api/notification/:email', {email:'@email'});
}]);