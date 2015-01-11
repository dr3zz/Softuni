softUniApp.directive('filtercontroller', [function() {
	return {
		restrict: 'A',
		controller: function($scope) {
			$scope.activePage = 1;
			$scope.adStatus = 'all';
			$scope.activeTown = 'all';
			$scope.activeCategory = 'all';

			function clearFilter() {
				if ($scope.adsRequestParams.status) {
					$scope.adsRequestParams.status = null;
				}

			}
			this.addTown = function(town) {
				if (town) {
					$scope.activeTown = town;
				} else {
					$scope.activeTown = 'all';
				}
				$scope.adsRequestParams.startPage = 1;
				$scope.adsRequestParams.townId = town;
				clearFilter();
				$scope.getAds($scope.adsRequestParams);
			};
			this.addCategory = function(category) {
				if (category) {
					$scope.activeCategory = category;
				} else {
					$scope.activeCategory = 'all';
				}
				$scope.adsRequestParams.startPage = 1;
				$scope.adsRequestParams.categoryId = category;
				clearFilter();
				$scope.getAds($scope.adsRequestParams);
			};
			this.addUserAdsStatus = function(status) {
				if (status) {
					$scope.adStatus = status;
				} else {
					$scope.adStatus = 'all';
				}
				$scope.adsRequestParams.status = status;
				$scope.adsRequestParams.startPage = 1;
				$scope.getAds($scope.adsRequestParams);
			};


		},
	};
}]);