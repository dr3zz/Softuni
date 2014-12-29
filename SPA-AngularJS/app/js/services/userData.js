softUniApp.factory('userData', function($http, $q, baseUrl, Auth) {
	var userBaseUrl = baseUrl + "user/";

	function getHeaders() {
		$http.defaults.headers.common['Authorization'] = Auth.getAuthorizationHeaders().Authorization;
	}

	function publishUserAdAgain (id) {
		var d = $q.defer();
		var url = userBaseUrl + 'ads/publishagain/' + id;
		$http({
			method: 'PUT',
			url: url
		})
		.success(function (data,status,headers,config) {
			d.resolve(data);
		})
		.error(function (data,status,headers,config) {
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
		var d = $q.defer();
		getHeaders();

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
		publishUserAdAgain : publishUserAdAgain

	};
});