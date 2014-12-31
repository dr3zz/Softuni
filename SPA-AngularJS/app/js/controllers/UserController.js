softUniApp.controller('UserController', function($scope, $filter, $window, $rootScope, Auth, userData, pageSize) {
	
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
		status : null
	};
	$scope.createNewAd = function () {
		userData.createNewAd($scope.newAdObj).then(function (data) {
			console.log("new add");
			//TODO do something
		},function (err) {
			console.log('publish add error' + err);
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
	$scope.deactivateAdStauts = function(id) {
		userData.deactivateUserAd(id).then(function(data) {
				$scope.getAds($scope.adsRequestParams);
			},
			function(err) {
				console.log(err);
			});
	};

	$scope.loadDeleteAdPage = function(ad) {
		$window.location.href = '#/user/ads/delete/' + ad.id;
	};
	

	function checkIfUserIsLogged() {
		if (Auth.isLoggedUser()) {
			$scope.getAds($scope.adsRequestParams);
		}
	}

	
	

	checkIfUserIsLogged();
});