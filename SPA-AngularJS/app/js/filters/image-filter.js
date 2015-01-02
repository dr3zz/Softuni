softUniApp.filter('searchResultImg', function() {
	return function(input) {
		if (typeof(input) == "undefined" || (!input)) {
			return "/imgs/no-image.jpg";
		} else {
			return input;
		}
	};
});