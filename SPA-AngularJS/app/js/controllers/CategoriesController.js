softUniApp.controller('CategoriesController', function($scope, $filter, $rootScope, mainData) {
	var getCategories = function() {
		mainData.getAllCategories()
			.then(function(resp) {
				$scope.categories = resp;
			}, function(err) {
				// console.log(err);
			});
	};
	
	getCategories();

});