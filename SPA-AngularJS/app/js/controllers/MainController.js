softUniApp.controller('MainController', function($scope, $filter, $rootScope, mainData, pageSize) {
	$scope.activeCategory = null;
	$scope.activeTown = null;
	$scope.activePage = 1;
	$scope.getAds = function(requestParams) {
		getFilteredData();
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
		pageSize: pageSize
	};


	function getFilteredData() {

		if ($scope.activeTown !== null) {

			$scope.adsRequestParams['townid'] = $scope.activeTown;
			$scope.adsRequestParams.startPage = 1;
		} else {
			if ($scope.adsRequestParams['townid']) {
				delete $scope.adsRequestParams['townid'];
			}
		}
		if ($scope.activeCategory !== null) {
			$scope.adsRequestParams['categoryid'] = $scope.activeCategory;
			$scope.adsRequestParams.startPage = 1;

		} else {
			if ($scope.adsRequestParams['categoryid']) {
				delete $scope.adsRequestParams['categoryid'];
			}
		}
	}
	$scope.removeFilters = function() {
		if ($scope.activeTown) {
			$scope.activeTown = null;
		}
		if ($scope.activeCategory) {
			$scope.activeCategory = null;
		}
		getFilteredData();
		$scope.getAds($scope.adsRequestParams);

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