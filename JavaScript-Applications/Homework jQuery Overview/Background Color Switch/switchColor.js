(function () {
	$(document).ready(function() {
	var className,color;
	$('#pain').click(function(){
		className = $("#className").val();
		color = $("#color").val();
		$("." + className).css("background-color", color);
	});
});
}());
