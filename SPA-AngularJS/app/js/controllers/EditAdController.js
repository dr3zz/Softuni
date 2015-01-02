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
		$scope.adForEdit.imageDataUrl = null;

		userData.service.updateAdForEdit($scope.adForEdit);
		delete $scope.imageDataUrl;
	};
	$scope.editAdFunction = function () {
		console.log($scope.adForEdit.imageDataUrl);
		userData.editUserAd($scope.adForEdit).then(function (data) {
			console.log("ad edited");
			$window.location.href = "/#user/ads"
		},function (err) {
			console.log(err);
		})
	}
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

});