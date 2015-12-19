"use strict"
angular.module('efterfestApp')
    .controller('FindCtrl', function ($scope, fbutil, $location, $rootScope) {

      $scope.map = {
        center: {
          latitude: 62,
          longitude: 15
        },
        zoom: 4
      };

      $scope.ads = fbutil.syncArray("parties");

      $scope.events = {
        click: function(marker, eventName, args) {
          $location.path("/efterfest/" + marker.key)
        }
      }
    });
