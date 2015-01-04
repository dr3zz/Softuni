softUniApp.factory('userData', function($http, $q, baseUrl, Auth, $rootScope) {
	var userBaseUrl = baseUrl + "user/";
	var service = {};
	// service.adForDelete = {};
	// service.adForEdit = {};
	service.userPassword = {};

	// service.updateAdForDelete = function(value) {
	// 	this.adForDelete = value;
	// 	$rootScope.$broadcast('valueUpdated');
	// };
	service.updateUserPassword = function(value) {
		this.userPassword = value;
		$rootScope.$broadcast('valueUpdated');
	};
	// service.updateAdForEdit = function(value) {
	// 	this.adForEdit = value;
	// 	$rootScope.$broadcast('valueUpdated');
	// };
	var headers = Auth.getAuthorizationHeaders();

	function publishUserAdAgain(data) {
		var d = $q.defer();
		var url = userBaseUrl + 'ads/publishagain/' + data.id;
		$http({
				method: 'PUT',
				url: url,
				data: data,
				headers: headers,
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}

	function editUserAd(data) {
		var d = $q.defer();
		var url = userBaseUrl + 'ads/' + data.id;
		$http({
				method: 'PUT',
				url: url,
				data: data,
				headers: headers,
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}

	function createNewAd(data) {

		var d = $q.defer();
		var url = userBaseUrl + 'ads/';
		$http({
				method: 'POST',
				url: url,
				headers: headers,
				data: data
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}

	function deleteUserAd(id) {
		var d = $q.defer();
		var url = userBaseUrl + 'ads/' + id;
		$http({
				method: 'DELETE',
				url: url,
				headers: headers,
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}

	function deactivateUserAd(data) {
		var d = $q.defer();
		var url = userBaseUrl + "ads/deactivate/" + data.id;
		$http({
				method: 'PUT',
				url: url,
				data: data,
				headers: headers,
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}

	function getAdById(id) {
		var d = $q.defer();
		var url = userBaseUrl + 'ads/' + id;
		$http({
				method: 'GET',
				url: url,
				headers: headers,
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}

	function getAllUserAds(params) {
		var d = $q.defer();
		$http({
				method: 'GET',
				url: userBaseUrl + 'ads',
				params: params,
				headers: headers,
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});

		return d.promise;
	}

	function getUserProfile() {
		var d = $q.defer();
		var url = userBaseUrl + 'profile/';
		$http({
				method: 'GET',
				url: url,
				headers: headers
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}

	function editUserProfile(user) {
		var d = $q.defer();
		var url = userBaseUrl + 'profile/';
		$http({
				method: 'PUT',
				url: url,
				headers: headers,
				data: user
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers,config) {
				d.reject(data);
			});
		return d.promise;
	}
	function changeUserPassword (password) {
		var d = $q.defer();
		var url = userBaseUrl + 'changepassword/';
		$http({
			method: 'PUT',
			url: url,
			headers:headers,
			data: password
		})
		.success(function (data,status,headers,config) {
			d.resolve(data);
		})
		.error(function (data,status,headers,config) {
			d.reject(data);
		});
		return d.promise;
	}


	return {
		getAllUserAds: getAllUserAds,
		deactivateUserAd: deactivateUserAd,
		publishUserAdAgain: publishUserAdAgain,
		deleteUserAd: deleteUserAd,
		createNewAd: createNewAd,
		getAdById: getAdById,
		editUserAd: editUserAd,
		getUserProfile: getUserProfile,
		editUserProfile : editUserProfile,
		changeUserPassword : changeUserPassword,
		service: service,


	};
});