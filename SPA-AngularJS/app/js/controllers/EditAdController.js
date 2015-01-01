softUniApp.controller('EditAdController', function($scope, userData) {
	$scope.adForEdit = {};
	$scope.$on('valueUpdated', function() {
		$scope.adForEdit = userData.service.adForEdit;
		console.dir($scope.adForEdit);
	});
	$scope.adForEdit = userData.service.adForEdit;
});