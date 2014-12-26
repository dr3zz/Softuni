softUniApp.factory('mainData', function ($http) {
	var url = 'http://localhost:1337/api/';

	function getNumPages (success) {
		var getUrl = url + 'ads';
		$http({method: 'GET', url: getUrl }).
		success(function (data,status,headers,config) {
			success(data.numPages);
		})
		.error(function (data,status,headers,config) {
			console.log(data);
		});
	}
	function getAllAds (numPage,success) {
		var getUrl = url + 'ads?startpage='  + numPage;
		$http({method: 'GET', url: getUrl }).
		success(function (data,status,headers,config) {
			success(data);
		})
		.error(function (data,status,headers,config) {
			console.log(data);
		});
	}
	function getAllTowns (success) {
		var getUrl = url + 'towns/';
		$http({method:'GET',url: getUrl}).
		success(function (data,status,headers,config) {
			success(data);
		})
		.error(function (data,status,headers,config) {
			console.log(data);
		});
	}
	function getAllCategories (success) {
		var getUrl = url + 'categories/';
		$http({method:'GET',url: getUrl})
		.success(function (data,status,headers,config) {
			success(data);
		})
		.error(function (data,status,headers,config) {
			console.log(data);
		});
	}
	return {
		getAllAds: getAllAds,
		getAllTowns : getAllTowns,
		getAllCategories: getAllCategories,
		getNumPages :getNumPages
	};
});