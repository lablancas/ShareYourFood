/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

angular.module('notification.services',['ngResource'])
        .factory('Notification', ['$resource', function($resource) {
            return $resource('notification/:emailId.json', {}, {
                query: {method:'GET', params:{emailId:'emails'}, isArray:true},
                save: {method:'PUT', params:{emailId:'emails'}}
            });
}]);