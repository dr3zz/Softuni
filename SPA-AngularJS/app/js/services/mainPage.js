softUniApp.factory('mainData', function($http, $q) {
	var url = 'http://localhost:1337/api/';

	function getNumPages() {
		var d = $q.defer();
		var getUrl = url + 'ads';
		$http({
			method: 'GET',
			url: getUrl
		}).
		success(function(data, status, headers, config) {
				d.resolve(data.numPages);
			})
			.error(function(data, status, headers, config) {
				d.reject(data);
			});
		return d.promise;
	}

	function getAllAds(numPage) {
		var d = $q.defer();
		var getUrl = url + 'ads?startpage=' + numPage;
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

	function getAllTowns() {
		var getUrl = url + 'towns/';
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
		var getUrl = url + 'categories/';
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
		getNumPages: getNumPages
	};
});