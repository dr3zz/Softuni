softUniApp.controller('EditUserProfileController', function($scope, $window, messaging, userData) {
	$scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// $scope.phonePattern = /\(?[+]([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{6})|([0-9]{2,3})[ ]([0-9]{6,7})/g;
	$scope.phonePattern = /([+359]*[\d ])$/;
	$scope.getUserProfile = function() {
		userData.getUserProfile().then(function(data) {
			$scope.userProfile = data;
			userData.service.updateUserPassword({});
		}, function(err) {
			// console.log(err);
		});
	};
	$scope.editUserProfile = function(user) {
		if ($scope.userPassword.oldPassword) {
			userData.changeUserPassword($scope.userPassword).then(function(data) {
				userData.service.updateUserPassword({});
				updateProfile(user);
			}, function(err) {
				if (err.modelState) {
					var error = err.modelState;

					if (error['model.ConfirmPassword']) {
						messaging.errorMessage(error['model.ConfirmPassword'][0]);
					}
					if (error['']) {
						messaging.errorMessage(error[''][0]);
					}
				} else {
					messaging.errorMessage(err.message);
				}


			});
		} else {
			updateProfile(user);
		}

	};

	function updateProfile(user) {
		userData.editUserProfile(user).then(function(data) {
			$window.location.href = '#/user/home';
			messaging.successMessage(data.message);
		}, function(err) {

			console.log(err);
			// messaging.errorMessage
		});
	}
	$scope.$on('valueUpdated', function() {
		$scope.userPassword = userData.service.userPassword;
	});
	$scope.userPassword = userData.service.userPassword;
	$scope.changeUserPassword = function(password) {
		if (password.newPassword != password.confirmPassword) {
			messaging.errorMessage("The new password and confirmation password do not match.");
			return;
		}
		$scope.userPassword = password;
		userData.service.updateUserPassword($scope.userPassword);
		messaging.successMessage("Assigned a new password click Update button to continue");
	};
	$scope.DeletePasswordUpdate = function() {
		$scope.userPassword = {};
		userData.service.updateUserPassword($scope.userPassword);
	};
	$scope.getUserProfile();
});