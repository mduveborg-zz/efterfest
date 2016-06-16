'use strict';

angular.module('efterfestApp')
  .controller('ViewAdCtrl', function ($scope, simpleLogin, fbutil, $routeParams, $rootScope) {

    $scope.map = { center: { latitude: 62, longitude: 15 }, zoom: 15 };
    $scope.party = fbutil.syncObject("parties/" + $routeParams.id);

    $scope.party.$loaded().then(function() {
      $scope.map.center = {
        latitude: $scope.party.coords.latitude,
        longitude: $scope.party.coords.longitude
      }
    });

    $scope.user = simpleLogin.getUser();
});
