/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

angular.module('shareyourfood', ['ngRoute', 'user.controllers', 'blog.controllers'])
        .config(['$routeProvider',
            function($routeProvider) {
              $routeProvider.
                when('/blog', {
                  templateUrl: 'blog/blog.html',
                  controller: 'BlogController'
                }).
                when('/', {
                  templateUrl: 'user/user.html',
                  controller: 'UserController'
                }).
                otherwise({
                  redirectTo: '/'
                });
  }]);