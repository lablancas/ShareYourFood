/* 
 * Developed by Lucas Blancas
 * Twitter: @LucasBlancas
 * Gmail: lablancas@gmail.com
 */

describe('Notification controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('shareyourfood'));
  beforeEach(module('notification.services'));


  describe('NotificationController', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('notification/emails.json').
          respond(
          ["lablancas@gmail.com", "yngonzalez@gmail.com", "lucas.blancas@hp.com"]);

      scope = $rootScope.$new();
      ctrl = $controller(NotificationController, {$scope: scope});
    }));
    
    it('should create "emails" model with 3 emails fetched from xhr', function() {
      expect(scope.emails).toEqualData([]);
      $httpBackend.flush();
      expect(scope.phones).toEqualData(["lablancas@gmail.com", "yngonzalez@gmail.com", "lucas.blancas@hp.com"]);
    });
  });

});