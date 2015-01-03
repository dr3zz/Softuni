softUniApp.controller('EditUserProfileController', function($scope, $window, messaging, Auth, userData) {
	 $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.phonePattern = /\(?[+]([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{6})|([0-9]{2,3})[ ]([0-9]{6,7})/g;

	$scope.getUserProfile = function() {
		userData.getUserProfile().then(function(data) {
			$scope.userProfile = data;

		}, function(err) {
			console.log(err);
		});
	};
	$scope.getUserProfile();
});