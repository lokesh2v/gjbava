/**
 * 
 */

var app = angular.module('gjapp', []);
app.controller('glCtrl', function($scope, $http) {
    $http.get("welcome.htm")
    .then(function(response) {
        $scope.myWelcome = response.data;
    });
});