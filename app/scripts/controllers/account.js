
angular.module('efterfestApp')
    .controller('AccountCtrl', function ($scope, user, simpleLogin, fbutil, $timeout, $rootScope, $routeParams, $location) {

        $scope.tab = $routeParams.tab || "efterfester";

        $scope.logout = function() {
          simpleLogin.logout();
          $location.path("/");
        };

        $scope.messages = [];

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


        $scope.sentRequests = fbutil.syncArray("requests", {orderByChild: "requestCreator", equalTo: user.uid})

        $scope.receivedRequests = fbutil.syncArray("requests", {orderByChild: "partyHost", equalTo: user.uid})

        $scope.myParties = fbutil.syncArray("parties", {orderByChild: "creator", equalTo: user.uid})

        $scope.approve = function(request, approved) {
          request.approved = approved;
          $scope.receivedRequests.$save(request);
        }


    });
