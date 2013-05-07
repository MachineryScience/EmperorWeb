<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('forms'); ?></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('form_demo'); ?></li>
</ul>
<div class="separator"></div>

<h2 class="glyphicons user"><i></i> <?php echo $translate->_('my_account'); ?></h2>
<div class="separator"></div>

<div class="row-fluid">
	
	<div class="span9">
		<form class="form-horizontal">
		<div class="tab-content" style="padding: 0;">
			<div class="tab-pane active" id="account-details">
			
				<div class="widget widget-2">
					<div class="widget-head">
						<h4 class="heading glyphicons edit"><i></i><?php echo $translate->_('personal_details'); ?></h4>
					</div>
					<div class="widget-body" style="padding-bottom: 0;">
						<div class="row-fluid">
							<div class="span6">
								<div class="control-group">
									<label class="control-label"><?php echo $translate->_('first_name'); ?></label>
									<div class="controls">
										<input type="text" value="John" class="span10" />
										<span style="margin: 0;" class="btn-action single glyphicons circle_question_mark" rel="popover" data-placement="top" data-original-title="Help" data-content="First name is mandatory"><i></i></span>
									</div>
								</div>
								<div class="control-group">
									<label class="control-label"><?php echo $translate->_('last_name'); ?></label>
									<div class="controls">
										<input type="text" value="Doe" class="span10" />
										<span style="margin: 0;" class="btn-action single glyphicons circle_question_mark" rel="popover" data-placement="top" data-original-title="Help" data-content="Last name is mandatory"><i></i></span>
									</div>
								</div>
								<div class="control-group">
									<label class="control-label"><?php echo $translate->_('date_of_birth'); ?></label>
									<div class="controls">
										<div class="input-append">
											<input type="text" id="datepicker" class="span12" value="13/06/1988" />
											<span class="add-on glyphicons calendar"><i></i></span>
										</div>
									</div>
								</div>
							</div>
							<div class="span6">
								<div class="control-group">
									<label class="control-label"><?php echo $translate->_('gender'); ?></label>
									<div class="controls">
										<select class="span12">
											<option><?php echo $translate->_('male'); ?></option>
											<option><?php echo $translate->_('female'); ?></option>
										</select>
									</div>
								</div>
								<div class="control-group">
									<label class="control-label"><?php echo $translate->_('age'); ?></label>
									<div class="controls">
										<input type="text" value="25" class="input-mini" />
									</div>
								</div>
							</div>
						</div>
						<hr class="separator bottom" />
						<div class="control-group">
							<label class="control-label"><?php echo $translate->_('about_me'); ?></label>
							<div class="controls">
								<textarea id="mustHaveId" class="wysihtml5 span12" rows="5">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</textarea>
							</div>
						</div>
						<div class="form-actions" style="margin: 0;">
							<button type="submit" class="btn btn-icon btn-primary glyphicons circle_ok"><i></i><?php echo $translate->_('save_changes'); ?></button>
							<button type="button" class="btn btn-icon btn-default glyphicons circle_remove"><i></i><?php echo $translate->_('cancel'); ?></button>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-pane" id="account-settings">
				<div class="widget widget-2">
					<div class="widget-head">
						<h4 class="heading glyphicons settings"><i></i><?php echo $translate->_('account_settings'); ?></h4>
					</div>
					<div class="widget-body" style="padding-bottom: 0;">
						<div class="row-fluid">
							<div class="span3">
								<strong><?php echo $translate->_('change_password'); ?></strong>
								<p class="muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</div>
							<div class="span9">
								<label for="inputEmail"><?php echo $translate->_('username'); ?></label>
								<input type="text" id="" class="span10" value="john.doe2012" disabled="disabled" />
								<span style="margin: 0;" class="btn-action single glyphicons circle_question_mark" rel="popover" data-placement="top" data-original-title="Help" data-content="Username can't be changed"><i></i></span>
								<div class="separator"></div>
										
								<label for="inputPasswordOld"><?php echo $translate->_('old_password'); ?></label>
								<input type="password" id="inputPasswordOld" class="span10" value="" placeholder="Leave empty for no change" />
								<span style="margin: 0;" class="btn-action single glyphicons circle_question_mark" rel="popover" data-placement="top" data-original-title="Help" data-content="Leave empty if you don't wish to change the password"><i></i></span>
								<div class="separator"></div>
								
								<label for="inputPasswordNew"><?php echo $translate->_('new_password'); ?></label>
								<input type="password" id="inputPasswordNew" class="span12" value="" placeholder="Leave empty for no change" />
								<div class="separator"></div>
								
								<label for="inputPasswordNew2"><?php echo $translate->_('repeat_new_password'); ?></label>
								<input type="password" id="inputPasswordNew2" class="span12" value="" placeholder="Leave empty for no change" />
								<div class="separator"></div>
							</div>
						</div>
						<hr class="separator bottom" />
						<div class="row-fluid">
							<div class="span3">
								<strong><?php echo $translate->_('contact_details'); ?></strong>
								<p class="muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</div>
							<div class="span9">
								<div class="row-fluid">
								<div class="span6">
									<label for="inputEmail"><?php echo $translate->_('phone'); ?></label>
									<div class="input-prepend">
										<span class="add-on glyphicons phone"><i></i></span>
										<input type="text" id="inputEmail" class="input-large" placeholder="01234567897" />
									</div>
									<div class="separator"></div>
										
									<label for="inputEmail">E-mail</label>
									<div class="input-prepend">
										<span class="add-on glyphicons envelope"><i></i></span>
										<input type="text" id="inputEmail" class="input-large" placeholder="contact@mosaicpro.biz" />
									</div>
									<div class="separator"></div>
										
									<label for="inputEmail">Website</label>
									<div class="input-prepend">
										<span class="add-on glyphicons link"><i></i></span>
										<input type="text" id="inputEmail" class="input-large" placeholder="http://www.mosaicpro.biz" />
									</div>
									<div class="separator"></div>
								</div>
								<div class="span6">
									<label for="inputYahoo">Facebook</label>
									<div class="input-prepend">
										<span class="add-on glyphicons facebook"><i></i></span>
										<input type="text" id="inputYahoo" class="input-large" placeholder="/mosaicpro" />
									</div>
									<div class="separator"></div>
									
									<label for="inputYahoo">Twitter</label>
									<div class="input-prepend">
										<span class="add-on glyphicons twitter"><i></i></span>
										<input type="text" id="inputYahoo" class="input-large" placeholder="/mosaicpro" />
									</div>
									<div class="separator"></div>
									
									<label for="inputSkype">Skype ID</label>
									<div class="input-prepend">
										<span class="add-on glyphicons skype"><i></i></span>
										<input type="text" id="inputSkype" class="input-large" placeholder="mySkypeID" />
									</div>
									<div class="separator"></div>
									
									<label for="inputYahoo">Yahoo ID</label>
									<div class="input-prepend">
										<span class="add-on glyphicons yahoo"><i></i></span>
										<input type="text" id="inputYahoo" class="input-large" placeholder="myYahooID" />
									</div>
									<div class="separator"></div>
								</div>
								</div>
							</div>
						</div>
						<div class="form-actions" style="margin: 0; padding-right: 0;">
							<button type="submit" class="btn btn-icon btn-primary glyphicons circle_ok pull-right"><i></i><?php echo $translate->_('save_changes'); ?></button>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		</form>
		
	</div>
	
	<div class="span3">
		<div class="widget widget-2 primary widget-body-white">
			<div class="widget-head">
				<h4 class="heading glyphicons pencil"><i></i> <?php echo $translate->_('edit_account'); ?></h4>
			</div>
			<div class="widget-body list list-2">
				<ul>
					<li class="active"><a class="glyphicons user" href="#account-details" data-toggle="tab"><i></i><?php echo $translate->_('account_details'); ?></a></li>
	   				<li><a class="glyphicons settings" href="#account-settings" data-toggle="tab"><i></i><?php echo $translate->_('account_settings'); ?></a></li>
				</ul>
			</div>
		</div>
		<div class="widget widget-2 primary widget-body-white">
			<div class="widget-head">
				<h4 class="heading glyphicons picture"><i></i><?php echo $translate->_('profile_image'); ?></h4>
			</div>
			<div class="widget-body center">
				<div class="fileupload fileupload-new" data-provides="fileupload">
				  <div class="fileupload-new thumbnail"><img src="<?php if (DEV): ?><?php echo getURL(); ?>theme/images/demo/200_nerdsmile651rw6.jpg<?php else: ?>http://www.placehold.it/202x188/232323<?php endif; ?>" /></div>
				  <div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 100%;"></div>
				  <div>
					  <span class="btn btn-file btn-inverse btn-icon glyphicons picture"><i></i><span class="fileupload-new"><?php echo $translate->_('select_image'); ?></span><span class="fileupload-exists"><?php echo $translate->_('change'); ?></span><input type="file" /></span>
					  <a href="#" class="btn fileupload-exists" data-dismiss="fileupload"><?php echo $translate->_('remove'); ?></a>
				  </div>
				</div>
			</div>
		</div>
	</div>
</div>
<br/>
