softUniApp.controller('MainController', function($scope, $filter, $rootScope, mainData, pageSize) {

	$scope.getAds = function(requestParams) {
		mainData.getAllAds(requestParams).then(function(data) {
				$scope.dataAds = data.ads;
				$scope.numItems = data.numItems;
				$scope.ready = true;
			},
			function(err) {
				console.log(err);
			});
	};

	$scope.adsRequestParams = {
		startPage: 1,
		pageSize: pageSize,
		townId: null,
		categoryId: null
	};
	$scope.reloadAds = function() {
		$scope.getAds($scope.adsRequestParams);
	};

	$scope.getAds($scope.adsRequestParams);

});