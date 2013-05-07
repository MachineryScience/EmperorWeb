<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('bookings'); ?></li>
</ul>
<div class="separator"></div>

<div class="heading-buttons">
	<h2 class="glyphicons adress_book"><i></i> <?php echo $translate->_('bookings'); ?></h2>
	<div class="buttons pull-right">
		<a href="" class="btn btn-primary btn-icon glyphicons circle_plus"><i></i> <?php echo $translate->_('add_booking'); ?></a>
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

<div class="widget widget-2">
	<div class="widget-head">
		<h4 class="heading glyphicons calendar"><i></i> Friday, 14 December 2012</h4>
	</div>
	<div class="widget-body">
		<div class="separator bottom form-inline small">
			<?php echo $translate->_('total_bookings'); ?>: 26
			<span class="pull-right">
				<label class="strong">Sort by:</label>
				<select class="selectpicker" data-style="btn-default btn-small">
					<option>Option</option>
					<option>Option</option>
					<option>Option</option>
				</select>
			</span>
		</div>
		<table class="table table-bordered table-condensed table-striped table-primary table-vertical-center checkboxs">
			<thead>
				<tr>
					<th width="1%" class="uniformjs"><input type="checkbox" /></th>
					<th class="center"><?php echo $translate->_('no_crt'); ?></th>
					<th class="center"><?php echo $translate->_('time'); ?></th>
					<th class="center"><?php echo $translate->_('client'); ?></th>
					<th class="center"><?php echo $translate->_('phone'); ?></th>
					<th class="center"><?php echo $translate->_('amount'); ?></th>
					<th class="center"><?php echo $translate->_('heard_from'); ?></th>
					<th class="center"><?php echo $translate->_('location'); ?></th>
					<th class="center" width="90"><?php echo $translate->_('actions'); ?></th>
				</tr>
			</thead>
			<tbody>
				<?php $heard = array('Google Search', 'Friend', 'Radio', 'Flyer'); ?>
				<?php $location = array('Hollywood', 'Las Vegas', 'New York', 'Miami'); ?>
				<?php for($i=1;$i<=4;$i++): ?>
				<tr class="selectable">
					<td class="center uniformjs"><input type="checkbox" /></td>
					<td class="center"><?php echo $i; ?></td>
					<td class="center">1<?php echo $i; ?>:00</td>
					<td class="center"><strong>Lorem Ipsum</strong></td>
					<td class="center">0740000000</td>
					<td class="center">&euro;<?php echo mt_rand(10,50); ?></td>
					<td class="center"><?php echo $heard[mt_rand(0,3)]; ?></td>
					<td class="center"><strong><?php echo $location[mt_rand(0,3)]; ?></strong></td>
					<td class="center">
						<a href="#" class="btn-action glyphicons eye_open btn-info"><i></i></a>
						<a href="#" class="btn-action glyphicons pencil btn-success"><i></i></a>
						<a href="#" class="btn-action glyphicons remove_2 btn-danger"><i></i></a>
					</td>
				</tr>
				<?php endfor; ?>
			</tbody>
		</table>
		<div class="separator top form-inline small">
			<div class="pull-left checkboxs_actions hide">
				<label class="strong"><?php echo $translate->_('with_selected'); ?>:</label>
				<select class="selectpicker" data-style="btn-default btn-small">
					<option>Action</option>
					<option>Action</option>
					<option>Action</option>
				</select>
			</div>
			<div class="pagination pagination-small pull-right" style="margin: 0;">
				<ul>
					<li class="disabled"><a href="#">&laquo;</a></li>
					<li class="active"><a href="#">1</a></li>
					<li><a href="#">2</a></li>
					<li><a href="#">3</a></li>
					<li><a href="#">&raquo;</a></li>
				</ul>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</div>
<div class="row-fluid">
	<div class="span4">
		<div class="widget widget-3">
			<div class="widget-head">
				<h4 class="heading"><span class="glyphicons coins"><i></i></span><?php echo $translate->_('total_amount'); ?></h4>
			</div>
			<div class="widget-body large">
				&euro;15,368.50
			</div>
			<div class="widget-footer align-right">
				<a href="#" class="glyphicons print"><i></i> <?php echo $translate->_('print'); ?></a>
				<a href="#" class="glyphicons list"><i></i> <?php echo $translate->_('view'); ?></a>
			</div>
		</div>
	</div>
	<div class="span4">
		<div class="widget widget-3">
			<div class="widget-head">
				<h4 class="heading"><span class="glyphicons user_add"><i></i></span><?php echo $translate->_('new_clients'); ?></h4>
			</div>
			<div class="widget-body large">
				21
			</div>
			<div class="widget-footer">
				<a href="#" class="glyphicons print"><i></i> <?php echo $translate->_('print'); ?></a>
				<a href="#" class="glyphicons list"><i></i> <?php echo $translate->_('view'); ?></a>
			</div>
		</div>
	</div>
	<div class="span4">
		<div class="widget widget-3">
			<div class="widget-head">
				<h4 class="heading"><span class="glyphicons user_remove"><i></i></span><?php echo $translate->_('cancellations'); ?></h4>
			</div>
			<div class="widget-body large cancellations">
				4 
				<span>
					<span><?php echo $translate->_('lost'); ?></span>
					<span>&euro;89.00</span>
				</span>
			</div>
			<div class="widget-footer align-center">
				<a href="#" class="glyphicons print"><i></i> <?php echo $translate->_('print'); ?></a>
				<a href="#" class="glyphicons list"><i></i> <?php echo $translate->_('view'); ?></a>
			</div>
		</div>
	</div>
</div>
<br/>