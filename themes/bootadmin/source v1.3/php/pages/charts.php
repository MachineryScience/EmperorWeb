<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('charts'); ?></li>
</ul>
<div class="separator"></div>

<h2 class="glyphicons charts"><i></i> <?php echo $translate->_('charts'); ?></h2>
<div class="separator"></div>
<div class="row-fluid">
	<div class="span6">
		<div class="relativeWrap">
		<div class="widget widget-gray widget-body-white">
			<div class="widget-head">
				<h4 class="heading"><?php echo $translate->_('chart_simple'); ?></h4>
			</div>
			<div class="widget-body">
				<div id="chart_simple" style="height: 250px;"></div>
			</div>
		</div>
		</div>
	</div>
	<div class="span6">
		<div class="relativeWrap">
		<div class="widget widget-gray widget-body-white">
			<div class="widget-head">
				<h4 class="heading"><?php echo $translate->_('chart_lines_fill_nopoints'); ?></h4>
			</div>
			<div class="widget-body">
				<div id="chart_lines_fill_nopoints" style="height: 250px;"></div>
			</div>
		</div>
		</div>
	</div>
</div>
<div class="row-fluid">
	<div class="span6">
		<div class="relativeWrap">
		<div class="widget widget-gray widget-body-white">
			<div class="widget-head">
				<h4 class="heading"><?php echo $translate->_('chart_ordered_bars'); ?></h4>
			</div>
			<div class="widget-body">
				<div id="chart_ordered_bars" style="height: 250px;"></div>
			</div>
		</div>
		</div>
	</div>
	<div class="span6">
		<div class="relativeWrap">
		<div class="widget widget-gray widget-body-white">
			<div class="widget-head">
				<h4 class="heading"><?php echo $translate->_('chart_donut'); ?></h4>
			</div>
			<div class="widget-body">
				<div id="chart_donut" style="height: 250px;"></div>
			</div>
		</div>
		</div>
	</div>
</div>
<div class="row-fluid">
	<div class="span6">
		<div class="relativeWrap">
		<div class="widget widget-gray widget-body-white">
			<div class="widget-head">
				<h4 class="heading"><?php echo $translate->_('chart_stacked_bars'); ?></h4>
			</div>
			<div class="widget-body">
				<div id="chart_stacked_bars" style="height: 250px;"></div>
			</div>
		</div>
		</div>
	</div>
	<div class="span6">
		<div class="relativeWrap">
		<div class="widget widget-gray widget-body-white">
			<div class="widget-head">
				<h4 class="heading"><?php echo $translate->_('chart_pie'); ?></h4>
			</div>
			<div class="widget-body">
				<div id="chart_pie" style="height: 250px;"></div>
			</div>
		</div>
		</div>
	</div>
</div>
<div class="row-fluid">
	<div class="span6">
		<div class="relativeWrap">
		<div class="widget widget-gray widget-body-white">
			<div class="widget-head">
				<h4 class="heading"><?php echo $translate->_('chart_horizontal_bars'); ?></h4>
			</div>
			<div class="widget-body">
				<div id="chart_horizontal_bars" style="height: 250px;"></div>
			</div>
		</div>
		</div>
	</div>
	<div class="span6">
		<div class="relativeWrap">
		<div class="widget widget-gray widget-body-white">
			<div class="widget-head">
				<h4 class="heading"><?php echo $translate->_('chart_live'); ?></h4>
			</div>
			<div class="widget-body">
				<div id="chart_live" style="height: 250px;"></div>
			</div>
		</div>
		</div>
	</div>
</div>