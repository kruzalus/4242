$(document).ready(function() {

	$(function () {
	    var seriesOptions = [],
	        seriesCounter = 0,
	        names = ['MSFT', 'AAPL'];

	    function createChart() {

			$('.js-graph').highcharts('StockChart', {
				
				rangeSelector: {
					selected: 2,
					buttons: [
					{
						type: 'all',
						text: 'Все время'},
					{
						type: 'year',
						count: 1,
						text: 'Год'},
					{
						type: 'month',
						count: 3,
						text: 'Квартал'},
					{
						type: 'month',
						count: 1,
						text: 'Месяц'
					}],
					buttonTheme: {
						width: 80,
						height: 8,
						fill: '#fff',
						'stroke-width': 1,
						'stroke': '#ECEFF1',
						r: 3,
						style: {
							color: '#90A4AE',
							fontWeight: 'normal',
							fontFamily: '"Roboto Light", Arial, sans-serif',
							fontSize: '10px'
						},
						states: {
							hover: {
							    fill: '#ECEFF1',
								'stroke-width': 0
							},
							select: {
								'stroke-width': 0,
								fill: '#ECEFF1',
								style: {
									color: '#90A4AE',
									fontWeight: 'normal'
								}
							}
						},
						width: 50,
						padding: 7,
						lineHeight: 1
					}
				},

				chart: {
					height: 500,
					marginTop: -34,
					marginBottom: 58
				},

				xAxis: {
					gridLineWidth: 1,
					lineColor: '#ECEFF1',
					gridLineColor: '#ECEFF1',
					tickWidth: 0,
					labels: {
						style: {
							color: '#90A4AE',
							font: '10px "Roboto Light", Arial, sans-serif'
						}

					}
				},

				yAxis: {
					gridLineColor: '#ECEFF1',
					labels: {
						enabled: false
					}
				},

				plotOptions: {
					series: {
						compare: 'percent',
						animation: {
							duration: 2000
						},
						marker: {
							symbol: 'circle',
							lineWidth: 0,
							radius: 1.2,
							lineColor: null
						},
						states: {
							hover: {
								halo: {
									size: 0
								}
							}
						},
						lineWidth: 1
					}
				},

				scrollbar: {
					enabled: false
				},

				tooltip: {
					pointFormat: '<span style="color:#90A4AE; font-size: 10px;" >{series.name}</span>: <br/><b style="color:{series.color}; font-size: 10px;">{point.y}</b><br/>',
					valueDecimals: 2,
					fontFamily: '"Roboto Light", Arial, sans-serif',
					borderRadius: 0,
					shadow: false,
					borderColor: '#eceff1',
					backgroundColor: 'rgba(255, 255, 255, 0.9)',
					crosshairs: false,
					xDateFormat: '%d %B %Y',
					shared: true
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
				colors: ['#64B5F6', '#9CCC65']
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