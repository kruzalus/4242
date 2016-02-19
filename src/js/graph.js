$(document).ready(function() {

	$(function () {
	    var seriesOptions = [],
	        seriesCounter = 0,
	        names = ['MSFT', 'AAPL', 'GOOG'];

	    function createChart() {

	    	// Highcharts.setOptions({
		    //     // lang: {
		    //     //     resetZoom:'Zoom zurücksetzen',
		    //     //     decimalPoint: ',',
		    //     //     thousandsSep: '.'
		    //     // }
		    // });
			$('.js-graph').highcharts('StockChart', {
				
				rangeSelector: {
					selected: 4,
					buttons: [{
						type: 'month',
						count: 1,
						text: 'Месяц'},
					{
						type: 'month',
						count: 3,
						text: 'Квартал'},
					{
						type: 'year',
						count: 1,
						text: 'Год'},
					{
						type: 'all',
						text: 'Все время'}],
					buttonTheme: {
						width: 60,
						fill: 'none',
						stroke: 'none',
						style: {
							color: 'red',
							fontWeight: '400',
							fontSize:'.8em'
						},
						states: {
							hover: {
							    fill: 'white'
							},
							select: {
								style: {
									color: 'blue'
								}
							}
						},
						width: null,
						padding: 2
					}
				},

				chart: {
					height: 500
				},

				xAxis: {
					gridLineWidth: 1,
					lineColor: '#ECEFF1',
					tickColor: '#ECEFF1',
					labels: {
						style: {
							color: '#000',
							font: '13px Trebuchet MS, Verdana, sans-serif'
						}

					},
					title: {
						style: {
							color: '#333',
							fontWeight: 'bold',
							fontSize: '12px',
							fontFamily: 'Trebuchet MS, Verdana, sans-serif'

						}
					}
				},

				yAxis: {
					labels: {
						enabled: false
					}
				},

				plotOptions: {
					series: {
						compare: 'percent',
						animation: {
							duration: 2000
						}
					}
				},

				scrollbar: {
					enabled: false
				},

				tooltip: {
					pointFormat: '<span>{series.name}</span>: <br/><b style="color:{series.color}">{point.y}</b><br/>',
					valueDecimals: 2,
					borderRadius: 0,
					shadow: false,
					borderColor: '#eceff1'
				},

				navigation: {
					buttonOptions: {
						enabled: false
					}
				},

				navigator: {
					enabled: false
				},

				labels: {
					items: {
						style: {
							left: '200px',
							top: '100px'
						}
					}
				},

				series: seriesOptions,
				colors: ['#64B5F6', '#9CCC65', 'red']
			});
		}

		$.each(names, function (i, name) {

			$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

				seriesOptions[i] = {
					name: name,
					data: data
				};

				seriesCounter += 1;

				if (seriesCounter === names.length) {
					createChart();
				}
			});
		});
	});
});