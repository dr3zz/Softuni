softUniApp.controller('DeleteAdController', function($scope, $cookieStore, $window, userData, messaging) {
	if (!$cookieStore.get('adForDelete')) {
		$window.location.href = '#/user/ads';
	} else {
		// console.log($cookieStore.get('adForDelete'));
		adForDelete();
	}

	function adForDelete() {
		var id = $cookieStore.get('adForDelete');
		userData.getAdById(id).then(function(data) {
			$scope.adForDelete = data;
		}, function(err) {
			console.log(err);
		});
	}
	$scope.deleteAd = function() {
		var id = $cookieStore.get('adForDelete');
		userData.deleteUserAd(id).then(function(data) {
			$window.location.href = '#/user/ads';
			messaging.successMessage(data.message);
		}, function(err) {
			messaging.errorMessage(err);
		});
	};
});