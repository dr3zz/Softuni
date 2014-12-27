softUniApp.controller('MainController', function($scope, $filter, mainData) {


	mainData.getNumPages().then(function(data) {
		$scope.dataArray = [];
		for (var i = 1; i <= data; i++) {
			mainData.getAllAds(i, data).then(function(data) {
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
		$scope.town_id = id;
		$scope.activeTown = id;
		console.log($scope.town_id);
		//TODO get town By id from server
		return $filter('filter')($scope.dataArray, {
			townId: id
		});
	};
	$scope.selectedCategory = function (id) {
		$scope.activeCategory = id;
		//TODO get town By id from server
	}
	

	// $scope.filterTowns = {};
	$scope.filterCategories = {};
});