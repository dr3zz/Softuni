softUniApp.controller('MainController', function($scope, mainData) {

	mainData.getNumPages(function(numPages) {
		var resultData = {

		};
		$scope.dataArray = [];
		var numPage = 1;
		for (var i = 0; i < numPages; i++) {
			mainData.getAllAds(numPage, function(resp) {
				$scope.dataArray.push(resp)

			});
			numPage += 1;
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