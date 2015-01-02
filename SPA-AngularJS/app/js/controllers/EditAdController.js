softUniApp.controller('EditAdController', function($scope, userData) {
	$scope.adForEdit = {};
	$scope.$on('valueUpdated', function() {
		$scope.adForEdit = userData.service.adForEdit;
		$scope.imageDataUrl = userData.service.adForEdit.imageDataUrl;
	});
	$scope.adForEdit = userData.service.adForEdit;
	$scope.imageDataUrl = userData.service.adForEdit.imageDataUrl;
});