$(document).ready(function() {
	
	$('.is-hide').hide();

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

	function formatState (state) {
		if (!state.id) { return state.text; }
		var $state 	= $(
			'<span class="select2-results__text"><img src="../img/svg/' + state.element.getAttribute('data-image') + '.svg" class="select2-results__img" /> ' + state.text + '</span>'
		);
		return $state;
	};
	$('.js-select-2').select2(); 
	$('.js-select-2.is-image').select2({
		templateResult: formatState
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

	// timer
	function timerCount(){
		$('.js-timer').each(function(){
			var timer 	= $(this),
				sec 	= $(this).data('seconds'),
				min 	= $(this).data('munute'),
				timeId 	= timer.attr('id');
			$('#' + timeId).countDown({
				targetOffset: {
					'day'	: 0,
					'month'	: 0,
					'year'	: 0,
					'hour'	: 0,
					'min' 	: min,
					'sec' 	: sec
				},
				animation 	: false
			});
			if (timer.hasClass('is-hide')){
				$('#' + timeId).countDown('destroy');
			}
		});
	} timerCount();
	
	$('.js-open-timer').on('click', function(){
		var this_ 	= $(this),
			parent 	= this_.parents('.js-parent-timer'),
			timer 	= parent.find('.js-timer'),
			timeId 	= timer.attr('id');
		this_.hide();
		timer.fadeIn(500).removeClass('is-hide');
		timerCount();
	});

	// ----------- dip -----------
	$('.js-dip-text').on('click', function(event){
		var this_ 	= $(this),
			parent 	= this_.parents('.js-dip'),
			block 	= parent.find('.js-dip-block');

		if (!parent.hasClass('is-active')){
			$('.js-dip').removeClass('is-active');
			$('.js-dip-block').slideUp(300);
			parent.addClass('is-active');
			block.slideDown(300);
		}
		else {
			$('.js-dip').removeClass('is-active');
			$('.js-dip-block').slideUp(300);
		}
		event.stopPropagation();
	});
	
	$('.js-dip-item').on('click', function(){
		var this_ 	= $(this),
			parent 	= this_.parents('.js-dip'),
			input 	= parent.find('.js-dip-input'),
			text 	= parent.find('.js-dip-text'),
			val 	= this_.find('.js-dip-val').text(),
			html 	= this_.html();
		text.html(html);
		input.val(val);
	});

	$('body').on('click', function(){
		$('.js-dip').removeClass('is-active');
		$('.js-dip-block').slideUp(300);
	});

	// tell href
	function tellHref(){
		$('.js-tell').each(function(){
			var this_ 	= $(this),
				wind 	= $(window).width(),
				text 	= this_.text().replace(/\s+/g, '');
			if(wind <= 1024) {
				this_.attr('href', 'tel:' + text);
			}
			else {
				this_.removeAttr('href');
			}
		});
		
	} tellHref();

	$(window).resize(function() {
		tellHref();
	});

	// popup
	$('.js-open-popup').on('click', function (event) {
		var this_ = $(this),
			parent = this_.parents('.js-popup-parent');
			popup = parent.find('.js-popup');

		popup.addClass('is-active');
		$('body').addClass('is-hidden');

		event.stopPropagation();
	});

	$('.js-popup').on('click', function() {
		$(this).removeClass('is-active');
		$('body').removeClass('is-hidden');
	});

	$('.js-popup > div').on('click', function (event) {
		event.stopPropagation();
	});

	$('.js-close-popup').on('click', function () {
		$('.js-popup').removeClass('is-active');
		$('body').removeClass('is-hidden');
	});

	$('body').on('click', function () {
		$('.js-popup').removeClass('is-active');
		$('body').removeClass('is-hidden');
	});

	// chosen
	// $('.js-chosen-select').chosen();

	// js-location
	$('.js-location-text').on('click', function (event) {
		var this_ 	= $(this),
			parent 	= this_.parents('.js-location'),
			block 	= parent.find('.js-location-block');
		if (!parent.hasClass('is-open')) {
			parent.addClass('is-open');
			block.slideDown(300);
		}
		else {
			parent.removeClass('is-open');
			block.slideUp(300);
		}
		$('.js-chosen-select').chosen();
		event.stopPropagation();
	});
	$('.js-location-block').on('click', function (event) {
		event.stopPropagation();
	});
	$('body').on('click', function () {
		$('.js-location').removeClass('is-open');
		$('.js-location-block').slideUp(300);
	});

	$('.js-location .js-chosen-select.is-town').on('change', function () {
		var this_ = $(this);
			locText = this_.parents('.js-location').find('.js-location-text');
		locText.text('в ' + this_.val());
		$('.js-location').removeClass('is-open');
		$('.js-location-block').slideUp(300);
	});

	// 
	$('.js-banker').on('click', function () {
		var this_ = $(this),
			parent = this_.parents('.js-bankers'),
			item = parent.find('.js-banker');
		item.removeClass('is-active');
		this_.addClass('is-active');
		return false;
	});

});