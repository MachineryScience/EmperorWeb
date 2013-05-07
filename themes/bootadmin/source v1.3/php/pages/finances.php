<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('finances'); ?></li>
</ul>
<div class="separator"></div>

<div class="heading-buttons">
	<h2 class="glyphicons coins"><i></i> <?php echo $translate->_('finances'); ?></h2>
	<div class="buttons pull-right">
		<a href="" class="btn btn-primary btn-icon glyphicons circle_plus"><i></i> <?php echo $translate->_('add_record'); ?></a>
		<a href="" class="btn btn-default btn-icon glyphicons history"><i></i> <?php echo $translate->_('history'); ?></a>
	</div>
</div>
<div class="separator"></div>

<div class="filter-bar">
	<form>
		<div class="lbl glyphicons cogwheel"><i></i><?php echo $translate->_('filter'); ?></div>
		<div>
			<label><?php echo $translate->_('from'); ?>:</label>
			<div class="input-append">
				<input type="text" name="from" id="dateRangeFrom" class="input-mini" value="08/05/13" style="width: 53px;" />
				<span class="add-on glyphicons calendar"><i></i></span>
			</div>
		</div>
		<div>
			<label><?php echo $translate->_('to'); ?>:</label>
			<div class="input-append">
				<input type="text" name="to" id="dateRangeTo" class="input-mini" value="08/18/13" style="width: 53px;" />
				<span class="add-on glyphicons calendar"><i></i></span>
			</div>
		</div>
		<div>
			<label>Min:</label>
			<div class="input-append">
				<input type="text" name="from" class="input-mini" style="width: 30px;" value="100" />
				<span class="add-on glyphicons euro"><i></i></span>
			</div>
		</div>
		<div>
			<label>Max:</label>
			<div class="input-append">
				<input type="text" name="from" class="input-mini" style="width: 30px;" value="500" />
				<span class="add-on glyphicons euro"><i></i></span>
			</div>
		</div>
		<div>
			<label><?php echo $translate->_('select'); ?>:</label>
			<select name="from" style="width: 120px;">
				<option>Some option</option>
				<option>Other option</option>
				<option>Some other option</option>
			</select>
		</div>
		<div class="clearfix"></div>
	</form>
</div>

<div class="row-fluid">
<div class="span9">
		<div class="widget widget-2 widget-body-white finances_summary">
			<div class="widget-head">
				<h4 class="heading glyphicons alarm"><i></i> <?php echo $translate->_('summary'); ?></h4>
			</div>
			<div class="widget-body">
				<div class="row-fluid">
					<div class="span4">
						<div class="well">
							<?php echo $translate->_('total_expenses'); ?>
							<strong>&euro;32,156.00</strong>
						</div>
						<div class="separator bottom center">
							<span class="glyphicons flash standard"><i></i></span>
						</div>
						<div class="well">
							<?php echo $translate->_('total_income'); ?>
							<strong>&euro;122,134.00</strong>
						</div>
					</div>
					<div class="span8">
						<div id="chart_simple" style="height: 290px;"></div>
					</div>
				</div>
				<a href="" class="glyphicons list single"><i></i> <?php echo $translate->_('view_details'); ?></a>
			</div>
		</div>
		<div class="widget widget-2 widget-body-white">
			<div class="widget-head">
				<h4 class="heading glyphicons fire"><i></i> <?php echo $translate->_('transactions'); ?></h4>
			</div>
			<div class="widget-body">
				<table class="table table-condensed table-primary table-vertical-center table-thead-simple">
					<thead>
						<tr>
							<th class="center" width="1%"><?php echo $translate->_('no_crt'); ?></th>
							<th><?php echo $translate->_('transaction'); ?></th>
							<th width="100" class="center"><?php echo $translate->_('date'); ?></th>
							<th width="100" class="center"><?php echo $translate->_('amount'); ?></th>
							<th width="100" class="right"><?php echo $translate->_('actions'); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php 
						$trans = array('ThemeForest', 'Bank of Ireland', 'Amazon Web Services', 'Supplier Abc Xyz');
						$type = array(
							'<span class="glyphicons up_arrow btn-success btn-action single"><i></i></span>',
							'<span class="glyphicons down_arrow btn-danger btn-action single"><i></i></span>'	
						); 
						?>
						<?php for($i=1;$i<=6;$i++): ?>
						<tr class="selectable">
							<td class="center"><?php echo $i; ?></td>
							<td class="important"><?php echo $type[mt_rand(0,1)] . $trans[mt_rand(0,3)]; ?></td>
							<td class="center"><span class="label label-important">23 Jan 2013</span></td>
							<td class="center">&euro;<?php echo number_format(mt_rand(100,800),2); ?></td>
							<td class="right actions">
								<a href="#" class="btn-action glyphicons eye_open btn-info"><i></i></a>
								<a href="#" class="btn-action glyphicons pencil btn-success"><i></i></a>
								<a href="#" class="btn-action glyphicons remove_2 btn-danger"><i></i></a>
							</td>
						</tr>
						<?php endfor; ?>
					</tbody>
				</table>
				<div class="separator top"><a href="" class="glyphicons list single"><i></i> <?php echo $translate->_('show_all'); ?></a></div>
			</div>
		</div>
	</div>
	<div class="span3">
		<div class="widget widget-2 primary widget-body-white">
			<div class="widget-head">
				<h4 class="heading glyphicons show_lines"><i></i> <?php echo $translate->_('sidebar_menu'); ?></h4>
			</div>
			<div class="widget-body list list-2">
				<ul>
					<li class="active"><a href="" class="glyphicons link"><i></i><?php echo $translate->_('overview'); ?></a></li>
					<li><a href="" class="glyphicons link"><i></i><?php echo $translate->_('creditors'); ?></a></li>
					<li><a href="" class="glyphicons link"><i></i><?php echo $translate->_('debitors'); ?></a></li>
					<li><a href="" class="glyphicons link"><i></i><?php echo $translate->_('clients'); ?></a></li>
				</ul>
			</div>
		</div>
		<div class="widget widget-2 primary widget-body-white finances_cashflow">
			<div class="widget-head">
				<h4 class="heading glyphicons retweet"><i></i> <?php echo $translate->_('cash_flow'); ?></h4>
			</div>
			<div class="widget-body list list-2 fluid">
				<ul>
					<li style="text-align: center;">
						<span class="glyphicons up_arrow btn-success btn-action single"><i></i></span>
						<span class="amount">&euro;368.58</span>
					</li>
					<li style="text-align: center; padding: 30px 0 0;">
						<span class="circular-item">
							<span class="glyphicons riflescope btn-danger btn-action single"><i></i></span>
							<span class="target"><?php echo $translate->_('out_of'); ?> <strong>&euro;150.000</strong></span>
							<input class="knob" data-fgColor="#da4c4c" data-prepend="&euro;" data-angleOffset=-125 data-angleArc="250" data-value="22" data-max="150000" data-thickness=".2" data-readOnly="true" value="22532" />
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
<br/>