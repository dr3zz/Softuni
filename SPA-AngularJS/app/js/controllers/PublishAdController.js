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
	
	
	function errorMessageOnPublishAd(error) {
		if(error.message) {
			return "The Text and Title fields are required.";
		}
	}
	
});