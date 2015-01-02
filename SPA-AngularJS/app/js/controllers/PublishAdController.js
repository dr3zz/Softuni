softUniApp.controller('PublishAdController', function($scope, $filter, $window, $rootScope, messaging,  userData) {
	$scope.createNewAd = function() {
		userData.createNewAd($scope.newAdObj).then(function(data) {
			messaging.successMessage(data.message);
			$window.location.href = '#/user/ads';

		}, function(err) {
			var error = errorMessageOnPublishAd(err);
			messaging.errorMessage(error);
		
		});
	};
	$scope.publishAdAgain = function(id) {
		userData.publishUserAdAgain(id).then(function(data) {
				$scope.getAds($scope.adsRequestParams);
			},
			function(err) {
				console.log(err);
			});
	};
	
	function errorMessageOnPublishAd(error) {
		if(error.message) {
			return "The Text and Title fields are required.";
		}
	}
	
});