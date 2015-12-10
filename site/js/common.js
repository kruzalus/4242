$(document).ready(function() {
	
	// slider
	$('.js-slider').each(function(){
		var slider 	= $(this),
			arr 	= slider.parent().find('.arrows');
		slider.slick({
			dots 			: true,
			infinite 		: true,
			slidesToShow 	: 1,
			slidesToScroll 	: 1,
			speed 			: 700,
			fade 			: true,
			autoplay 		: true,
			autoplaySpeed 	: 2000,
			appendArrows 	: arr,
			appendDots 		: arr,
			prevArrow 		: '<a href="#" class="arrow is-prev"><i class="icon icon-uni77"></i></a>',
			nextArrow 		: '<a href="#" class="arrow is-next"><i class="icon icon-uni57"></i></a>',
			responsive 		: [
				{
					breakpoint 	: 1024,
					settings 	: {
						adaptiveHeight: true
					}
				}
			]
		});
	}); 

	// select
	$(".js-select select").on('change', function() {
		var text = $(this).val();
		$(this).parents('.js-select').find('.js-input').val(text);
	});

	// open menu
	$('.js-btn-header').on('click', function(){
		var wind 	= $(window).height(),
			out 	= $('.out').height();
		if(out > wind) {
			$('body').toggleClass('is-scroll');
		}
		$(this).toggleClass('is-active');
		$('body').toggleClass('is-open-menu');
	});

	// card number
	$('input[name="passport-id"]').inputmask({
		mask: '9999 999999',
		showMaskOnHover: false,
		showMaskOnFocus: false,
		placeholder: ''
	});

});