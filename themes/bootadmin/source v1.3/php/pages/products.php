<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('online_shop'); ?></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('products'); ?></li>
</ul>
<div class="separator"></div>

<div class="heading-buttons">
	<h2 class="glyphicons shopping_cart"><i></i> <?php echo $translate->_('products'); ?></h2>
	<div class="buttons pull-right">
		<a href="" class="btn btn-primary btn-icon glyphicons circle_plus"><i></i> <?php echo $translate->_('add_product'); ?></a>
		<a href="" class="btn btn-default btn-icon glyphicons inbox"><i></i> <?php echo $translate->_('manage_categories'); ?></a>
	</div>
</div>
<div class="separator"></div>

<div class="row-fluid">
	<div class="span9">
		<div class="widget widget-2">
			<div class="widget-head">
				<h4 class="heading glyphicons list"><i></i> <?php echo $translate->_('manage_products'); ?></h4>
			</div>
			<div class="widget-body">
				<div class="separator bottom form-inline small">
					<?php echo $translate->_('total_products'); ?>: 26
					<span class="pull-right">
						<label class="strong"><?php echo $translate->_('sort_by'); ?>:</label>
						<select class="selectpicker" data-style="btn-default btn-small">
							<option>Option</option>
							<option>Option</option>
							<option>Option</option>
						</select>
					</span>
				</div>
				<table class="table table-bordered table-condensed table-striped table-primary table-vertical-center checkboxs js-table-sortable">
					<thead>
						<tr>
							<th width="1%" class="uniformjs"><input type="checkbox" /></th>
							<th width="1%" class="center"><?php echo $translate->_('no_crt'); ?></th>
							<th><?php echo $translate->_('title'); ?></th>
							<th width="1%" class="center"><?php echo $translate->_('drag'); ?></th>
							<th class="center"><?php echo $translate->_('preview'); ?></th>
							<th class="center"><?php echo $translate->_('stock'); ?></th>
							<th class="center"><?php echo $translate->_('price'); ?></th>
							<th class="center" width="60"><?php echo $translate->_('actions'); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php $prod = array('Dolor Ipsum', 'Ipsum Sit', 'Amet Dolor'); ?>
						<?php for($i=1;$i<=10;$i++): ?>
						<tr class="selectable<?php if ($i == 2 || $i == 3): ?> selected<?php endif; ?>">
							<td class="center uniformjs"><input type="checkbox"<?php if ($i == 2 || $i == 3): ?> checked="checked"<?php endif; ?> /></td>
							<td class="center"><?php echo $i; ?></td>
							<td><strong>Lorem <?php echo $prod[mt_rand(0,2)]; ?></strong></td>
							<td class="center js-sortable-handle"><span class="glyphicons btn-action single move" style="margin-right: 0;"><i></i></span></td>
							<td class="center important"><span class="glyphicons btn-action single picture" style="margin-right: 0;"><i></i></span><?php echo mt_rand(1,3); ?> photos</td>
							<td class="center form-inline small">
								<input type="text" style="width: 30px;" value="<?php echo mt_rand(1,10); ?>" />
							</td>
							<td class="center">&euro;<?php echo mt_rand(10,50); ?></td>
							<td class="center">
								<a href="<?php echo getURL(array('product_edit')); ?>" class="btn-action glyphicons pencil btn-success"><i></i></a>
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
	</div>
	<div class="span3">
		<div class="widget widget-2 primary widget-body-white">
			<div class="widget-head">
				<h4 class="heading glyphicons cogwheel"><i></i> <?php echo $translate->_('filter'); ?></h4>
			</div>
			<div class="widget-body list list-2 fluid js-filters form-inline small">
				<ul>
					<li>
						<div class="input-append block">
							<input type="text" placeholder="<?php echo $translate->_('search'); ?> ..." />
							<span class="add-on glyphicons search"><i></i></span>
						</div>
					</li>
					<li class="right">
						<label class="span4"><?php echo $translate->_('categories'); ?>:</label>
						<div class="right">
							<select class="js-filter-category" name="category" style="width: 120px;">
								<option>Category</option>
								<option>Category</option>
								<option>Category</option>
							</select>
						</div>
					</li>
					<li class="js-filter-categories center">
						<span class="label label-important"><?php echo $translate->_('category'); ?> <strong>&times;</strong></span>
						<span class="label label-important"><?php echo $translate->_('category'); ?> <strong>&times;</strong></span>
						<span class="label label-important"><?php echo $translate->_('category'); ?> <strong>&times;</strong></span>
					</li>
					<li>
						<label class="span4"><?php echo $translate->_('select'); ?>:</label>
						<div class="right">
							<select class="" name="from" style="width: 120px;">
								<option>Some option</option>
								<option>Other option</option>
								<option>Some other option</option>
							</select>
						</div>
					</li>
					<li>
						<label><?php echo $translate->_('from'); ?>:</label>
						<div class="right">
							<div class="input-append">
								<input type="text" name="from" id="dateRangeFrom" class="input-mini" value="08/05/13" style="width: 85px;" />
								<span class="add-on glyphicons calendar"><i></i></span>
							</div>
						</div>
					</li>
					<li>
						<label><?php echo $translate->_('to'); ?>:</label>
						<div class="right">
							<div class="input-append">
								<input type="text" name="to" id="dateRangeTo" class="input-mini" value="08/18/13" style="width: 85px;" />
								<span class="add-on glyphicons calendar"><i></i></span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="widget-body list list-2">
				<ul>
					<li class="active"><a href="" class="glyphicons link"><i></i><?php echo $translate->_('show_active_products'); ?></a></li>
					<li><a href="" class="glyphicons link"><i></i><?php echo $translate->_('show_inactive_products'); ?></a></li>
				</ul>
			</div>
		</div>
	</div>
</div>
<br/>