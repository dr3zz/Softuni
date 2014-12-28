softUniApp.factory('mainData', function($http, $q, baseUrl) {
	var url = 'http://localhost:1337/api/';


	function getAllAds(params) {
		var d = $q.defer();

		$http({
				method: 'GET',
				url: baseUrl + 'ads/',
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

	function getAllTowns() {
		var getUrl = baseUrl + 'towns/';
		var d = $q.defer();
		$http({
			method: 'GET',
			url: getUrl
		}).
		success(function(data, status, headers, config) {
				d.resolve(data);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}

	function getAllCategories() {
		var d = $q.defer();
		var getUrl = baseUrl + 'categories/';
		$http({
				method: 'GET',
				url: getUrl
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
		getAllAds: getAllAds,
		getAllTowns: getAllTowns,
		getAllCategories: getAllCategories,

	};
});