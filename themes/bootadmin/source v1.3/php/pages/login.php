<div class="positionWrapper loginWrapper hide">
	<span class="line"></span>
	<div class="box-1 loginbox">
		<div class="inner">
			<form action="<?php echo getURL(array('index')); ?>" method="post" class="fts">
				<fieldset>
					<legend>Restricted Area</legend>
					<hr class="separator bottom" style="margin-bottom: 10px;" />
					<div class="input-prepend input-full">
						<span class="add-on glyphicons user"><i></i></span>
						<input type="text" name="" class="" placeholder="<?php echo $translate->_('username'); ?>" />
					</div>
					<div class="input-prepend input-full">
						<span class="add-on glyphicons lock"><i></i></span>
						<input type="password" name="" class="" placeholder="<?php echo $translate->_('password'); ?>" />
					</div>
					<a href="" class="glyphicons circle_question_mark forgot"><?php echo $translate->_('forgot_password'); ?> <i></i></a>
					<hr class="separator bottom" style="margin-bottom: 10px;" />
					<button type="submit" class="btn btn-icon btn-block glyphicons right flash btn-primary"><?php echo $translate->_('login'); ?><i></i></button>
				</fieldset>
			</form>
		</div>
	</div>
	<div class="btn-register">
		<a href="#" class="btn btn-icon btn-success glyphicons edit"><i></i><?php echo $translate->_('register'); ?></a>
	</div>
</div>

<div>
	<div class="positionWrapper registerWrapper hide">
		<span class="line"></span>
		<div class="box-1 registerbox">
			<div class="inner">
				<form action="<?php echo getURL(array('index')); ?>" method="post" class="fts">
					<input type="text" name="" placeholder="<?php echo $translate->_('username'); ?>" />
					<input type="password" name="" placeholder="<?php echo $translate->_('password'); ?>" />
					<button type="submit" class="btn btn-icon btn-block glyphicons right edit btn-success"><?php echo $translate->_('register'); ?><i></i></button>
				</form>
			</div>
		</div>
		<div class="btn-login">
			<a href="#" class="btn btn-icon btn-primary glyphicons unlock"><i></i><?php echo $translate->_('login'); ?></a>
		</div>
	</div>
</div>