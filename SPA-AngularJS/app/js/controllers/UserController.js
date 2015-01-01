softUniApp.controller('UserController', function($scope, $filter, $window, $rootScope, messaging, Auth, userData, pageSize) {

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
	$scope.deactivateAdStauts = function(id) {
		userData.deactivateUserAd(id).then(function(data) {
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