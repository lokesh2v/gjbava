/**
 * 
 */

var app = angular.module('gjapp', []);

app.controller('gjCtrl', function($scope, $http) {
	
	$scope.header = "Hello";
	
    $http.get("https://gjfuncpings.azurewebsites.net/api/HttpTriggerJS1?code=064tNeS9kGAm5JmGblleCNmXOpAhrHNyy1aiRwqpkyWZjYqy3KRrjQ==")
    .then(function(response) {
        $scope.pings = response.data;
    	//console.log(response.data);
    });
    
    $scope.postPing = function() {
    	//alert($scope.user + ' '+$scope.comments);
    	if ($scope.user == null || $scope.user == "" || $scope.comments == null || $scope.comments=="") {
    		alert("Please put in your name and comments!! Lets not make GJD angry with blank comments!!");
    	}
    	else {
	    	$http.get("https://gjfuncpings.azurewebsites.net/api/putPing?code=75Fbf110tKpM4CFrk640CkeAzVDOld4/FrC2Vz56VZ7BPMTIdqa0rg==&user="+$scope.user+"&comments="+$scope.comments)
	        .then(function(response) {
	            if (response.status == 200) {
	            	alert("Thanks for your post!! Please look into what others had to say about GJD under FAN TWEET section.");
	            	$http.get("https://gjfuncpings.azurewebsites.net/api/HttpTriggerJS1?code=064tNeS9kGAm5JmGblleCNmXOpAhrHNyy1aiRwqpkyWZjYqy3KRrjQ==")
	                .then(function(response) {
	                    $scope.pings = response.data;
	                	//console.log(response.data);
	                });
	            }
	            else {
	            	alert("Ooops!! There was some error, please try again :( ");
	            }
	            	//console.log(response);
	        });
    	}
    	
    }
    
});