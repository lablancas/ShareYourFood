/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

angular.module('shareyourfood', ['ngRoute', 'notification.controllers'])
        .config(['$routeProvider',
            function($routeProvider) {
              $routeProvider.
                when('/', {
                  templateUrl: 'notification/notification.html',
                  controller: 'NotificationController'
                }).
                otherwise({
                  redirectTo: '/'
                });
  }]);