(function() {
	$(document).ready(function() {
		var buttonAfter = $('#addElementAfter');
		var buttonBefore = $('#addElementBefore');

		buttonAfter.click(function() {
			$("<p>").text("I am paragraph after").appendTo($("#container"));
		});
		buttonBefore.click(function() {
			$("<p>").text("I am paragraph before").prependTo($("#container"));
		});

	});
}());