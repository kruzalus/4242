$(document).ready(function() {
	
	// preloader
	setTimeout(function(){
		var loader 	= $('.js-preloader');
		if(loader.length){
			loader.addClass('is-valid');
			animateLoad();
		}
	}, 3000);

	setTimeout(function(){
		var loader 	= $('.js-preloader.preloader2');
		if(loader.length){
			loader.removeClass('is-valid');
			loader.addClass('is-error');
			animateLoad();
		}
	}, 3000);

	function animateLoad(){
		setTimeout(function(){
			var loader 	= $('.js-preloader'),
				arrVal 	= loader.find('.js-arr-valid'),
				arrErr 	= loader.find('.js-arr-error');
			if ($('.js-preloader').hasClass('is-valid')) {
				arrVal.show();

				var svg = arrVal.drawsvg({
					reverse: true
				});
				svg.drawsvg('animate');

				$('.js-loader-load').hide();
				$('.js-loader-valid').fadeIn(1000);
			}
			else if ($('.js-preloader').hasClass('is-error')) {
				arrErr.show();

				var svg = arrErr.drawsvg({
					stagger: 300,
					duration: 500
				});
				svg.drawsvg('animate');
				$('.js-loader-load').hide();
				$('.js-loader-error').fadeIn(1000);
			}
		}, 100);
	} animateLoad();

});