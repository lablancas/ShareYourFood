/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

// testing controller
describe('UserController', function() {

    var $scope, $httpBackend;
    beforeEach(module('user.controllers'));
    
    var fakeEmail = "fake@email.com";
    var badEmails = ["lablancas", "lablancas@", "lablancas@gmail", "lablancas@gmail."];
    var user = {"_id":"536b07a3ec48ea1708513b1a","email":"lablancas@gmail.com","__v":0}
    var err = {"error":"no user found"};

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, $controller) {
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('http://localhost:9090/api/user/-').respond(err);
        $controller('UserController', {'$scope': $scope});
        $httpBackend.flush();
    }));

    afterEach(function() {

    });

    it('should recognize valid email formats', function() {
        $scope.user.email = user.email;
        expect($scope.isValidEmailFormat()).toBe(true);
    });

    it('should recognize invalid email formats', function() {
        for(email in badEmails){
           $scope.user.email = email; 
            expect($scope.isValidEmailFormat()).toBe(false);
        }
        
    });

    it('should recognized subscribed users', function() {
        $scope.user.email = user.email;

        $httpBackend.expectGET('http://localhost:9090/api/user/'+ user.email).respond(user);
        
        $scope.isSubscribed(function() {
            expect(true).toBe(true);
            console.log("EXPECTED: line 48");
        }, function() {
            expect(true).toBe(false);
            console.log("NOT EXPECTED: line 51");
        });

        $httpBackend.flush();
    });

    it('should not recognize unsubscribed users', function() {
        $scope.user.email = fakeEmail;

        $httpBackend.expectGET('http://localhost:9090/api/user/'+ fakeEmail).respond(err);
        
        $scope.isSubscribed(function() {
            expect(true).toBe(false);
            console.log("NOT EXPECTED: line 65");
        }, function() {
            expect(true).toBe(true);
            console.log("EXPECTED: line 68");
        });

        $httpBackend.flush();
    });
    
    it('should subscribe a new user', function(){
        $scope.user.email = user.email;
        $httpBackend.expectGET('http://localhost:9090/api/user/'+ user.email).respond(err);
        $httpBackend.expectPOST('http://localhost:9090/api/user/'+ user.email).respond(user);
       
        $scope.subscribe();
        
        $httpBackend.flush();
        
        expect($scope.user._id).toBe(user._id);
        expect($scope.user.email).toBe(user.email);
        expect($scope.user.__v).toBe(user.__v);
        expect($scope.subscribed).toBe(true);
        expect($scope.status).toBe("success");
        expect($scope.message).toBe("Thank you. We will notify you of upcoming events and activities");
    });
    
    
    it('should not subscribe an existing user', function(){
        $scope.user.email = user.email;
        $httpBackend.expectGET('http://localhost:9090/api/user/'+ user.email).respond(user);
       
        $scope.subscribe();
        
        $httpBackend.flush();
        
        expect($scope.user._id).toBe(user._id);
        expect($scope.user.email).toBe(user.email);
        expect($scope.user.__v).toBe(user.__v);
        expect($scope.subscribed).toBe(true);
        expect($scope.status).toBe("info");
        expect($scope.message).toBe("Thank you. You were already subscribed for users");
    });
    
    it('should not subscribe a user with an invalid email', function(){
        $scope.user.email = badEmails[0];
       
        $scope.subscribe();
        
        expect($scope.user._id).not.toBeDefined();
        expect($scope.user.email).toBe(badEmails[0]);
        expect($scope.user.__v).not.toBeDefined();
        expect($scope.subscribed).toBe(false);
        expect($scope.status).toBe("warn");
        expect($scope.message).toBe("Sorry. This is not a valid email format");
    });
    
    
    it('should unsubscribe an existing user', function(){
        $scope.user.email = user.email;
        $httpBackend.expectGET('http://localhost:9090/api/user/'+ user.email).respond(user);
        $httpBackend.expectDELETE('http://localhost:9090/api/user/'+ user.email).respond(user);
       
        $scope.unsubscribe();
        
        $httpBackend.flush();
        
        expect($scope.user._id).toBe(user._id);
        expect($scope.user.email).toBe(user.email);
        expect($scope.user.__v).toBe(user.__v);
        expect($scope.subscribed).toBe(false);
        expect($scope.status).toBe("success");
        expect($scope.message).toBe("Sorry to see you go");
        
    });
    
    
    it('should not unsubscribe an unsubscribed user', function(){
        $scope.user.email = user.email;
        $httpBackend.expectGET('http://localhost:9090/api/user/'+ user.email).respond(err);
       
        $scope.unsubscribe();
        
        $httpBackend.flush();
        
        expect($scope.user._id).not.toBeDefined();
        expect($scope.user.email).toBe(user.email);
        expect($scope.user.__v).not.toBeDefined();
        expect($scope.subscribed).toBe(false);
        expect($scope.status).toBe("warn");
        expect($scope.message).toBe("Sorry. This is email is not recognized. Please subscribe.");
        
    });
    
    
    it('should not unsubscribe a user with an invalid email', function(){
        $scope.user.email = badEmails[0];
       
        $scope.unsubscribe();
        
        expect($scope.user._id).not.toBeDefined();
        expect($scope.user.email).toBe(badEmails[0]);
        expect($scope.user.__v).not.toBeDefined();
        expect($scope.subscribed).toBe(false);
        expect($scope.status).toBe("warn");
        expect($scope.message).toBe("Sorry. This is not a valid email format");
    });

});
