var clientMgr = angular.module('clients', []);

clientMgr.controller('clientController', function($scope, $http) {
	$scope.clientsList = {};

  $http.get('/api/get-clients').
    success(function(data){
      $scope.clientsList = data;
    }).
    error(function(err){
      console.log(err);
    });

    $scope.verifyClient = function(client){
      $http({
        method: 'POST',
        url: '/verifyapi/verifyClient',
        data: {"PersonInfo": {
                  "id" : client.id,
                  "firstName": client.firstName,
                  "lastName": client.lastName,
                  "dateOfBirth": client.dateOfBirth
                }},
        headers : { 'Content-Type': 'application/json' }
      }).then(function(resp){
        client.verified = resp.data[0].status;
      }, function(resp){
        console.log(resp.status);
      });

    }
});
