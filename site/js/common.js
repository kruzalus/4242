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

	$('.js-slider-close').on('click', function(){
		$(this).parents('.js-slider-wrap').remove();
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

		if (out > wind) {
			$('body').toggleClass('is-scroll');
		}

		$(this).toggleClass('is-active');
		$('body').toggleClass('is-open-menu');
	});

	// inputmask
	$('input[name="passport-id"]').inputmask({
		mask: '9999 999999'
	});

	$('input[name="card-numb"]').inputmask({
		mask: '9999 9999 9999 9999'
	});

	$('input[name="passport-id"], input[name="card-numb"]').inputmask({
		showMaskOnHover : false,
		showMaskOnFocus : false,
		placeholder  	: ''
	});


	// soc
	$('.js-social-close').on('click', function(){
		$(this).parents('.js-social-item').remove();
	});

	// flex menu
	$('.js-flex-menu').flexMenu();

	// memu prev li
	function prevItem(){
		var menu 		= $('.js-flex-menu'),
			item  		= menu.find('li'),
			itemFlex 	= menu.find('li.flexMenu-viewMore'),
			itenMenu 	= itemFlex.find('li:nth-last-of-type(2)'),
			itemLength 	= itemFlex.find('li').length;

		if (itemFlex.length) {
			itemFlex.prev('li').addClass('is-last');
			itenMenu.css('order', itemLength);
		}
		else {
			item.removeClass('is-last');
		}
	} prevItem();

	$(window).on('resize', function() {
		prevItem();
	});

	$(window).on('orientationchange', function() {
		setTimeout(prevItem, 500);
	});

	$('body').on('touchstart', function(){
		$('.flexMenu-viewMore').removeClass('actile');
		$('.flexMenu-popup').hide();
	});

	//  ----------- drop ----------
	var drop 		= $('.js-drop'),
		allBlock 	= $('.js-drop-block');

	$('.js-grop-btn').on('click', function(event){
		var this_ 		= $(this),
			parent 		= this_.parents('.js-drop'),
			block 		= parent.find('.js-drop-block');

		if (!parent.hasClass('is-open')) {
			drop.removeClass('is-open');
			allBlock.slideUp(300);
			parent.addClass('is-open');
			block.slideDown(300);
		}
		else {
			drop.removeClass('is-open');
			allBlock.slideUp(300);
		}
		event.stopPropagation();
	});

	// write the text in the input list
	$('.js-drop-list li a').on('click', function(event){
		event.preventDefault();
		var this_ 	= $(this),
			parent 	= this_.parents('.js-drop'),
			input 	= parent.find('.js-drop-input'),
			btn 	= parent.find('.js-grop-btn'),
			text 	= this_.text();

		input.val(text);
		btn.text(text);

		drop.removeClass('is-open');
		allBlock.slideUp(300);
	});
	$('.js-select, .js-picker').on('click', function(event){
		event.stopPropagation();
	});
	$('body').on('click', function(){
		drop.removeClass('is-open');
		allBlock.slideUp(300);
	});
	// ------------ end drop -------------

	// dateRangePicker
	$('.js-picker').each(function(){
		var picker = $(this);
		if (picker.length){
			picker.dateRangePicker({
				singleMonth: true,
				showShortcuts: false,
				showTopbar: false
			});
			picker.on('datepicker-change',function(event,value) {
				var parent 		= $(this).parents('.js-drop'),
					inputHiden 	= parent.find('.js-drop-input'),
					btn 		= parent.find('.js-grop-btn'),
					val 		= value.value.replace(/to/, 'до').replace(/\-/g, '.');

				inputHiden.val(val);
				btn.text(val);

				drop.removeClass('is-open');
				allBlock.slideUp(300);

			});
		}
	});

	// accord
	$('.js-accord-but').on('click', function(){
		var this_ 		= $(this),
			accord		= this_.parents('.js-accord'),
			parents		= accord.parents('.js-accordions'),
			allAccord 	= parents.find('.js-accord'),
			allBlock 	= parents.find('.js-accord-block');
			block 		= accord.find('.js-accord-block');
		if (!accord.hasClass('is-active')) {
			allAccord.removeClass('is-active');
			allBlock.slideUp(300);
			accord.addClass('is-active');
			block.slideDown(300);
		}
		else {
			allAccord.removeClass('is-active');
			allBlock.slideUp(300);
		}
	});
	function accord(){
		var accord 	= $('.js-accord'),
			block 	= $('.js-accord.is-active .js-accord-block');
		if(accord.hasClass('is-active')){
			block.show();
		}
	} accord();

	setTimeout(function(){
		var loader 	= $('.js-loader');
		if(loader.length){
			loader.addClass('is-valid');
			animateValid();
		}
	}, 3000);

	setTimeout(function(){
		var loader 	= $('.js-loader.loader_2');
		if(loader.length){
			loader.removeClass('is-valid');
			loader.addClass('is-error');
			animateValid();
		}
	}, 3000);

	function animateValid(){
		setTimeout(function(){
			var loader 	= $('.js-loader'),
				arrVal 	= loader.find('.js-arr-valid'),
				arrErr 	= loader.find('.js-arr-error');
			if ($('.js-loader').hasClass('is-valid')) {
				arrVal.show();
				var svg = arrVal.drawsvg({
					reverse: true
				});
				svg.drawsvg('animate');
			}
			else if ($('.js-loader').hasClass('is-error')) {
				arrErr.show();
				var svg = arrErr.drawsvg({
					duration: 600
				});
				svg.drawsvg('animate');
			}
		}, 100);
	} animateValid();

});