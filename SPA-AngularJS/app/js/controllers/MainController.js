softUniApp.controller('MainController', function($scope, mainData) {

	mainData.getNumPages(function(numPages) {
		$scope.dataArray = [];
		for (var i = 1; i <= numPages; i++) {
			mainData.getAllAds(i, function(resp) {
				for (var j = 0; j < resp.ads.length; j++) {
					$scope.dataArray.push(resp.ads[j]);
				};

			});
		}
	});

	mainData.getAllTowns(function(resp) {
		$scope.towns = resp;
	});
	mainData.getAllCategories(function(resp) {
		$scope.categories = resp;
	});
	$scope.selectedTown = function(id) {
		$scope.activeTown = id;
	};
	$scope.selectedCategory = function(id) {
		$scope.activeCategory = id;
	};
	$scope.filterTowns = {};
	$scope.filterCategories = {};
});