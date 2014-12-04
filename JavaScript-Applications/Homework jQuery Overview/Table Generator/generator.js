(function() {
	$(document).ready(function() {
		var text, textArray, manufacturer, model, year, price, className;
		$("#button").click(function() {
			text = $('#textarea').val();
			var arr = $.parseJSON(text);
			$.each(arr, function(key, value) {
				manufacturer = $("<td>").text(value.manufacturer);
				year = $("<td>").text(value.year);
				model = $("<td>").text(value.model);
				price = $("<td>").text(value.price);
				className = $("<td>").text(value.class);
				var row = $("<tr>").append(manufacturer, model, year, price, className);
				$("table").append(row);
			});
		});
	});
}());