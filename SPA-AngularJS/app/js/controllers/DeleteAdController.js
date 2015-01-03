softUniApp.controller('DeleteAdController', function($scope, $window, userData, messaging) {
	$scope.adForDelete = {};
	$scope.$on('valueUpdated', function() {
		$scope.adForDelete = userData.service.adForDelete;
		
	});
	$scope.adForDelete = userData.service.adForDelete;
	$scope.deleteAd = function() {
		userData.deleteUserAd($scope.adForDelete.id).then(function(data) {
			$window.location.href = '#/user/ads';
			$scope.adForDelete = {};
			userData.service.updateAdForDelete($scope.adForDelete);
			messaging.successMessage(data.message);
		}, function(err) {
			console.log("this is error" + err);
			messaging.errorMessage(err);
		});
	};
	$scope.removeDeleteAd = function() {
		$scope.adForDelete = {};
		userData.service.updateAdForDelete($scope.adForDelete);
		$window.location.href = '#/user/ads';
	};
	// if (!$scope.adForDelete.id) {
	// 	$window.location.href = '#/user/ads';
	// }
});