softUniApp.controller('MainController', function($scope, $filter, $rootScope, mainData) {

	loadPage();
	function loadPage() {
		mainData.getNumPages().then(function(data) {
			$scope.dataArray = [];
			var filterUrl = getFilteredData();

			for (var i = 1; i <= data; i++) {
				mainData.getAllAds(i, filterUrl).then(function(data) {
					for (var j = 0; j < data.ads.length; j++) {
						$scope.dataArray.push(data.ads[j]);
					}

				}, function(err) {
					console.log(err);
				});
			}

		}, function(err) {
			console.log(err);
		});
	};

	$scope.activeCategory = null;
	$scope.activeTown = null;

	function getFilteredData() {
		var resultParameters = '';

		if ($scope.activeTown !== null) {
			resultParameters += '&townid=' + $scope.activeTown;

		}
		if ($scope.activeCategory !== null) {
			resultParameters += '&categoryid=' + $scope.activeCategory;
		}
		return resultParameters;
	}
	mainData.getAllTowns()
		.then(function(resp) {
			$scope.towns = resp;
		}, function(err) {
			console.log(err);
		});
	mainData.getAllCategories()
		.then(function(resp) {
			$scope.categories = resp;
		}, function(err) {
			console.log(err);
		});

	$scope.selectedTown = function(id) {
		if (!id) {
			$scope.activeTown = null;
		} else {
			$scope.activeTown = id;
		}
		loadPage();
	};
	$scope.selectedCategory = function(id) {
		if (!id) {
			$scope.activeCategory = null;
		} else {
			$scope.activeCategory = id;
		}
		loadPage();
	}


	// $scope.filterTowns = {};
	// $scope.filterCategories = {};
});