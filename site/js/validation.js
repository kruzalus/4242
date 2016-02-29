$(document).ready(function() {
	
	// price-first, price-two
	$('.js-price-first').on('keyup', function () {
		var val = $(this).val();
		if (val.length > 0) {
			$('.js-price-two').focus();
		}

	});

});