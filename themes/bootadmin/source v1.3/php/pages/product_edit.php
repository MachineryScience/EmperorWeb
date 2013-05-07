<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('online_shop'); ?></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('add_product'); ?></li>
</ul>
<div class="separator"></div>

<div class="heading-buttons">
	<h2 class="glyphicons cart_in"><i></i> <?php echo $translate->_('add_product'); ?></h2>
	<div class="buttons pull-right">
		<a href="" class="btn btn-default btn-icon glyphicons share"><i></i> <?php echo $translate->_('preview'); ?></a>
		<a href="" class="btn btn-primary btn-icon glyphicons ok_2"><i></i> <?php echo $translate->_('save'); ?></a>
	</div>
</div>
<div class="separator"></div>

<div class="widget widget-2 widget-tabs">
	<div class="widget-head">
		<ul>
			<li class="active"><a href="#productDescriptionTab" data-toggle="tab" class="glyphicons font"><i></i><?php echo $translate->_('description'); ?></a></li>
			<li><a href="#productPhotosTab" data-toggle="tab" class="glyphicons picture"><i></i><?php echo $translate->_('photos'); ?></a></li>
			<li><a href="#productAttributesTab" data-toggle="tab" class="glyphicons adjust_alt"><i></i><?php echo $translate->_('custom_attributes'); ?></a></li>
			<li><a href="#productPriceTab" data-toggle="tab" class="glyphicons table"><i></i><?php echo $translate->_('qty_and_price'); ?></a></li>
			<li><a href="#productSeoTab" data-toggle="tab" class="glyphicons podium"><i></i>SEO</a></li>
		</ul>
	</div>
	<div class="widget-body large">
		<div class="tab-content">
		
			<!-- Description -->
			<div class="tab-pane active" id="productDescriptionTab">
				<div class="row-fluid">
					<div class="span3">
						<strong><?php echo $translate->_('product_title'); ?></strong>
						<p class="muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>
					<div class="span9">
						<label for="inputEmail"><?php echo $translate->_('title'); ?></label>
						<input type="text" id="" class="span6" value="" placeholder="Enter product title ..." />
						<div class="separator"></div>
					</div>
				</div>
				<hr class="separator bottom" />
				<div class="row-fluid">
					<div class="span3">
						<strong><?php echo $translate->_('description'); ?></strong>
						<p class="muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</div>
					<div class="span9">
						<label for="inputEmail"><?php echo $translate->_('description'); ?></label>
						<textarea id="mustHaveId" class="wysihtml5 span12" rows="5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</textarea>
					</div>
				</div>
			</div>
			<!-- Description END -->
			
			<!-- Photos -->
			<div class="tab-pane" id="productPhotosTab">
			
			</div>
			<!-- Photos END -->
			
			<!-- Attributes -->
			<div class="tab-pane" id="productAttributesTab">
			
			</div>
			<!-- Attributes END -->
			
			<!-- Price -->
			<div class="tab-pane" id="productPriceTab">
			
			</div>
			<!-- Price END -->
			
			<!-- SEO -->
			<div class="tab-pane" id="productSeoTab">
			
			</div>
			<!-- SEO END -->
			
		</div>
	</div>
</div>
<div class="heading-buttons">
	<div class="buttons pull-right" style="margin-top: 0;">
		<a href="" class="btn btn-default btn-icon glyphicons share"><i></i> <?php echo $translate->_('preview'); ?></a>
		<a href="" class="btn btn-primary btn-icon glyphicons ok_2"><i></i> <?php echo $translate->_('save'); ?></a>
	</div>
	<div class="clearfix"></div>
</div>
<br/>