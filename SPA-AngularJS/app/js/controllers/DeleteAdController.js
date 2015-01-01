softUniApp.controller('DeleteAdController', function($scope, $window, userData, messaging) {
	$scope.adForDelete = {};
	$scope.$on('valueUpdated', function() {
		$scope.adForDelete = userData.service.adForDelete;
		console.dir($scope.adForDelete);
	});
	$scope.adForDelete = userData.service.adForDelete;
	$scope.deleteAd = function() {
		userData.deleteUserAd($scope.adForDelete.id).then(function(data) {
			$window.location.href = '#/user/ads';
			messaging.successMessage(data.message);
		}, function(err) {
			console.log("this is error" + err);
			messaging.errorMessage(err);
		});
	};

});