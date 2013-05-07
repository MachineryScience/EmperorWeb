<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('site_pages'); ?></li>
</ul>
<div class="separator"></div>

<div class="heading-buttons">
	<h2 class="glyphicons sort"><i></i> <?php echo $translate->_('site_pages'); ?></h2>
	<div class="buttons pull-right">
		<a href="" class="btn btn-primary btn-icon glyphicons circle_plus"><i></i> <?php echo $translate->_('add_page'); ?></a>
	</div>
</div>
<div class="separator"></div>

<?php $pages = array('Home Page', 'About us', 'Photo Gallery', 'Contact us', 'Services', 'Events', 'Testimonials', 'Our Blog', 'Custom Page', 'Opening Hours'); ?>
<div class="row-fluid pages">
	<ul>
		<?php foreach ($pages as $pk => $p): ?>
		<li class="span3 glyphicons notes<?php if ($pk == 8 || $pk == 9): ?> primary<?php endif; ?>">
			<i></i>
			<strong><?php echo $p; ?></strong>
			<span class="actions">
				<a href="" class="glyphicons edit"><i></i> Edit</a> | <a href="" class="glyphicons remove_2"><i></i> Delete</a>
			</span>
		</li>
		<?php endforeach; ?>
	</ul>
</div>
<br/>

<h4>Table view</h4>
<hr class="separator bottom" />
<table class="table table-bordered table-condensed table-striped table-primary table-vertical-center checkboxs js-table-sortable">
	<thead>
		<tr>
			<th width="1%" class="uniformjs"><input type="checkbox" /></th>
			<th width="1%" class="center"><?php echo $translate->_('no_crt'); ?></th>
			<th><?php echo $translate->_('title'); ?></th>
			<th width="1%" class="center"><?php echo $translate->_('drag'); ?></th>
			<th class="center"><?php echo $translate->_('author'); ?></th>
			<th class="right" colspan="3"><?php echo $translate->_('actions'); ?></th>
		</tr>
	</thead>
	<tbody>
		<?php $authors = array('Admin', 'MosaicPro', 'Guest'); ?>
		<?php $actions = array('<span class="label label-block label-important">created</span>', '<span class="label label-block label-inverse">updated</span>'); ?>
		<?php foreach($pages as $pk => $p): ?>
		<tr class="selectable">
			<td class="center uniformjs"><input type="checkbox" /></td>
			<td class="center"><?php echo $pk + 1; ?></td>
			<td><strong><?php echo $p; ?></strong></td>
			<td class="center js-sortable-handle"><span class="glyphicons btn-action single move" style="margin-right: 0;"><i></i></span></td>
			<td class="center important"><?php echo $authors[mt_rand(0,2)]; ?></td>
			<td class="center" width="80">22 Jan 2013</td>
			<td class="center" width="80"><?php echo $actions[mt_rand(0,1)]; ?></td>
			<td class="center" width="60">
				<a href="#" class="btn-action glyphicons pencil btn-success"><i></i></a>
				<a href="#" class="btn-action glyphicons remove_2 btn-danger"><i></i></a>
			</td>
		</tr>
		<?php endforeach; ?>
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
<br/>