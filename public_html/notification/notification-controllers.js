/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

angular.module('notification.controllers', ['notification.services'])
        .controller('NotificationController', ['$scope', 'Notification', function($scope, Notification) {
  $scope.emails = Notification.query();
  
  $scope.notifyMe = function(){
    if( $scope.emailId && $scope.emailId.length > 0 ){
        $scope.emails.push({"email": $scope.emailId});
        //$scope.emails.save($scope.emails);
        $scope.emailId = "";
    }
  };
}]);