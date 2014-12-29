softUniApp.controller('UserController', function($scope, $filter, $rootScope, Auth, userData, pageSize) {
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
		pageSize: 2
	};
	//5/1/11/14
	$scope.publishAdAgain = function (id) {
		userData.publishUserAdAgain(id).then(function (data) {
			$scope.getAds($scope.adsRequestParams);
		},
		function (err) {
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



	function checkIfUserIsLogged() {
		if (Auth.isLoggedUser()) {
			$scope.getAds($scope.adsRequestParams);
		}
	}

	checkIfUserIsLogged();
});