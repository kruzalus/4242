$(document).ready(function() {
	
	$('.js-slider').each(function(){
		var slider 	= $(this),
			arr 	= slider.parent().find('.arrows');
		slider.slick({
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 700,
			fade: true,
			autoplay: true,
			autoplaySpeed: 2000,
			appendArrows: arr,
			appendDots: arr,
			prevArrow: '<a href="#" class="arrow is-prev"><i class="icon icon-uni77"></i></a>',
			nextArrow: '<a href="#" class="arrow is-next"><i class="icon icon-uni57"></i></a>',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						adaptiveHeight: true
					}
				}
			]
		});
	});
		

});