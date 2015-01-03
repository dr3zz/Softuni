softUniApp.controller('UserController', function($scope, $window,messaging, Auth, userData, pageSize) {
	
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
			},
			function(err) {
				console.log(err);
			});
	};
	$scope.publishAdAgain = function (ad) {
		userData.publishUserAdAgain(ad).then(function (data) {
			$scope.getAds($scope.adsRequestParams);
		},
		function (err) {
			console.log(err);
		});
	}
	$scope.loadDeleteAdPage = function(ad) {
		$window.location.href = '#/user/ads/delete/' + ad.id;
		userData.getAdById(ad.id).then(function(data) {
			userData.service.updateAdForDelete(data);

		}, function(err) {
			console.log(err);
		});


	};
	$scope.loadEditAdPage = function(ad) {
		$window.location.href = '#/user/ads/edit/' + ad.id;
		userData.getAdById(ad.id).then(function(data) {
			userData.service.updateAdForEdit(data);
		}, function(err) {
			console.log(err);
		});
	};

	function checkIfUserIsLogged() {
		if (Auth.isLoggedUser()) {
			$scope.getAds($scope.adsRequestParams);
		}
	}



	checkIfUserIsLogged();
});