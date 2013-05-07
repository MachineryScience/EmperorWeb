							</div>
						</div>
					</div>
				</div>
			</div>

		<!-- End Content -->
		</div>
		
		<!-- Sticky Footer -->
		<div id="footer" class="hide">
	      	<div class="wrap">
	      		<ul>
	      			<?php if (MENU_JS): ?>
	      			<li class="active"><span data-toggle="menu-position" data-menu-position="left-menu" class="glyphicons circle_arrow_left" title=""><i></i></span></li>
	      			<li><span data-toggle="menu-position" data-menu-position="right-menu" class="glyphicons circle_arrow_right" title=""><i></i></span></li>
	      			<li><span data-toggle="menu-position" data-menu-position="top-menu" class="glyphicons circle_arrow_top" title=""><i></i></span></li>
	      			<li class="divider"></li>
	      			<li class="active"><span data-toggle="menu-size" data-menu-size="0" class="glyphicons show_big_thumbnails text" title=""><i></i><span class="hidden-phone">Large menus</span></span></li>
	      			<li><span data-toggle="menu-size" data-menu-size="1" class="glyphicons show_thumbnails text" title=""><i></i><span class="hidden-phone">Small menus</span></span></li>
	      			<?php endif; ?>
	      			<li><a href="<?php echo getURL(array('documentation')); ?>" class="glyphicons circle_question_mark text" title=""><i></i><span class="hidden-phone">Documentation</span></a></li>
	      		</ul>
	      	</div>
	    </div>
		
	</div>
	
	<!-- Cubiq iScroll -->
	<!--[if gte IE 9]><!-->
	<script src="<?php echo getURL(); ?>theme/scripts/cubiq-iscroll/src/iscroll.js"></script>
	<!--<![endif]-->
	
	<!--[if lt IE 9]>
	<script src="<?php echo getURL(); ?>theme/scripts/cubiq-iscroll/src/iscroll-ie.js"></script>
	<![endif]-->
	
	<script type="text/javascript">
	var scrollers = [];
	var mainYScroller;
	
	$(function()
	{
		//document.addEventListener('touchmove', function(e){ e.preventDefault(); });
		var xScrollers = $(".scroll-x");
	    for (var i = 0; i < xScrollers.length; i++)
			scrollers.push(new iScroll(xScrollers[i], { 
				vScroll: false, 
				hideScrollbar: true,
				useTransform: $('html').is('.lt-ie9') ? false : true,
				onBeforeScrollStart: function (e) 
				{
					var target;
					if (!e) var e = window.event;
					if (e.target) target = e.target;
					else if (e.srcElement) target = e.srcElement;
					if (target.nodeType == 3) target = target.parentNode;

					if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
					{
						if (e.preventDefault) e.preventDefault();
						else e.returnValue = false;
					}
				} 
			}));

		var yScrollers = $('.scroll-y').not('#mainYScroller');
	    $.each(yScrollers, function(i,v)
		{
	    	var scroller = new iScroll($(v).attr('id'),
	    	{
		    	hScroll: false, 
		    	hideScrollbar: true,
		    	useTransform: $('html').is('.lt-ie9') ? false : true,
		    	onBeforeScrollStart: function (e) 
		    	{
		    		var target;
					if (!e) var e = window.event;
					if (e.target) target = e.target;
					else if (e.srcElement) target = e.srcElement;
					if (target.nodeType == 3) target = target.parentNode;
					
					if (target.tagName != 'SELECT' && 
						target.tagName != 'INPUT' && 
						target.tagName != 'TEXTAREA' &&
						$(target).parents('table-responsive').size() == 0)
					{
						if (e.preventDefault) e.preventDefault();
						else e.returnValue = false;
					}
				}
		    });
	    	scrollers.push(scroller);
		});

	    mainYScroller = new iScroll('mainYScroller',
    	{
	    	zoom: true,
	    	hScroll: false, 
	    	hideScrollbar: true,
	    	useTransform: $('html').is('.lt-ie9') ? false : true,
	    	onBeforeScrollStart: function (e) 
	    	{
	    		var target;
				if (!e) var e = window.event;
				if (e.target) target = e.target;
				else if (e.srcElement) target = e.srcElement;
				if (target.nodeType == 3) target = target.parentNode;

				if ($('input:focus, textarea:focus').length) $('input:focus, textarea:focus').blur();

				if ($(target).parents('.table-responsive').size() > 0 ||
					$(target).parents('.google-visualization-table-table').size() > 0 ||
					$(target).parents('#calendar').size() > 0 ||
					$(target).is('.btn'))
					{
						return true;
					}
					
				if (target.tagName != 'SELECT' && 
					target.tagName != 'INPUT' && 
					target.tagName != 'TEXTAREA')
				{
					if (e.preventDefault) e.preventDefault();
					else e.returnValue = false;
				}
			},
			onScrollEnd: function()
			{
				//if (mainYScroller.enabled == false) mainYScroller.enable();
			}
	    });
	    scrollers['mainYScroller'] = mainYScroller;
	});
	</script>
	
	<!-- JQueryUI v1.9.2 -->
	<script src="<?php echo getURL(); ?>theme/scripts/jquery-ui-1.9.2.custom/js/jquery-ui-1.9.2.custom.min.js"></script>
	
	<!-- JQueryUI Touch Punch -->
	<!-- small hack that enables the use of touch events on sites using the jQuery UI user interface library -->
	<script src="<?php echo getURL(); ?>theme/scripts/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>
	
	<!-- MiniColors -->
	<script src="<?php echo getURL(); ?>theme/scripts/jquery-miniColors/jquery.miniColors.js"></script>
	
	<!-- Themer -->
	<script>
	var themerPrimaryColor = '#DA4C4C',
		themerHeaderColor = '#393D41',
		themerMenuColor = '#232628';
	</script>
	<script src="<?php echo getURL(); ?>theme/scripts/jquery.cookie.js"></script>
	<script src="<?php echo getURL(); ?>theme/scripts/themer.js"></script>
	<?php if (isset($_GET['theme']) && $_GET['theme'] != ''): ?>
	<script>$(function(){ updateTheme(<?php echo $_GET['theme']; ?>); });</script>
	<?php endif; ?>

<?php if ($page == 'form_elements'): ?>
	<!-- ColorPicker -->
	<script src="<?php echo getURL(); ?>theme/scripts/farbtastic/farbtastic.js" type="text/javascript"></script>

<?php endif; ?>	
<?php if ($page == 'form_validator'): ?>
	<!-- jQuery Validate -->
	<script src="<?php echo getURL(); ?>theme/scripts/jquery-validation/dist/jquery.validate.min.js" type="text/javascript"></script>
	<script src="<?php echo getURL(); ?>theme/scripts/form_validator.js" type="text/javascript"></script>

<?php endif; ?>
<?php if ($page == 'index' || $page == 'finances' || $page == 'charts'): ?>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>

	<!--  Flot (Charts) JS -->
	<script src="<?php echo getURL(); ?>theme/scripts/flot/jquery.flot.js" type="text/javascript"></script>
	<script src="<?php echo getURL(); ?>theme/scripts/flot/jquery.flot.pie.js" type="text/javascript"></script>
	<script src="<?php echo getURL(); ?>theme/scripts/flot/jquery.flot.tooltip.js" type="text/javascript"></script>
	<script src="<?php echo getURL(); ?>theme/scripts/flot/jquery.flot.selection.js"></script>
	<script src="<?php echo getURL(); ?>theme/scripts/flot/jquery.flot.resize.js" type="text/javascript"></script>
	<script src="<?php echo getURL(); ?>theme/scripts/flot/jquery.flot.orderBars.js" type="text/javascript"></script>
	
	<?php
	$dates1 = array();
	$dates2 = array();
	
	for ($i=30;$i>0;$i--): 
		$dates1[] = "[" . mktime(0,0,0,date('n'),date('j')-$i,date('Y'))*1000 . ", " . mt_rand(2000, 4000) . "]";
		$dates2[] = "[" . mktime(0,0,0,date('n'),date('j')-$i,date('Y'))*1000 . ", " . mt_rand(400, 700) . "]";
	endfor; 
	?>
	
	<script>
	var charts = 
	{
		// init all charts
		init: function()
		{
			<?php if ($page == 'index'): ?>
			// mark weekends on the website traffic main graph
			this.website_traffic_graph.options.markings = this.utility.weekendAreas;

			// init website traffic main graph
			this.website_traffic_graph.init();

			// init website traffic toolbar
			this.utility.website_traffic_toolbar();

			// init website traffic overview graph
			this.website_traffic_overview.init();

			// connect website traffic graphs
			this.utility.website_traffic_connect();

			// init traffic sources pie
			this.traffic_sources_pie.init();
			<?php endif; ?>
			<?php if ($page == 'finances'): ?>

			// init simple chart
			this.chart_simple.init();
			<?php endif; ?>
			<?php if ($page == 'charts'): ?>

			// init simple chart
			this.chart_simple.init();

			// init lines chart with fill & without points
			this.chart_lines_fill_nopoints.init();

			// init ordered bars chart
			this.chart_ordered_bars.init();

			// init donut chart
			this.chart_donut.init();

			// init stacked bars chart
			this.chart_stacked_bars.init();

			// init pie chart
			this.chart_pie.init();

			// init horizontal bars chart
			this.chart_horizontal_bars.init();

			// init live chart
			this.chart_live.init();
			<?php endif; ?>
		},

		// utility class
		utility:
		{
			chartColors: [ "#da4c4c", "#444", "#777", "#999", "#DDD", "#EEE" ],
			chartBackgroundColors: ["#fff", "#fff"],

			applyStyle: function(that)
			{
				that.options.colors = charts.utility.chartColors;
				that.options.grid.backgroundColor = { colors: charts.utility.chartBackgroundColors };
				that.options.grid.borderColor = charts.utility.chartColors[0];
				that.options.grid.color = charts.utility.chartColors[0];
			},
			
			<?php if ($page == 'index'): ?>
			// connect website_traffic_graph with website_traffic_overview
			website_traffic_connect: function()
			{
				$("#placeholder").bind("plotselected", function (event, ranges) 
				{
			        // do the zooming // rewrite chart object
			        charts.website_traffic_graph.plot = $.plot(
						$("#placeholder"), 
						[{ data: charts.website_traffic_graph.d1, label: "<?php echo $translate->_('visitors'); ?>" }, { data: charts.website_traffic_graph.d2, label: "<?php echo $translate->_('conversions'); ?>" }],
						$.extend(true, {}, charts.website_traffic_graph.options, {
			            	xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to }
						})
					);

			        // don't fire event on the overview to prevent eternal loop
			        charts.website_traffic_overview.plot.setSelection(ranges, true);

			     	// enable website traffic clear selection button
			    	$('#websiteTrafficClear').prop('disabled', false);
			    });
			    
			    $("#overview").bind("plotselected", function (event, ranges) 
				{
					// set selection
			    	charts.website_traffic_graph.plot.setSelection(ranges);

			    	// enable website traffic clear selection button
			    	$('#websiteTrafficClear').prop('disabled', false);
			    });
			},

			website_traffic_toolbar: function()
			{
				// clear selection button
				$("#websiteTrafficClear").click(function()
				{
					charts.utility.website_traffic_clear();
				});

				// last 24 hours button
				$('#websiteTraffic24Hours').click(function()
				{
					charts.website_traffic_graph.plot.setSelection(
					{
						xaxis: 
						{
							from: <?php echo mktime(0,0,0,date('n'),date('j')-2,date('Y'))*1000; ?>,
							to: <?php echo mktime(0,0,0,date('n'),date('j')-1,date('Y'))*1000; ?>
						}
					});
				});

				// last 7 days button
				$('#websiteTraffic7Days').click(function()
				{
					charts.website_traffic_graph.plot.setSelection(
					{
						xaxis: 
						{
							from: <?php echo mktime(0,0,0,date('n'),date('j')-8,date('Y'))*1000; ?>,
							to: <?php echo mktime(0,0,0,date('n'),date('j')-1,date('Y'))*1000; ?>
						}
					});
				});

				// last 14 days button
				$('#websiteTraffic14Days').click(function()
				{
					charts.website_traffic_graph.plot.setSelection(
					{
						xaxis: 
						{
							from: <?php echo mktime(0,0,0,date('n'),date('j')-15,date('Y'))*1000; ?>,
							to: <?php echo mktime(0,0,0,date('n'),date('j')-1,date('Y'))*1000; ?>
						}
					});
				});
			},
			
			// clear selection on website traffic charts
			website_traffic_clear: function()
			{
				// disable clear button
				$('#websiteTrafficClear').prop('disabled', true);
				
				// clear selection on website traffic main chart / rewrite chart object
				charts.website_traffic_graph.plot = $.plot(
					$("#placeholder"), 
					[{ data: charts.website_traffic_graph.d1, label: "<?php echo $translate->_('visitors'); ?>" }, { data: charts.website_traffic_graph.d2, label: "<?php echo $translate->_('conversions'); ?>" }],
					charts.website_traffic_graph.options
				);

				// clear selection on website traffic overview chart
				charts.website_traffic_overview.plot.clearSelection();
			},
			
			// helper for returning the weekends in a period
			weekendAreas: function(axes)
			{
				var markings = [];
		        var d = new Date(axes.xaxis.min);
		        // go to the first Saturday
		        d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
		        d.setUTCSeconds(0);
		        d.setUTCMinutes(0);
		        d.setUTCHours(0);
		        var i = d.getTime();
		        do {
		            // when we don't set yaxis, the rectangle automatically
		            // extends to infinity upwards and downwards
		            markings.push({ xaxis: { from: i, to: i + 2 * 24 * 60 * 60 * 1000 } });
		            i += 7 * 24 * 60 * 60 * 1000;
		        } while (i < axes.xaxis.max);
		
		        return markings;
			},
			<?php endif; ?>
			
			// generate random number for charts
			randNum: function()
			{
				return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
			}
		},

		<?php if ($page == 'index'): ?>
		// main website traffic chart
		website_traffic_graph:
		{
			// data
			d1: [<?php echo implode(",", $dates1); ?>],
			d2: [<?php echo implode(",", $dates2); ?>],

			// will hold the chart object
			plot: null,
			
			// chart options
			options:
			{
		        xaxis: { mode: "time", tickLength: 5 },
		        selection: { mode: "x" },
		        grid: { 
			        markingsColor: "rgba(0,0,0, 0.02)",
			        backgroundColor : { },
					borderColor : "#f1f1f1",
					borderWidth: 1,
					color : "#DA4C4C",
					hoverable : true,
					clickable: true
			    },
		        series : {
					lines : {
						show : true,
						fill: true
					},
					points : {
						show : true
					}
				},
				colors: [],
				tooltip: true,
				tooltipOpts: {
					content: "%x: <strong>%y %s</strong>",
					dateFormat: "%y-%0m-%0d",
					shifts: {
						x: 10,
						y: 20
					},
					defaultTheme: false
				},
				legend: {
			        show: true,
			        noColumns: 2
			    }
		    },

		 	// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				// first correct the timestamps - they are recorded as the daily
			    // midnights in UTC+0100, but Flot always displays dates in UTC
			    // so we have to add one hour to hit the midnights in the plot
			    for (var i = 0; i < this.d1.length; ++i)
			    {
			    	this.d1[i][0] += 60 * 60 * 1000;
			    	this.d2[i][0] += 60 * 60 * 1000;
			    }

				// create the chart object
			    this.plot = $.plot(
					$("#placeholder"), 
					[{ data: this.d1, label: "<?php echo $translate->_('visitors'); ?>" }, { data: this.d2, label: "<?php echo $translate->_('conversions'); ?>" }], 
					this.options
				);
			}
		},

		// website traffic overview chart
		website_traffic_overview: 
		{
			// data
			d1: [<?php echo implode(",", $dates1); ?>],
			d2: [<?php echo implode(",", $dates2); ?>],

			// will hold the chart object
			plot: null,

			// chart options
			options: 
			{
		        series: {
		            bars: {
						show: true,
	                    lineWidth: 10,
	                    align: "left"
					},
	                shadowSize: 0
		        },
		        xaxis: { ticks: [], mode: "time" },
		        yaxis: { ticks: [], min: 0, autoscaleMargin: 0.1 },
		        selection: { mode: "x" },
		        grid: {
		        	borderColor : "#DA4C4C",
		        	borderWidth: 1,
		        	minBorderMargin: 0,
		        	axisMargin: 0,
		        	labelMargin: 0,
		        	margin: 0,
		        	backgroundColor : {}
			    },
			    colors: [],
			    legend: {
			        show: false
			    }
		    },

			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				// first correct the timestamps - they are recorded as the daily
			    // midnights in UTC+0100, but Flot always displays dates in UTC
			    // so we have to add one hour to hit the midnights in the plot
			    for (var i = 0; i < this.d1.length; ++i)
			    {
			    	this.d1[i][0] += 60 * 60 * 1000;
			    	this.d2[i][0] += 60 * 60 * 1000;
			    }

			    // create chart object
			    this.plot = $.plot(
					$("#overview"), 
					[{ data: this.d1, label: "<?php echo $translate->_('visitors'); ?>" }, { data: this.d2, label: "<?php echo $translate->_('conversions'); ?>" }], 
					this.options
				);
			}
		},

		traffic_sources_pie: 
		{
			// data
			data: [
				{ label: "<?php echo $translate->_('organic'); ?>",  data: 60 },
				{ label: "<?php echo $translate->_('direct'); ?>",  data: 22.1 },
				{ label: "<?php echo $translate->_('referral'); ?>",  data: 16.9 },
				{ label: "<?php echo $translate->_('cpc'); ?>",  data: 1 }
			],
			
			// chart object
			plot: null,
			
			// chart options
			options: {
				series: {
		            pie: {
		                show: true,
		                redraw: true,
		                radius: 1,
		                tilt: 0.6,
		                label: {
		                    show: true,
		                    radius: 1,
		                    formatter: function(label, series){
		                        return '<div style="font-size:8pt;text-align:center;padding:5px;color:#fff;">'+Math.round(series.percent)+'%</div>';
		                    },
		                    background: { opacity: 0.8 }
		                }
		            }
		        },
		        legend: {
		            show: true
		        },
		        colors: [],
		        grid: { hoverable: true },
		        tooltip: true,
				tooltipOpts: {
					content: "<strong>%y% %s</strong>",
					dateFormat: "%y-%0m-%0d",
					shifts: {
						x: 10,
						y: 20
					},
					defaultTheme: false
				}
			},
			
			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				this.plot = $.plot($("#pie"), this.data, this.options);
			}
		},

		// traffic sources dataTables
		// we are now using Google Charts instead of Flot
		traffic_sources_dataTables:
		{
			// tables data
			data: 
			{
				tableSources:  
				{
					data: null,
					init: function()
					{
						var data = new google.visualization.DataTable();
				        data.addColumn('string', '<?php echo $translate->_('source'); ?>');
				        data.addColumn('string', '<?php echo $translate->_('medium'); ?>');
				        data.addColumn('number', '<?php echo $translate->_('visits'); ?>');
				        data.addColumn('number', '<?php echo $translate->_('pg_views'); ?>');
				        data.addColumn('string', '<?php echo $translate->_('avg_time'); ?>');

				        data.addRows(7);
				        data.setCell(0, 0, 'google', null, {'style': 'text-align: center;'});
				        data.setCell(0, 1, 'organic', null, {'style': 'text-align: center;'});
				        data.setCell(0, 2, 89, null, {'style': 'text-align: center;'});
				        data.setCell(0, 3, 299, null, {'style': 'text-align: center;'});
				        data.setCell(0, 4, '00:01:48', null, {'style': 'text-align: center;'});
				        data.setCell(1, 0, '(direct)', null, {'style': 'text-align: center;'});
				        data.setCell(1, 1, '(none)', null, {'style': 'text-align: center;'});
				        data.setCell(1, 2, 14, null, {'style': 'text-align: center;'});
				        data.setCell(1, 3, 34, null, {'style': 'text-align: center;'});
				        data.setCell(1, 4, '00:03:15', null, {'style': 'text-align: center;'});
				        data.setCell(2, 0, 'yahoo', null, {'style': 'text-align: center;'});
				        data.setCell(2, 1, 'organic', null, {'style': 'text-align: center;'});
				        data.setCell(2, 2, 3, null, {'style': 'text-align: center;'});
				        data.setCell(2, 3, 3, null, {'style': 'text-align: center;'});
				        data.setCell(2, 4, '00:00:00', null, {'style': 'text-align: center;'});
				        data.setCell(3, 0, 'ask', null, {'style': 'text-align: center;'});
				        data.setCell(3, 1, 'organic', null, {'style': 'text-align: center;'});
				        data.setCell(3, 2, 1, null, {'style': 'text-align: center;'});
				        data.setCell(3, 3, 3, null, {'style': 'text-align: center;'});
				        data.setCell(3, 4, '00:01:34', null, {'style': 'text-align: center;'});
				        data.setCell(4, 0, 'bing', null, {'style': 'text-align: center;'});
				        data.setCell(4, 1, 'organic', null, {'style': 'text-align: center;'});
				        data.setCell(4, 2, 1, null, {'style': 'text-align: center;'});
				        data.setCell(4, 3, 1, null, {'style': 'text-align: center;'});
				        data.setCell(4, 4, '00:00:00', null, {'style': 'text-align: center;'});
				        data.setCell(5, 0, 'conduit', null, {'style': 'text-align: center;'});
				        data.setCell(5, 1, 'organic', null, {'style': 'text-align: center;'});
				        data.setCell(5, 2, 1, null, {'style': 'text-align: center;'});
				        data.setCell(5, 3, 1, null, {'style': 'text-align: center;'});
				        data.setCell(5, 4, '00:00:00', null, {'style': 'text-align: center;'});
				        data.setCell(6, 0, 'google', null, {'style': 'text-align: center;'});
				        data.setCell(6, 1, 'cpc', null, {'style': 'text-align: center;'});
				        data.setCell(6, 2, 1, null, {'style': 'text-align: center;'});
				        data.setCell(6, 3, 1, null, {'style': 'text-align: center;'});
				        data.setCell(6, 4, '00:00:00', null, {'style': 'text-align: center;'});

				        this.data = data;
				        return data;
					}
				},
				tableReffering:
				{
					data: null,
					init: function()
					{
						var data = new google.visualization.DataTable();
						data.addColumn('string', '<?php echo $translate->_('source'); ?>');
				        data.addColumn('number', '<?php echo $translate->_('pg_views'); ?>');
				        data.addColumn('string', '<?php echo $translate->_('avg_time'); ?>');
				        data.addColumn('string', '<?php echo $translate->_('exits'); ?>');
				        
						data.addRows(6);
						data.setCell(0, 0, 'google.ro');
						data.setCell(0, 1, 14, null, {'style': 'text-align: center;'});
						data.setCell(0, 2, '00:05:51', null, {'style': 'text-align: center;'});
						data.setCell(0, 3, '3', null, {'style': 'text-align: center;'});
						data.setCell(1, 0, 'search.sweetim.com');
						data.setCell(1, 1, 5, null, {'style': 'text-align: center;'});
						data.setCell(1, 2, '00:03:29', null, {'style': 'text-align: center;'});
						data.setCell(1, 3, '1', null, {'style': 'text-align: center;'});
						data.setCell(2, 0, 'start.funmoods.com');
						data.setCell(2, 1, 5, null, {'style': 'text-align: center;'});
						data.setCell(2, 2, '00:01:02', null, {'style': 'text-align: center;'});
						data.setCell(2, 3, '1', null, {'style': 'text-align: center;'});
						data.setCell(3, 0, 'google.md');
						data.setCell(3, 1, 2, null, {'style': 'text-align: center;'});
						data.setCell(3, 2, '00:03:56', null, {'style': 'text-align: center;'});
						data.setCell(3, 3, '1', null, {'style': 'text-align: center;'});
						data.setCell(4, 0, 'searchmobileonline.com');
						data.setCell(4, 1, 2, null, {'style': 'text-align: center;'});
						data.setCell(4, 2, '00:02:21', null, {'style': 'text-align: center;'});
						data.setCell(4, 3, '1', null, {'style': 'text-align: center;'});
						data.setCell(5, 0, 'google.com');
						data.setCell(5, 1, 1, null, {'style': 'text-align: center;'});
						data.setCell(5, 2, '00:00:00', null, {'style': 'text-align: center;'});
						data.setCell(5, 3, '1', null, {'style': 'text-align: center;'});
						
						this.data = data;
						return data;
					}
				}
			},
			
			// chart
			chart: 
			{
				tableSources: null,
				tableReffering: null
			},
			
			// options
			options: 
			{
				tableSources: 
				{
					page: 'enable',
					pageSize: 6,
					allowHtml: true,
					cssClassNames: {
						headerRow: 'tableHeaderRow',
						tableRow: 'tableRow',
						selectedTableRow: 'selectedTableRow',
						hoverTableRow: 'hoverTableRow'
					},
					width: '100%',
					alternatingRowStyle: false,
					pagingSymbols: { prev: '<span class="btn btn-inverse"><?php echo $translate->_('prev'); ?></btn>', next: '<span class="btn btn-inverse"><?php echo $translate->_('next'); ?></span>' }
				},
				
				tableReffering:
				{
					page: 'enable',
					pageSize: 6,
					allowHtml: true,
					cssClassNames: {
						headerRow: 'tableHeaderRow',
						tableRow: 'tableRow',
						selectedTableRow: 'selectedTableRow',
						hoverTableRow: 'hoverTableRow'
					},
					width: '100%',
					alternatingRowStyle: false,
					pagingSymbols: { prev: '<span class="btn btn-inverse"><?php echo $translate->_('prev'); ?></btn>', next: '<span class="btn btn-inverse"><?php echo $translate->_('next'); ?></span>' }
				}
			},
			
			// initialize
			init: function()
			{
				// data
				charts.traffic_sources_dataTables.data.tableSources.init();
				charts.traffic_sources_dataTables.data.tableReffering.init();
				
				// charts
				charts.traffic_sources_dataTables.drawTableSources();
				charts.traffic_sources_dataTables.drawTableReffering();
			},

			// draw Traffic Sources Table
			drawTableSources: function()
			{
				this.chart.tableSources = new google.visualization.Table(document.getElementById('dataTableSources'));
				this.chart.tableSources.draw(this.data.tableSources.data, this.options.tableSources);
			},

			// draw Refferals Table
			drawTableReffering: function()
			{
				this.chart.tableReffering = new google.visualization.Table(document.getElementById('dataTableReffering'));
				this.chart.tableReffering.draw(this.data.tableReffering.data, this.options.tableReffering);
			}
		}
		<?php endif; ?>
		<?php if ($page == 'charts' || $page == 'finances'): ?>
		
		// simple chart
		chart_simple:
		{
			// data
			data: 
			{
				sin: [],
				cos: []
			},
			
			// will hold the chart object
			plot: null,

			// chart options
			options: 
			{
				grid: 
				{
					show: true,
				    aboveData: true,
				    color: "#3f3f3f",
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: true,
				    mouseActiveRadius: 20,
				    backgroundColor : { }
				},
		        series: {
		        	grow: {active: false},
		            lines: {
	            		show: true,
	            		fill: false,
	            		lineWidth: 4,
	            		steps: false
	            	},
		            points: {
		            	show:true,
		            	radius: 5,
		            	symbol: "circle",
		            	fill: true,
		            	borderColor: "#fff"
		            }
		        },
		        legend: { position: "se" },
		        colors: [],
		        shadowSize:1,
		        tooltip: true, //activate tooltip
				tooltipOpts: {
					content: "%s : %y.3",
					shifts: {
						x: -30,
						y: -50
					},
					defaultTheme: false
				}
			},

			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);

				if (this.plot == null)
				{
					for (var i = 0; i < 14; i += 0.5) 
					{
				        this.data.sin.push([i, Math.sin(i)]);
				        this.data.cos.push([i, Math.cos(i)]);
				    }
				}
				this.plot = $.plot(
					$("#chart_simple"),
		           	[{
		    			label: "Sin", 
		    			data: this.data.sin,
		    			lines: {fillColor: "#DA4C4C"},
		    			points: {fillColor: "#fff"}
		    		}, 
		    		{	
		    			label: "Cos", 
		    			data: this.data.cos,
		    			lines: {fillColor: "#444"},
		    			points: {fillColor: "#fff"}
		    		}], this.options);
			}
		},
		<?php endif; ?>
		<?php if ($page == 'charts'): ?>

		// lines chart with fill & without points
		chart_lines_fill_nopoints: 
		{
			// chart data
			data: 
			{
				d1: [],
				d2: []
			},

			// will hold the chart object
			plot: null,

			// chart options
			options: 
			{
				grid: {
					show: true,
				    aboveData: true,
				    color: "#3f3f3f",
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: true,
				    mouseActiveRadius: 20,
				    backgroundColor : { }
				},
		        series: {
		        	grow: {active:false},
		            lines: {
	            		show: true,
	            		fill: true,
	            		lineWidth: 2,
	            		steps: false
	            	},
		            points: {show:false}
		        },
		        legend: { position: "nw" },
		        yaxis: { min: 0 },
		        xaxis: {ticks:11, tickDecimals: 0},
		        colors: [],
		        shadowSize:1,
		        tooltip: true,
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					},
					defaultTheme: false
				}
			},

			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				// generate some data
				this.data.d1 = [[1, 3+charts.utility.randNum()], [2, 6+charts.utility.randNum()], [3, 9+charts.utility.randNum()], [4, 12+charts.utility.randNum()],[5, 15+charts.utility.randNum()],[6, 18+charts.utility.randNum()],[7, 21+charts.utility.randNum()],[8, 15+charts.utility.randNum()],[9, 18+charts.utility.randNum()],[10, 21+charts.utility.randNum()],[11, 24+charts.utility.randNum()],[12, 27+charts.utility.randNum()],[13, 30+charts.utility.randNum()],[14, 33+charts.utility.randNum()],[15, 24+charts.utility.randNum()],[16, 27+charts.utility.randNum()],[17, 30+charts.utility.randNum()],[18, 33+charts.utility.randNum()],[19, 36+charts.utility.randNum()],[20, 39+charts.utility.randNum()],[21, 42+charts.utility.randNum()],[22, 45+charts.utility.randNum()],[23, 36+charts.utility.randNum()],[24, 39+charts.utility.randNum()],[25, 42+charts.utility.randNum()],[26, 45+charts.utility.randNum()],[27,38+charts.utility.randNum()],[28, 51+charts.utility.randNum()],[29, 55+charts.utility.randNum()], [30, 60+charts.utility.randNum()]];
				this.data.d2 = [[1, charts.utility.randNum()-5], [2, charts.utility.randNum()-4], [3, charts.utility.randNum()-4], [4, charts.utility.randNum()],[5, 4+charts.utility.randNum()],[6, 4+charts.utility.randNum()],[7, 5+charts.utility.randNum()],[8, 5+charts.utility.randNum()],[9, 6+charts.utility.randNum()],[10, 6+charts.utility.randNum()],[11, 6+charts.utility.randNum()],[12, 2+charts.utility.randNum()],[13, 3+charts.utility.randNum()],[14, 4+charts.utility.randNum()],[15, 4+charts.utility.randNum()],[16, 4+charts.utility.randNum()],[17, 5+charts.utility.randNum()],[18, 5+charts.utility.randNum()],[19, 2+charts.utility.randNum()],[20, 2+charts.utility.randNum()],[21, 3+charts.utility.randNum()],[22, 3+charts.utility.randNum()],[23, 3+charts.utility.randNum()],[24, 2+charts.utility.randNum()],[25, 4+charts.utility.randNum()],[26, 4+charts.utility.randNum()],[27,5+charts.utility.randNum()],[28, 2+charts.utility.randNum()],[29, 2+charts.utility.randNum()], [30, 3+charts.utility.randNum()]];
				
				// make chart
				this.plot = $.plot(
					'#chart_lines_fill_nopoints', 
					[{
             			label: "Visits", 
             			data: this.data.d1,
             			lines: {fillColor: "#fff8f2"},
             			points: {fillColor: "#88bbc8"}
             		}, 
             		{	
             			label: "Unique Visits", 
             			data: this.data.d2,
             			lines: {fillColor: "rgba(0,0,0,0.1)"},
             			points: {fillColor: "#ed7a53"}
             		}], 
             		this.options);
			}
		},

		// ordered bars chart
		chart_ordered_bars:
		{
			// chart data
			data: null,

			// will hold the chart object
			plot: null,

			// chart options
			options:
			{
				bars: {
					show:true,
					barWidth: 0.2,
					fill:1
				},
				grid: {
					show: true,
				    aboveData: false,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: false,
				    mouseActiveRadius: 20,
				    backgroundColor : { }
				},
		        series: {
		        	grow: {active:false}
		        },
		        legend: { position: "ne" },
		        colors: [],
		        tooltip: true,
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					},
					defaultTheme: false
				}
			},

			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				//some data
				var d1 = [];
			    for (var i = 0; i <= 10; i += 1)
			        d1.push([i, parseInt(Math.random() * 30)]);
			 
			    var d2 = [];
			    for (var i = 0; i <= 10; i += 1)
			        d2.push([i, parseInt(Math.random() * 30)]);
			 
			    var d3 = [];
			    for (var i = 0; i <= 10; i += 1)
			        d3.push([i, parseInt(Math.random() * 30)]);
			 
			    var ds = new Array();
			 
			    ds.push({
			     	label: "Data One",
			        data:d1,
			        bars: {order: 1}
			    });
			    ds.push({
			    	label: "Data Two",
			        data:d2,
			        bars: {order: 2}
			    });
			    ds.push({
			    	label: "Data Three",
			        data:d3,
			        bars: {order: 3}
			    });
				this.data = ds;

				this.plot = $.plot($("#chart_ordered_bars"), this.data, this.options);
			}
		},

		// donut chart
		chart_donut:
		{
			// chart data
			data: [
			    { label: "USA",  data: 38 },
			    { label: "Brazil",  data: 23 },
			    { label: "India",  data: 15 },
			    { label: "Turkey",  data: 9 },
			    { label: "France",  data: 7 },
			    { label: "China",  data: 5 },
			    { label: "Germany",  data: 3 }
			],

			// will hold the chart object
			plot: null,

			// chart options
			options: 
			{
				series: {
					pie: { 
						show: true,
						innerRadius: 0.4,
						highlight: {
							opacity: 0.1
						},
						radius: 1,
						stroke: {
							color: '#fff',
							width: 8
						},
						startAngle: 2,
					    combine: {
		                    color: '#EEE',
		                    threshold: 0.05
		                },
		                label: {
		                    show: true,
		                    radius: 1,
		                    formatter: function(label, series){
		                        return '<div class="label label-inverse">'+label+'&nbsp;'+Math.round(series.percent)+'%</div>';
		                    }
		                }
					},
					grow: {	active: false}
				},
				legend:{show:false},
				grid: {
		            hoverable: true,
		            clickable: true,
		            backgroundColor : { }
		        },
		        colors: [],
		        tooltip: true,
				tooltipOpts: {
					content: "%s : %y.1"+"%",
					shifts: {
						x: -30,
						y: -50
					},
					defaultTheme: false
				}
			},
			
			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				this.plot = $.plot($("#chart_donut"), this.data, this.options);
			}
		},

		// horizontal bars chart
		chart_horizontal_bars:
		{
			// chart data
			data: null,

			// will hold the chart object
			plot: null,

			// chart options
			options: 
			{
				grid: {
					show: true,
				    aboveData: false,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: false,
				    mouseActiveRadius: 20,
				    backgroundColor : { }
				},
		        series: {
		        	grow: {active:false},
			        bars: {
			        	show:true,
						horizontal: true,
						barWidth:0.2,
						fill:1
					}
		        },
		        legend: { position: "ne" },
		        colors: [],
		        tooltip: true,
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					},
					defaultTheme: false
				}
			},
			
			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				var d1 = [];
			    for (var i = 0; i <= 5; i += 1)
			        d1.push([parseInt(Math.random() * 30),i ]);

			    var d2 = [];
			    for (var i = 0; i <= 5; i += 1)
			        d2.push([parseInt(Math.random() * 30),i ]);

			    var d3 = [];
			    for (var i = 0; i <= 5; i += 1)
			        d3.push([ parseInt(Math.random() * 30),i]);

			    this.data = new Array();
			    this.data.push({
			        data: d1,
			        bars: {
			            horizontal:true, 
			            show: true, 
			            barWidth: 0.2, 
			            order: 1
			        }
			    });
				this.data.push({
				    data: d2,
				    bars: {
				        horizontal:true, 
				        show: true, 
				        barWidth: 0.2, 
				        order: 2
				    }
				});
				this.data.push({
				    data: d3,
				    bars: {
				        horizontal:true, 
				        show: true, 
				        barWidth: 0.2, 
				        order: 3
				    }
				});

				this.plot = $.plot($("#chart_horizontal_bars"), this.data, this.options);
			}
		},

		// pie chart
		chart_pie:
		{
			// chart data
			data: [
			    { label: "USA",  data: 38 },
			    { label: "Brazil",  data: 23 },
			    { label: "India",  data: 15 },
			    { label: "Turkey",  data: 9 },
			    { label: "France",  data: 7 },
			    { label: "China",  data: 5 },
			    { label: "Germany",  data: 3 }
			],

			// will hold the chart object
			plot: null,

			// chart options
			options: 
			{
				series: {
					pie: { 
						show: true,
						highlight: {
							opacity: 0.1
						},
						radius: 1,
						stroke: {
							color: '#fff',
							width: 2
						},
						startAngle: 2,
					    combine: {
		                    color: '#353535',
		                    threshold: 0.05
		                },
		                label: {
		                    show: true,
		                    radius: 1,
		                    formatter: function(label, series){
		                        return '<div class="label label-inverse">'+label+'&nbsp;'+Math.round(series.percent)+'%</div>';
		                    }
		                }
					},
					grow: {	active: false}
				},
				colors: [],
				legend:{show:false},
				grid: {
		            hoverable: true,
		            clickable: true,
		            backgroundColor : { }
		        },
		        tooltip: true,
				tooltipOpts: {
					content: "%s : %y.1"+"%",
					shifts: {
						x: -30,
						y: -50
					},
					defaultTheme: false
				}
			},
			
			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				this.plot = $.plot($("#chart_pie"), this.data, this.options);
			}
		},

		// stacked bars chart
		chart_stacked_bars:
		{
			// chart data
			data: null,

			// will hold the chart object
			plot: null,

			// chart options
			options: 
			{
				grid: {
					show: true,
				    aboveData: false,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: true,
				    mouseActiveRadius: 20,
				    backgroundColor : { }
				},
		        series: {
		        	grow: {active:false},
		        	stack: 0,
	                lines: { show: false, fill: true, steps: false },
	                bars: { show: true, barWidth: 0.5, fill:1}
			    },
		        xaxis: {ticks:11, tickDecimals: 0},
		        legend: { position: "ne" },
		        colors: [],
		        shadowSize:1,
		        tooltip: true,
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					},
					defaultTheme: false
				}
			},
			
			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				var d1 = [];
			    for (var i = 0; i <= 10; i += 1)
			        d1.push([i, parseInt(Math.random() * 30)]);
			 
			    var d2 = [];
			    for (var i = 0; i <= 10; i += 1)
			        d2.push([i, parseInt(Math.random() * 20)]);
			 
			    var d3 = [];
			    for (var i = 0; i <= 10; i += 1)
			        d3.push([i, parseInt(Math.random() * 20)]);
			 
			    this.data = new Array();
			 
			    this.data.push({
			     	label: "Data One",
			        data: d1
			    });
			    this.data.push({
			    	label: "Data Two",
			        data: d2
			    });
			    this.data.push({
			    	label: "Data Tree",
			        data: d3
			    });

			    this.plot = $.plot($("#chart_stacked_bars"), this.data, this.options);
			}
		},

		// live chart
		chart_live:
		{
			// chart data
			data: [],
			totalPoints: 300,
		    updateInterval: 200,

			// we use an inline data source in the example, usually data would
		    // be fetched from a server
			getRandomData: function()
			{
				if (this.data.length > 0)
		            this.data = this.data.slice(1);

		        // do a random walk
		        while (this.data.length < this.totalPoints) 
			    {
		            var prev = this.data.length > 0 ? this.data[this.data.length - 1] : 50;
		            var y = prev + Math.random() * 10 - 5;
		            if (y < 0)
		                y = 0;
		            if (y > 100)
		                y = 100;
		            this.data.push(y);
		        }

		        // zip the generated y values with the x values
		        var res = [];
		        for (var i = 0; i < this.data.length; ++i)
		            res.push([i, this.data[i]])
		        return res;
			},

			// will hold the chart object
			plot: null,

			// chart options
			options: 
			{
				series: { 
		        	grow: { active: false },
		        	shadowSize: 0,
		        	lines: {
	            		show: true,
	            		fill: true,
	            		lineWidth: 2,
	            		steps: false
		            }
		        },
		        grid: {
					show: true,
				    aboveData: false,
				    color: "#3f3f3f",
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: false,
				    mouseActiveRadius: 20,
				    backgroundColor : { }
				}, 
				colors: [],
		        tooltip: true,
				tooltipOpts: {
					content: "Value is : %y.0",
					shifts: {
						x: -30,
						y: -50
					},
					defaultTheme: false
				},	
		        yaxis: { min: 0, max: 100 },
		        xaxis: { show: true}
			},
			
			// initialize
			init: function()
			{
				// apply styling
				charts.utility.applyStyle(this);
				
				this.plot = $.plot($("#chart_live"), [ this.getRandomData() ], this.options);
				setTimeout(this.update, charts.chart_live.updateInterval);
			},

			// update
			update: function()
			{
				charts.chart_live.plot.setData([ charts.chart_live.getRandomData() ]);
		        charts.chart_live.plot.draw();
		        
		        setTimeout(charts.chart_live.update, charts.chart_live.updateInterval);
			}
		}
		<?php endif; ?>
	};

	$(function()
	{
		// initialize charts
		charts.init();
	});
	</script>
	
<?php endif; ?>
<?php if ($page == 'calendar'): ?>
	<!-- Calendar -->
	<script src="<?php echo getURL(); ?>theme/scripts/fullcalendar/fullcalendar/fullcalendar.js"></script>

<?php endif; ?>	
	<!-- Resize Script -->
	<script src="<?php echo getURL(); ?>theme/scripts/jquery.ba-resize.js"></script>
	
	<!-- Uniform -->
	<script src="<?php echo getURL(); ?>theme/scripts/pixelmatrix-uniform/jquery.uniform.min.js"></script>
	
<?php if ($page == 'tables_enhanced'): ?>	
	<!-- DataTables -->
	<script src="<?php echo getURL(); ?>theme/scripts/DataTables/media/js/jquery.dataTables.min.js"></script>
	<script src="<?php echo getURL(); ?>theme/scripts/DataTables/media/js/DT_bootstrap.js"></script>

<?php endif; ?>
	<!-- Bootstrap Script -->
	<script src="<?php echo getURL(); ?>bootstrap/js/bootstrap.min.js"></script>
	
	<!-- Bootstrap Extended -->
	<script src="<?php echo getURL(); ?>bootstrap/extend/bootstrap-select/bootstrap-select.js"></script>
	<script src="<?php echo getURL(); ?>bootstrap/extend/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
	<script src="<?php echo getURL(); ?>bootstrap/extend/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js"></script>
	<script src="<?php echo getURL(); ?>bootstrap/extend/jasny-bootstrap/js/jasny-bootstrap.min.js" type="text/javascript"></script>
	<script src="<?php echo getURL(); ?>bootstrap/extend/jasny-bootstrap/js/bootstrap-fileupload.js" type="text/javascript"></script>
	<script src="<?php echo getURL(); ?>bootstrap/extend/bootbox.js" type="text/javascript"></script>
	<script src="<?php echo getURL(); ?>bootstrap/extend/bootstrap-wysihtml5/js/wysihtml5-0.3.0_rc2.min.js" type="text/javascript"></script>
	<script src="<?php echo getURL(); ?>bootstrap/extend/bootstrap-wysihtml5/js/bootstrap-wysihtml5-0.0.2.js" type="text/javascript"></script>
	
	<!-- Custom Onload Script -->
	<script src="<?php echo getURL(); ?>theme/scripts/load.js"></script>
	
<?php if ($page == 'documentation'): ?>
	<!-- google-code-prettify -->
	<script src="<?php echo getURL(); ?>theme/scripts/google-code-prettify/prettify.js"></script>
	<script>
	$(function(){
		prettyPrint();
	});
	</script>
	
<?php endif; ?>
<?php if ($page == 'index'): ?>
	<script>
	//Load the Visualization API and the piechart package.
	google.load('visualization', '1.0', {'packages':['table', 'corechart']});
	
	// Set a callback to run when the Google Visualization API is loaded.
	google.setOnLoadCallback(charts.traffic_sources_dataTables.init);
	</script>

<?php endif; ?>
<?php if ($page == 'finances'): ?>
	<!-- jQuery Knob -->
	<script src="<?php echo getURL(); ?>theme/scripts/jquery-knob/js/jquery.knob.js"></script>
	
<?php endif; ?>
<?php if ($page == 'file_managers'): ?>
	<!-- Third party script for BrowserPlus runtime (Google Gears included in Gears runtime now) -->
	<script type="text/javascript" src="http://bp.yahooapis.com/2.4.21/browserplus-min.js"></script>

	<!-- Load plupload and all it's runtimes and finally the jQuery queue widget -->
	<script type="text/javascript" src="<?php echo getURL(); ?>theme/scripts/plupload/js/plupload.full.js"></script>
	<script type="text/javascript" src="<?php echo getURL(); ?>theme/scripts/plupload/js/jquery.plupload.queue/jquery.plupload.queue.js"></script>
	
	<script type="text/javascript">
	// Convert divs to queue widgets when the DOM is ready
	$(function() {
		$("#pluploadUploader").pluploadQueue({
			// General settings
			runtimes : 'gears,browserplus,html5',
			url : '<?php echo getURL(); ?>theme/scripts/plupload/examples/upload.php',
			max_file_size : '10mb',
			chunk_size : '1mb',
			unique_names : true,
	
			// Resize images on clientside if we can
			resize : {width : 320, height : 240, quality : 90},
	
			// Specify what files to browse for
			filters : [
				{title : "Image files", extensions : "jpg,gif,png"},
				{title : "Zip files", extensions : "zip"}
			],
	
			// Flash settings
			flash_swf_url : '<?php echo getURL(); ?>theme/scripts/plupload/js/plupload.flash.swf',
	
			// Silverlight settings
			silverlight_xap_url : '<?php echo getURL(); ?>theme/scripts/plupload/js/plupload.silverlight.xap'
		});
	
		// Client side form validation
		$('#pluploadForm').submit(function(e) {
	        var uploader = $('#pluploadUploader').pluploadQueue();
	
	        // Files in queue upload them first
	        if (uploader.files.length > 0) {
	            // When all files are uploaded submit form
	            uploader.bind('StateChanged', function() {
	                if (uploader.files.length === (uploader.total.uploaded + uploader.total.failed)) {
	                    $('#pluploadForm').submit();
	                }
	            });
	                
	            uploader.start();
	        } else {
	            alert('You must queue at least one file.');
	        }
	
	        return false;
	    });
	});
	</script>
	
<?php endif; ?>
<?php if ($page == 'gallery'): ?>
	<!-- Masonry -->
	<script src="<?php echo getURL(); ?>theme/scripts/jquery.masonry.min.js"></script>
	<script>
	$(function()
	{
		var $container = $('.gallery.paper ul');
		$container
			.imagesLoaded( function(){
				$container.masonry({
					gutterWidth: 20,
			    	itemSelector : 'li',
			    	columnWidth: $('.gallery.paper li:first').width()
			  	});
			});
	});
	</script>

	<!-- Load -->
	<script>
	Modernizr.load({
		test: Modernizr.csstransforms3d && Modernizr.csstransitions,
		yep : ['<?php echo getURL(); ?>theme/scripts/paperGallery/jquery.paperGallery.js'],
		nope: '<?php echo getURL(); ?>theme/scripts/paperGallery/fallback.css',
		callback : function( url, result, key ) 
		{
			if( url === '<?php echo getURL(); ?>theme/scripts/paperGallery/jquery.paperGallery.js' ) {
				$( '.gallery.paper' ).paperGallery();
			}
		}
	});
	</script>

<?php endif; ?>
</body>
</html>