<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('photo_gallery'); ?></li>
</ul>
<div class="separator"></div>

<h2 class="glyphicons picture"><i></i> <?php echo $translate->_('photo_gallery'); ?></h2>
<div class="separator"></div>

<div class="well">
	<div class="row-fluid gallery paper">
		<ul>
			<?php for ($i=1; $i<=12; $i++): ?>
			<li class="span3">
				<span class="thumb view">
					<span class="back">
						<span class="btn btn-mini btn-primary">edit</span>
						<a href="" class="arr">&rarr;</a>
					</span>
					<img src="<?php echo getURL(); ?>theme/images/gallery/rs/<?php echo $i; ?>.jpg" alt="Album" />
				</span>
				<span class="name"></span>
			</li>
			<?php endfor; ?>
		</ul>
	</div>
</div>