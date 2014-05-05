/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

// testing controller
describe('NotificationController', function() {
    var $httpBackend, $scope, controller, expected, actual;

    beforeEach(module('notification.controllers'));

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, $controller) {
        $scope = _$rootScope_.$new();
        controller = $controller('NotificationController', {'$scope': $scope});
        // Set up the mock http service responses
        $httpBackend = _$httpBackend_;
        
        // backend definition common for all tests
        expected = [{"email": "lablancas@gmail.com"},
                {"email": "yngonzalez@gmail.com"},
                {"email": "lucas.blancas@hp.com"}];

        actual = [{"email": "lablancas@gmail.com"},
                {"email": "yngonzalez@gmail.com"},
                {"email": "lucas.blancas@hp.com"}];
        $httpBackend.whenGET('').respond(expected); 
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should have no emails before initialized', function(){ 
        expect($scope.emails).toEqual([]);
        $httpBackend.flush();
    });
    
    it('should get expected data from HTTP GET Request', function(){ 
        // check http backed GET results
        $httpBackend.expectGET('').respond(expected);
        $httpBackend.flush();
    });
    
    it('should be able to add 1 new email', function(){ 
        // initialize controller scope
        $httpBackend.flush();
        $scope.emails = actual;
        expect($scope.emails).toEqual(expected);
        expect($scope.emailId).not.toBeDefined();
        expect($scope.status).not.toBeDefined();
        
        // alter controller scope and update expected data
        $scope.emailId = "fakeemail@unknown.com";
        expected.push({"email": $scope.emailId});
        
        // run notifyMe() and assert
        $scope.notifyMe();
        expect($scope.emails).toEqual(expected);
        expect($scope.emailId).toEqual("");
        expect($scope.status).toEqual("success");
    });

    it('should not be able to add an email that already exists', function(){ 
        // initialize controller scope
        $httpBackend.flush();
        $scope.emails = actual;
        expect($scope.emails).toEqual(expected);
        expect($scope.emailId).not.toBeDefined();
        expect($scope.status).not.toBeDefined();
        
        // alter controller scope and update expected data
        $scope.emailId = "lablancas@gmail.com";
        
        // run notifyMe() and assert
        $scope.notifyMe();
        expect($scope.emails).toEqual(expected);
        expect($scope.emailId).toEqual("");
        expect($scope.status).toEqual("info");
    }); 
    
    it('should get isSubscribed true', function(){ 
        // initialize controller scope
        $httpBackend.flush();
        $scope.emails = actual;
        expect($scope.emailId).not.toBeDefined();
        expect($scope.status).not.toBeDefined(); 
        $scope.emailId = "lablancase@gmail.com";
        expect($scope.isSubscribed()).toBe(false);
    });
    
    
    it('should get isSubscribed false', function(){ 
        // initialize controller scope
        $httpBackend.flush();
        $scope.emails = actual;
        expect($scope.emailId).not.toBeDefined();
        expect($scope.status).not.toBeDefined();
        expect($scope.isSubscribed()).toBe(false);
        $scope.emailId = "myemail@fake.com";
        expect($scope.isSubscribed()).toBe(false);
    });
});
