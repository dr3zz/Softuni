softUniApp.factory('userData', function($http, $q, baseUrl, Auth) {
	var userBaseUrl = baseUrl + "user/";

	function getHeaders() {
		$http.defaults.headers.common['Authorization'] = Auth.getAuthorizationHeaders().Authorization;
	}

	function publishUserAdAgain(id) {
		var d = $q.defer();
		var url = userBaseUrl + 'ads/publishagain/' + id;
		$http({
				method: 'PUT',
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

	function createNewAd(data) {
		var d = $q.defer();
		var url = userBaseUrl + 'ads/';
		$http({
			method : 'POST',
			url: url,
			data : data
		})
		.success(function (data,status,headers,config) {
			d.resolve(data);
		})
		.error(function (data,status,headers,config) {
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

	function deactivateUserAd(id) {
		var d = $q.defer();
		var url = userBaseUrl + "ads/deactivate/" + id;
		$http({
				method: 'PUT',
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
		createNewAd : createNewAd

	};
});