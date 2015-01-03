softUniApp.controller('EditAdController', function($scope, userData, $q, messaging,$window) {
	$scope.adForEdit = {};
	$scope.$on('valueUpdated', function() {
		$scope.adForEdit = userData.service.adForEdit;
		$scope.imageDataUrl = $scope.adForEdit.imageDataUrl;
		
	});
	$scope.adForEdit = userData.service.adForEdit;
	$scope.imageDataUrl = $scope.adForEdit.imageDataUrl;
	// $scope.imageDataUrl = userData.service.adForEdit.imageDataUrl;
	$scope.changeImage = function(img) {
		$scope.adForEdit.imageDataUrl = img;
		$scope.adForEdit.changeimage = true;
		userData.service.updateAdForEdit($scope.adForEdit);
	
		
	};
	$scope.fileSelected = function(fileInputField) {
		var name = fileInputField.files[0].name;
		console.log(name);
		var file = fileInputField.files[0];
		var element = fileInputField;
		var imageType = /image.*/;
		if (!file.type.match(imageType)) {
			messaging.errorMessage('Support only images');
			return;
		}
		readFile(file).then(function(values) {
			$scope.imageDataUrl = values;
			$('#filename').text(name);
	
		}, function(err) {
			messaging.errorMessage(err.target.error.message);

		});
	};
	$scope.deleteImage = function () {
		$scope.adForEdit.imageDataUrl = undefined;
		$scope.imageDataUrl = undefined;
		$scope.adForEdit.changeimage = true;
		userData.service.updateAdForEdit($scope.adForEdit);
	
	};
	$scope.editAdFunction = function () {
		userData.editUserAd($scope.adForEdit).then(function (data) {
			$scope.adForEdit = {};
			userData.service.updateAdForEdit($scope.adForEdit);
			$window.location.href = "/#user/ads";
			messaging.successMessage(data.message);
		
		},function (err) {
			if(err.modelState) {
				var error = err.modelState;
				if(error['model.Text']) {
					messaging.errorMessage(error['model.Text'][0]);
				}
				if(error['model.Title']) {
					messaging.errorMessage((error['model.Title'][0]));
				}
			}
			
		});
	};
	function readFile(file) {
		var deferred = $q.defer();

		var reader = new FileReader();
		reader.onload = function(e) {
			deferred.resolve(e.target.result);
		};
		reader.onerror = function(e) {
			deferred.reject(e);
		};
		reader.readAsDataURL(file);

		return deferred.promise;
	}
	$scope.removeEditAd = function () {
		$scope.adForEdit = {};
		userData.service.updateAdForEdit($scope.adForEdit);
		$window.location.href = '#/user/ads';

	}
	if(!$scope.adForEdit.id) {
		$window.location.href = '#/user/ads';
	}

});