softUniApp.controller('UserController', function($scope, $cookieStore, $window, messaging, userData, pageSize) {
	$scope.ready = false;
	var userPageSize = 2;
	$scope.getAds = function(requestParams) {
		userData.getAllUserAds(requestParams).then(function(data) {
				$scope.userAds = data.ads;
				$scope.numItems = data.numItems;
				$scope.ready = true;
			},
			function(err) {
				console.log(err);
			});

	};
	$scope.adsRequestParams = {
		startPage: 1,
		pageSize: userPageSize,
		status: null
	};
	$scope.reloadAds = function() {
		$scope.getAds($scope.adsRequestParams);
	};
	$scope.deactivateAdStauts = function(ad) {
		userData.deactivateUserAd(ad).then(function(data) {
				$scope.getAds($scope.adsRequestParams);
				messaging.successMessage(data.message);
			},
			function(err) {
				// console.log(err);
				messaging.errorMessage(err.message);
			});
	};
	$scope.publishAdAgain = function(ad) {
		userData.publishUserAdAgain(ad).then(function(data) {
				$scope.getAds($scope.adsRequestParams);
				messaging.successMessage(data.message);
			},
			function(err) {
				// console.log(err);
				messaging.errorMessage(err.message);
			});
	};
	$scope.loadDeleteAdPage = function(ad) {
		$cookieStore.put('adForDelete', ad.id);
		$window.location.href = '#/user/ads/delete/' + ad.id;
	};
	$scope.loadEditAdPage = function(ad) {
		$cookieStore.put('adForEdit', ad.id);
		$window.location.href = '#/user/ads/edit/' + ad.id;
	};

	$scope.getAds($scope.adsRequestParams);
});