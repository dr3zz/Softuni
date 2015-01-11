softUniApp.factory('messaging', [function() {
	function errorMessage(message) {

		noty({
			text: message,
			closeWith: ['click'],
			type: 'error',
			layout: 'center',
			timeout: 5000
		});
	}

	function successMessage(message) {
		noty({
			text: message,
			closeWith: ['click'],
			type: 'success',
			layout: 'topCenter',
			timeout: 5000
		});
	}

	return {
		errorMessage: errorMessage,
		successMessage: successMessage
	};

}]);