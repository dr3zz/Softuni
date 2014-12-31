softUniApp.factory('messaging', [function() {
	function errorMessage(message) {

		noty({
			text: message,
			closeWith: ['click'],
			type: 'error',
			layout: 'center',
			timeout: 5000
		});
		// $('#notes').notify().errorMessage('', message);
	}

	function successMessage(message) {
		noty({
			text: message,
			closeWith: ['click'],
			type: 'success',
			layout: 'topCenter',
			timeout: 5000
		});
		// $('#notes').notify().successMessage(message);
	}

	return {
		errorMessage: errorMessage,
		successMessage: successMessage
	};

}]);