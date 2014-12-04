(function() {
	$(document).ready(function(argument) {
		'use strict';

		$(function() {

			//settings for slider
			var width = 720;
			var animationSpeed = 1000;
			var pause = 5000;
			var currentSlide = 1;

			//cache DOM elements
			var $slider = $('#slider');
			var $slideContainer = $('.slides', $slider);
			var $slides = $('.slide', $slider);
			var $left = $('#left');
			var $right = $('#right');
			var interval;

			function startSlider() {
				interval = setInterval(function() {
					$slideContainer.animate({
						'margin-left': '-=' + width + "px"
					}, animationSpeed, moveSlide);
				}, pause);

			}

			function pauseSlider() {
				clearInterval(interval);
			}

			function moveLeft() {
				clearInterval(interval);
				startSlider();
				$slideContainer.animate({
					'margin-left': '-=' + width + "px"
				}, animationSpeed,  moveSlide);
			}

			function moveRight() {
				clearInterval(interval);
				startSlider();
				if(currentSlide == 1) {
					$slideContainer.css('margin-left', - (($slides.length - 1) * width));
					currentSlide = $slides.length;
				}

				$slideContainer.animate({
					'margin-left': '+=' + width + "px"
				}, animationSpeed,  function  () {
					--currentSlide;
					if(currentSlide <= 1) {
						currentSlide = $slides.length;
						$slideContainer.css('margin-left', - (($slides.length - 1) * width));

					}
				});
			}
			function moveSlide () {
				++currentSlide;
					if (currentSlide >= $slides.length) {
						currentSlide = 1;
						$slideContainer.css('margin-left', 0);
					}
					console.log(currentSlide);
			}
			

			$left.on('click', moveLeft);
			$right.on('click', moveRight);
			$slideContainer
				.on('mouseenter', pauseSlider)
				.on('mouseleave', startSlider);

			startSlider();
		});
	});
}());