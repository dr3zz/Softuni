softUniApp.directive('filtercontroller', [function() {
	return {
		restrict: 'A',
		controller: function($scope) {
			$scope.activePage = 1;
			$scope.adStatus = 'all';
			$scope.activeTown = 'all';
			$scope.activeCategory = 'all';
			function clearFilter () {
				if($scope.adsRequestParams.status) {
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
				// $scope.getAds($scope.adsRequestParams);
				this.firstPage();
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
				// $scope.getAds($scope.adsRequestParams);
				this.firstPage();
			};
			this.addUserAdsStatus = function(status) {
				if (status) {
					$scope.adStatus = status;
				} else {
					$scope.adStatus = 'all';
				}
				$scope.adsRequestParams.status = status;
		
				this.setStartPage(1)
				// $scope.getAds($scope.adsRequestParams);
				// this.firstPage();

			};
			this.firstPage = function() {
				$scope.adsRequestParams.startPage = 1;
				$scope.activePage = 1;
				$scope.getAds($scope.adsRequestParams);
			
			};
			this.prevPage = function() {
				if (parseInt($scope.adsRequestParams.startPage) > 1) {
					$scope.adsRequestParams.startPage -= 1;
					$scope.activePage -= 1;
				}
				$scope.getAds($scope.adsRequestParams);

			};
			this.setStartPage = function(startPage) {
				$scope.adsRequestParams.startPage = startPage;

				$scope.activePage = startPage;
				$scope.getAds($scope.adsRequestParams);
			};
			this.nextPage = function() {
				if (parseInt($scope.adsRequestParams.startPage) < $scope.pagesArr.length) {
					$scope.adsRequestParams.startPage += 1;
					$scope.activePage += 1;
				}
				$scope.getAds($scope.adsRequestParams);
			};

			this.lastPage = function(length) {
				$scope.adsRequestParams.startPage = length;
				$scope.activePage = length;
				$scope.getAds($scope.adsRequestParams);
			};

		},
		// link: function(scope, element, iAttrs) {
		// 	element.bind('mouseenter',function () {
		// 		console.log(scope.adsRequestParams);
		// 	})
		// }
	};
}]);