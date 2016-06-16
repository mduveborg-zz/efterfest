"use strict"

angular.module('efterfestApp')
    .controller('AccountCtrl', function ($scope, user, simpleLogin, fbutil, $timeout, $rootScope, $routeParams, $location, $firebase) {

        $scope.logout = function() {
          simpleLogin.logout();
          $location.path("/");
        };

        $scope.user = user;
        var profile;
        loadProfile(user);

        function loadProfile(user) {
            if( profile ) {
                profile.$destroy();
            }
            profile = fbutil.syncObject('users/' + user.uid);
            profile.$bindTo($scope, 'profile');
        }

        $scope.myParties = fbutil.syncArray("parties", {orderByChild: "creator", equalTo: user.uid});
    });
