softUniApp.factory('mainData', function ($http) {
	var url = 'http://localhost:1337/api/';
	function getAllAds (success) {
		var getUrl = url + 'ads/';
		$http({method: 'GET', url: getUrl }).
		success(function (data,status,headers,config) {
			success(data);
		})
		.error(function (data,status,headers,config) {
			console.log(data);
		});
	}
	return {
		getAllAds: getAllAds
	};
});