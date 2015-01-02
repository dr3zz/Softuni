softUniApp.factory('userData', function($http, $q, baseUrl, Auth, $rootScope) {
	var userBaseUrl = baseUrl + "user/";
	var service = {};
	service.adForDelete = {};
	service.adForEdit = {};
	
	service.updateAdForDelete = function(value) {
		this.adForDelete = value;
		$rootScope.$broadcast('valueUpdated');
	};

	service.updateAdForEdit = function(value) {
		this.adForEdit = value;
		$rootScope.$broadcast('valueUpdated');
	};

	function getHeaders() {
		$http.defaults.headers.common['Authorization'] = Auth.getAuthorizationHeaders().Authorization;
	}

	function publishUserAdAgain(data) {
		var d = $q.defer();
		var url = userBaseUrl + 'ads/publishagain/' + data.id;
		$http({
				method: 'PUT',
				url: url,
				data : data
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}
	function editUserAd (data) {
		var d = $q.defer();
		var url = userBaseUrl + 'ads/' + data.id;
		$http({
			method: 'PUT',
			url:url,
			data: data
		})
		.success(function (data,status,headers,config) {
			d.resolve(data);
		})
		.error(function (data,status,headers,config) {
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
				url: url
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
				data:data
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
				url: url
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
		getHeaders();
		var d = $q.defer();
		$http({
				method: 'GET',
				url: userBaseUrl + 'ads/',
				params: params
			})
			.success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});

		return d.promise;
	}


	return {
		getAllUserAds: getAllUserAds,
		getHeaders: getHeaders,
		deactivateUserAd: deactivateUserAd,
		publishUserAdAgain: publishUserAdAgain,
		deleteUserAd: deleteUserAd,
		createNewAd: createNewAd,
		getAdById: getAdById,
		editUserAd : editUserAd,
		service: service,


	};
});