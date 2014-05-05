/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

angular.module('notification.controllers', ['notification.services'])
        .controller('NotificationController', ['$scope', 'Notification', function($scope, Notification) {
                // initialize
                $scope.notification = Notification.get({"email": "-"}); // get empty Notification resource object
                
                $scope.isValidEmailFormat = function(){
                    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test($scope.notification.email);
                };

                $scope.isSubscribed = function(callbackTrue, callbackFalse){
                    Notification.get({"email": $scope.notification.email}, function(v){
                        if(v.email !== undefined && v.email === $scope.notification.email) callbackTrue();
                        else callbackFalse();
                    });
                };
                
                $scope.unsubscribe = function(){
                    if(!$scope.isValidEmailFormat()){
                            $scope.subscribed = false;
                            $scope.status = "warn";
                            $scope.message = "Sorry. This is not a valid email format";
                    }
                    else {
                        $scope.isSubscribed(
                        // call this function if email is subscribed
                        function(){
                            $scope.notification.$delete(
                            function(){
                                $scope.subscribed = false;
                                $scope.status = "success";
                                $scope.message = "Sorry to see you go";
                            }, 
                            function(){
                                $scope.subscribed = true;
                                $scope.status = "info";
                                $scope.message = "Sorry. We had an issues performing your request. Please try again.";
                            });
                        },

                        // call this function if email is NOT subscribed
                        function(){
                            $scope.subscribed = false;
                            $scope.status = "warn";
                            $scope.message = "Sorry. This is email is not recognized. Please subscribe.";
                        });
                    }
                };

                $scope.subscribe = function() {
                    if ($scope.isValidEmailFormat()) {
                        $scope.isSubscribed(
                        // call this function if email is subscribed    
                        function(){
                            $scope.subscribed = true;
                            $scope.status = "info";
                            $scope.message = "Thank you. You were already subscribed for notifications";
                        },

                        // call this function if email is NOT subscribed
                        function(){
                            $scope.status = "info";
                            $scope.message = "Sending your request...";

                            //TODO call Notification service to add an email (on callback, update status)
                            $scope.notification.$save(
                            function(){
                                $scope.subscribed = true;
                                $scope.status = "success";
                                $scope.message = "Thank you. We will notify you of upcoming events and activities";
                            }, 
                            function(){
                                $scope.subscribed = false;
                                $scope.status = "info";
                                $scope.message = "Sorry. We had an issues performing your request. Please try again.";
                            });
                        });
                    }
                };
                
            }]);