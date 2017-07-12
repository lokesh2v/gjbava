/**
 * 
 */

var app = angular.module('gjapp', []);

app.controller('gjCtrl', function($scope, $http) {
	
	$scope.header = "Hello";
	
    $http.get("https://gjfunc.azurewebsites.net/api/gists?code=3k63ntwVVZVtr0dfXUksa0zYz9rYSRBayCccsIAgvW2yx5d1Tiq2cQ==")
    .then(function(response) {
        //$scope.myWelcome = response.data;
    	alert(response.data);
    });
    
});