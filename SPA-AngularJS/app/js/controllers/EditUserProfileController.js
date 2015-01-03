softUniApp.controller('EditUserProfileController', function($scope, $window, messaging, Auth, userData) {
	$scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// $scope.phonePattern = /\(?[+]([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{6})|([0-9]{2,3})[ ]([0-9]{6,7})/g;
	$scope.phonePattern = /([+359]*[\d ])$/;
	$scope.getUserProfile = function() {
		userData.getUserProfile().then(function(data) {
			$scope.userProfile = data;

		}, function(err) {
			console.log(err);
		});
	};
	$scope.editUserProfile = function(user) {
		if ($scope.userPassword.oldPassword) {

		} else {
			userData.editUserProfile(user).then(function(data) {
				
				$window.location.href = '#/user/home';
				messaging.successMessage(data.message);
			}, function(err) {
				console.log(err);
				// messaging.errorMessage
			});
		}

	};
	$scope.$on('valueUpdated', function() {
		$scope.userPassword = userData.service.userPassword;
	});
	$scope.userPassword = userData.service.userPassword;
	$scope.changeUserPassword = function(password) {
		$scope.userPassword = password;
		userData.service.updateUserPassword($scope.userPassword);
	};
	$scope.getUserProfile();
});