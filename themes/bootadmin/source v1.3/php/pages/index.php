<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('dashboard'); ?></li>
</ul>
<div class="separator"></div>

<h2 class="glyphicons display"><i></i> <?php echo $translate->_('dashboard'); ?></h2>
<div class="separator"></div>

<div class="well">
<div class="row-fluid">
	<div class="span6">
		<div class="relativeWrap">
			<div class="widget widget-body-white margin-bottom-none">
				<div class="widget-head">
					<h4 class="glyphicons cardio heading"><i></i> <?php echo $translate->_('website_traffic'); ?></h4>
					<a data-toggle="dropdown" href="#" class="glyphicons cogwheel pull-right"><i></i></a>
					<ul class="dropdown-menu pull-right">
						<li><a href="#">Action</a></li>
						<li><a href="#">Another action</a></li>
						<li><a href="#">Something else</a></li>
					</ul>
				</div>
				<div class="widget-body">
					<div id="placeholder" style="height: 200px;"></div>
					<div id="overview" style="height: 40px;"></div>
					<div class="btn-group separator top">
						<button id="websiteTraffic24Hours" class="btn btn-small btn-inverse">24 <?php echo $translate->_('hours'); ?></button>
						<button id="websiteTraffic7Days" class="btn btn-small btn-inverse">7 <?php echo $translate->_('days'); ?></button>
						<button id="websiteTraffic14Days" class="btn btn-small btn-inverse">14 <?php echo $translate->_('days'); ?></button>
						<button id="websiteTrafficClear" class="btn btn-small btn-inverse" disabled="disabled"><?php echo $translate->_('clear'); ?></button>
					</div>
				</div>
				<div class="widget-footer">
					<a href="#" class="glyphicons print"><i></i></a>
					<a href="#" class="glyphicons envelope"><i></i></a>
					<a href="#" class="glyphicons camera"><i></i></a>
					<a href="#" class="glyphicons heart"><i></i></a>
					<a href="#" class="glyphicons snowflake"><i></i></a>
					<a href="#" class="glyphicons fire"><i></i></a>
					<a href="#" class="glyphicons magnet"><i></i></a>
					<a href="#" class="glyphicons search"><i></i></a>
				</div>
			</div>
		</div>
	</div>
	<div class="span3">
		<h4 class="glyphicons cardio"><i></i> <?php echo $translate->_('traffic'); ?></h4>
		<hr class="separator" />
		<div class="relativeWrap">
			<div class="widget widget-2 widget-body-white">
				<div class="widget-head">
					<h4 class="glyphicons heading stats"><i></i> <?php echo $translate->_('overview'); ?></h4>
				</div>
				<div class="widget-body list">
					<ul>
						<li><span class="count">350,254</span> <?php echo $translate->_('visits'); ?></li>
						<li><span class="count">120,103</span> <?php echo $translate->_('visitors'); ?></li>
						<li><span class="count">5,156,392</span> <?php echo $translate->_('pageviews'); ?></li>
					</ul>
				</div>
			</div>
		</div>
		<hr class="separator" />
		<div class="relativeWrap">
			<div class="widget widget-2 widget-body-white">
				<div class="widget-head">
					<h4 class="glyphicons heading heart"><i></i> <?php echo $translate->_('interest'); ?></h4>
				</div>
				<div class="widget-body list">
					<ul>
						<li><span class="count">00:01:59</span> <?php echo $translate->_('avg_time'); ?></li>
						<li><span class="count">48%</span> <?php echo $translate->_('returning'); ?></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="span3">
		<!-- <div class="well"> -->
			<h4 class="glyphicons clock"><i></i> <?php echo $translate->_('activity'); ?></h4>
			<hr class="separator" />
			<div class="btn-group btn-group-vertical block">
				<a class="btn btn-icon btn-default btn-block glyphicons group count"><i></i> <span>5,986</span><?php echo $translate->_('total_users'); ?></a>
				<a class="btn btn-icon btn-default btn-block glyphicons user_add count"><i></i> <span>98</span><?php echo $translate->_('new_users'); ?></a>
				<a class="btn btn-icon btn-default btn-block glyphicons shopping_cart count"><i></i> <span>305</span><?php echo $translate->_('products'); ?></a>
			</div>
			<hr class="separator" />
			<div class="btn-group btn-group-vertical block">
				<a class="btn btn-icon btn-default btn-block glyphicons cargo count"><i></i> <span>687</span><?php echo $translate->_('total_orders'); ?></a>
				<a class="btn btn-icon btn-success btn-block glyphicons download count"><i></i> <span>15</span><?php echo $translate->_('pending_orders'); ?></a>
				<a class="btn btn-icon btn-inverse btn-block glyphicons download count"><i></i> <span>3</span><?php echo $translate->_('pending_delivery'); ?></a>
			</div>
			<hr class="separator" />
			<a class="btn btn-icon btn-primary btn-block glyphicons fire count"><i></i> <span>5</span><?php echo $translate->_('support'); ?></a>
		<!-- </div> -->
	</div>
</div>
</div>
<div class="well">
<div class="row-fluid">
	<div class="span6">
		<div class="relativeWrap">
			<div class="widget margin-bottom-none">
				<div class="widget-head">
					<h4 class="glyphicons pie_chart heading"><i></i> <?php echo $translate->_('traffic_sources'); ?></h4>
					<a data-toggle="dropdown" href="#" class="glyphicons cogwheel pull-right"><i></i></a>
					<ul class="dropdown-menu pull-right">
						<li><a href="#">Action</a></li>
						<li><a href="#">Another action</a></li>
						<li><a href="#">Something else</a></li>
					</ul>
				</div>
				<div class="widget-body">
					<div id="pie" style="height: 250px;"></div>
				</div>
				<div class="widget-footer">
					<a href="#" class="glyphicons print"><i></i></a>
					<a href="#" class="glyphicons envelope"><i></i></a>
					<a href="#" class="glyphicons camera"><i></i></a>
					<a href="#" class="glyphicons heart"><i></i></a>
					<a href="#" class="glyphicons snowflake"><i></i></a>
					<a href="#" class="glyphicons fire"><i></i></a>
					<a href="#" class="glyphicons magnet"><i></i></a>
					<a href="#" class="glyphicons search"><i></i></a>
				</div>
			</div>
		</div>
	</div>
	<div class="span6">
		<div class="widget widget-2 widget-tabs">
			<div class="widget-head">
				<ul>
					<li class="active"><a class="glyphicons coffe_cup" href="#dataTableSourcesTab" data-toggle="tab"><i></i><?php echo $translate->_('traffic_sources'); ?></a></li>
					<li><a class="glyphicons share_alt" href="#dataTableRefferingTab" data-toggle="tab"><i></i><?php echo $translate->_('referrals'); ?></a></li>
				</ul>
			</div>
			<div class="widget-body">
				<div class="tab-content">
					<div class="tab-pane active" id="dataTableSourcesTab">
						<div id="dataTableSources"></div>
					</div>
					<div class="tab-pane" id="dataTableRefferingTab">
						<div id="dataTableReffering"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- <a href="" class="btn btn-block btn-icon right btn-inverse glyphicons cardio" style="margin-bottom: 20px;"><i></i> Full Analytics</a> -->
	</div>
</div>
</div>

<br/>