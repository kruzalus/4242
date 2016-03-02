$(document).ready(function() {
	
	// price-first, price-two
	$('.js-price-first').on('keyup', function () {
		var val = $(this).val();
		if (val.length > 0) {
			$('.js-price-two').focus();
		}

	});

	$('.js-card-numb').inputmask({
		mask: '9999 9999 9999 9999999'
	}); 
	$('.js-input-month, .js-input-year').inputmask({
		mask: '99'
	}); 

	$('.js-input-month').on('keyup', function () {
		var val = $(this).val();
		if (val.length >= 2) {
			$('.js-input-year').focus();
		}
	});
	$('.js-input-year').on('keyup', function () {
		var val = $(this).val();
		if (val.length >= 2) {
			$('.js-svv').focus();
		}
	});

	$('.js-svv').inputmask({
		mask: '9999'
	}); 

	// passport
	$('input[name="passport-id"]').inputmask({
		mask: '9999 999999'
	});

	// inputmask
	$('input[name="passport-id"], .js-card-numb, .js-input-month, .js-input-year, .js-svv')
	.inputmask({
		showMaskOnHover : false,
		showMaskOnFocus : false,
		placeholder  	: ''
	});

	// month
	$('.js-input-month').on('input', function(){
		var value = $(this).val();
		var firstChar = value.substring(0, 1);
		var twoChar = value.substring(0, 2);
		if (firstChar > 1) {
			value = value.replace('');
			$(this).val('', value);
		}
		if (value > 12) {
			twoChar = '1';
			value = value.replace('');
			$(this).val(twoChar, value);
		}
	});

	// name
	$('.js-input-name')
	.liTranslit()
	.on('keyup', function(){
		var value = $(this).val();
		var reg = /[^\sa-zA-Zа-яА-Я]$/i;
		var regFinal = /([a-zA-Zа-яА-Я]{2,})$/i;
		if (reg.test(value)) {
		    value = value.replace(reg, '');
		    $(this).val(value);
		}
	});

	if ($('.js-form').length) {
		$('.js-form').each(function () {
			var form = $(this);
			form.validate({
				rules: {
					card_numb: {
						required: true,
						minlength: 16
					},
					month: {
						required: true,
						minlength: 2
					},
					year: {
						required: true,
						minlength: 2
					},
					cvv: {
						required: true,
						minlength: 3
					},
					name: "required"
				},
				messages: {
					card_numb: {
						required: "",
						minlength: ""
					},
					month: {
						required: "",
						minlength: ""
					},
					year: {
						required: "",
						minlength: ""
					},
					cvv: {
						required: "",
						minlength: ""
					},
					name: {
						required: "",
						minlength: ""
					}
				}
			});
		});
	}

});