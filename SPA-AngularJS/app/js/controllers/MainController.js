softUniApp.controller('MainController', function($scope, $filter, $rootScope, mainData, pageSize) {
	
	$scope.getAds = function(requestParams) {
	
		mainData.getAllAds(requestParams).then(function(data) {

				$scope.dataAds = data.ads;
				$scope.pagesArr = new Array(data.numPages);
				$scope.numPages = data.numPages;
			},
			function(err) {
				console.log(err);
			});
	};
	var getTowns = function() {
		mainData.getAllTowns()
			.then(function(resp) {
				$scope.towns = resp;
			}, function(err) {
				console.log(err);
			});
	};
	var getCategories = function() {
		mainData.getAllCategories()
			.then(function(resp) {
				$scope.categories = resp;
			}, function(err) {
				console.log(err);
			});
	};
	$scope.adsRequestParams = {
		startPage: 1,
		pageSize: pageSize,
		townId : null,
		categoryId : null
	};



	$scope.selectedTown = function(id) {
		if (!id) {
			$scope.activeTown = null;
		} else {
			$scope.activeTown = id;
		}
		$scope.getAds($scope.adsRequestParams);
	};
	$scope.selectedCategory = function(id) {
		if (!id) {
			$scope.activeCategory = null;
		} else {
			$scope.activeCategory = id;
		}
		$scope.getAds($scope.adsRequestParams);
	};
	$scope.getAds($scope.adsRequestParams);
	getTowns();
	getCategories();

});