 $(function() {
 	var wrapper = $('<div/>').css({
 		height: 0,
 		width: 0,
 		'overflow': 'hidden'
 	});
 	var fileInput = $(':file').wrap(wrapper);
 	fileInput.change(function() {
 		$this = $(this);
 		// If the selection is empty, reset it
 		if ($this.val().length == 0) {
 			$('#filepath').val('asd');
 		} else {
 			var asd = $this.val().replace("C:\\fakepath\\", "");

 			$('#filepath').val(asd);
 		}
 	})
 	$('#wrapper').on('change', "#imageInfo", function(e) {
 			var files = e.target.files;
 			for (var i = 0; i < files.length; i++) {
 				var file = files[i];
 				var imageType = /image.*/;
 				if (!file.type.match(imageType)) {
 					continue;
 				}
 				var img = document.getElementById("thumbnil");
 				img.file = file;
 				var reader = new FileReader();
 				reader.onload = (function(aImg) {
 					return function(e) {
 						aImg.src = e.target.result;
 					};
 				})(img);
 				reader.readAsDataURL(file);
 			}
 			
 		})
 	$('#filebutton').click(function() {
 		fileInput.click();
 	}).show();
 });


 