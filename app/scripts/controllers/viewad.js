'use strict';

angular.module('efterfestApp')
  .controller('ViewAdCtrl', function ($scope, simpleLogin, fbutil, $routeParams, $rootScope) {

    $scope.map = { center: { latitude: 62, longitude: 15 }, zoom: 8 };
    $scope.party = fbutil.syncObject("parties/" + $routeParams.id);
    $scope.user = simpleLogin.getUser();



    $scope.myRequests = fbutil.syncArray("requests")
    $scope.myRequests.$loaded().then(function() {
      $scope.sentRequest =  _.find($scope.myRequests, {partyId: $scope.party.$id, requestCreator: $scope.user.uid});
      if (!$scope.sentRequest) {
        $scope.request = {
          partyId: $scope.party.$id,
          requestCreator: $scope.user.uid,
          partyHost: $scope.party.creator
        }
      }
    });

    $scope.removeRequest = function() {
      $scope.myRequests.$remove($scope.sentRequest).then(function(){
        $scope.sentRequest = undefined;
      });
    };

    $scope.saveRequest = function() {
      $scope.myRequests.$add($scope.request).then(function(request){
          $scope.sentRequest = $scope.myRequests.$getRecord(request.key());

          var partyCreatorRef = fbutil.syncObject("users/" + $scope.party.creator + "/receivedrequests/" + request.key()).$loaded().then(function() {
            partyCreatorRef.$value = request.key();
            partyCreatorRef.$save();
          });

          var requestCreatorRef = fbutil.syncObject("users/" + $scope.user.uid + "/receivedrequests/" + request.key()).$loaded().then(function() {
            requestCreatorRef.$value = request.key();
            requestCreatorRef.$save();
          });

        },
        function(error) {});
    }



  });
