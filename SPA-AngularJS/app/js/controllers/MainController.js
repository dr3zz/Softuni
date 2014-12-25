softUniApp.controller('MainController', function($scope, mainData) {
	mainData.getAllAds(function (resp) {
		$scope.data = resp;
		
	});
});