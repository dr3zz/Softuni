softUniApp.controller('UserController', function($scope,$cookieStore, $window, messaging, userData, pageSize) {

	$scope.getAds = function(requestParams) {
		userData.getAllUserAds(requestParams).then(function(data) {
				$scope.userAds = data.ads;
				$scope.pagesArr = new Array(data.numPages);
				$scope.numPages = data.numPages;
			},
			function(err) {
				console.log(err);
			});

	};
	$scope.adsRequestParams = {
		startPage: 1,
		pageSize: 2,
		status: null
	};

	$scope.deactivateAdStauts = function(ad) {
		userData.deactivateUserAd(ad).then(function(data) {
				$scope.getAds($scope.adsRequestParams);
				messaging.successMessage(data.message);
			},
			function(err) {
				console.log(err);
			});
	};
	$scope.publishAdAgain = function(ad) {
		userData.publishUserAdAgain(ad).then(function(data) {
				$scope.getAds($scope.adsRequestParams);
				messaging.successMessage(data.message);
			},
			function(err) {
				console.log(err);
			});
	};
	$scope.loadDeleteAdPage = function(ad) {
		$cookieStore.put('adForDelete',ad.id);
		$window.location.href = '#/user/ads/delete/' + ad.id;
	};
	$scope.loadEditAdPage = function(ad) {
		$cookieStore.put('adForEdit',ad.id);
		$window.location.href = '#/user/ads/edit/' + ad.id;
	};

$scope.getAds($scope.adsRequestParams);
});