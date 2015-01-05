softUniApp.controller('EditAdController', function($scope, $cookieStore, userData, $q, messaging, $window) {
	if (!$cookieStore.get('adForEdit')) {
		$window.location.href = '#/user/ads';
	} else {
		adForEdit();
	}

	function adForEdit() {
		var id = $cookieStore.get('adForEdit');
		userData.getAdById(id).then(function(data) {
			$scope.adForEdit = data;
			$scope.imageDataUrl = $scope.adForEdit.imageDataUrl;
		}, function(err) {
			console.log(err);
		});

	}

	$scope.changeImage = function(img) {
		$scope.adForEdit.imageDataUrl = img;
		$scope.adForEdit.changeimage = true;
		messaging.successMessage("Image is loaded, press the edit button to continue");
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
	$scope.deleteImage = function() {
		$scope.adForEdit.imageDataUrl = undefined;
		$scope.imageDataUrl = undefined;
		$scope.adForEdit.changeimage = true;
	};
	$scope.editAdFunction = function() {
		userData.editUserAd($scope.adForEdit).then(function(data) {
			$window.location.href = "/#user/ads";
			messaging.successMessage(data.message);

		}, function(err) {
			if (err.modelState) {
				var error = err.modelState;
				if (error['model.Text']) {
					messaging.errorMessage(error['model.Text'][0]);
				}
				if (error['model.Title']) {
					messaging.errorMessage(error['model.Title'][0]);
				}
				if (error['model.townId']) {
					// messaging.errorMessage(error['model.townId'][0]);
				}
				if (error['model.categoryId']) {
					// messaging.errorMessage(error['model.categoryId'][0]);
				}
			}
			console.log(err);

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
	


});