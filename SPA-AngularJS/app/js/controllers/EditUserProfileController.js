softUniApp.controller('EditUserProfileController', function($scope, $window, messaging, Auth, userData) {
	$scope.getUserProfile = function() {
		userData.getUserProfile().then(function(data) {
			$scope.userProfile = data;
		}, function(err) {
			console.log(err);
		});
	};
	$scope.getUserProfile();
});