/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

angular.module('shareyourfood', ['ngRoute', 'notification.controllers', 'blog.controllers'])
        .config(['$routeProvider',
            function($routeProvider) {
              $routeProvider.
                when('/blog', {
                  templateUrl: 'blog/blog.html',
                  controller: 'BlogController'
                }).
                when('/', {
                  templateUrl: 'notification/notification.html',
                  controller: 'NotificationController'
                }).
                otherwise({
                  redirectTo: '/'
                });
  }]);