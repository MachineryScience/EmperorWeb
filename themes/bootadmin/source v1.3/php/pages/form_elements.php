<ul class="breadcrumb">
	<li><a href="<?php echo getURL(array('index')); ?>" class="glyphicons home"><i></i> BootAdmin</a></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('forms'); ?></li>
	<li class="divider"></li>
	<li><?php echo $translate->_('form_elements'); ?></li>
</ul>
<div class="separator"></div>

<h2 class="glyphicons show_thumbnails_with_lines"><i></i> <?php echo $translate->_('forms'); ?></h2>
<p>There are various form elements contained in BootAdmin, custom select controls, custom checkbox &amp; radio controls, custom input controls with &amp; without appended / prepended elements (icons, dropdowns, dropups, groups), toggle (on/off) buttons, icons &amp; many more.</p>
<div class="separator"></div>

<div class="relativeWrap">
	<div class="widget widget-gray">
		<div class="widget-head">
			<h4 class="heading">WYSIHTML5 Editor</h4>
		</div>
		<div class="widget-body">
			<textarea id="mustHaveId" class="wysihtml5 span12" rows="10"></textarea>
		</div>
	</div>
</div>

<div class="relativeWrap">
	<div class="widget widget-gray">
		<div class="widget-head">
			<h4 class="heading">Select controls</h4>
		</div>
		<div class="widget-body">
			<div class="row-fluid">
				<div class="span3">
					<h5>Default</h5>
					<div class="row-fluid">
						<select class="span12">
							<optgroup label="Picnic">
								<option>Mustard</option>
								<option>Ketchup</option>
								<option>Relish</option>
							</optgroup>
							<optgroup label="Camping">
								<option>Tent</option>
								<option>Flashlight</option>
								<option>Toilet Paper</option>
							</optgroup>
						</select>
					</div>
					<hr/>
					<h5>Extended</h5>
					<div class="row-fluid">
						<select class="selectpicker span12">
							<optgroup label="Picnic">
								<option>Mustard</option>
								<option>Ketchup</option>
								<option>Relish</option>
							</optgroup>
							<optgroup label="Camping">
								<option>Tent</option>
								<option>Flashlight</option>
								<option>Toilet Paper</option>
							</optgroup>
						</select>
					</div>
				</div>
				<div class="span5">
					<h5>Styles</h5>
					<div class="row-fluid">
						<select class="selectpicker span6" data-style="btn-primary">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select> 
						<select class="selectpicker span6" data-style="btn-default">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select>
					</div>
					<div class="row-fluid">
						<select class="selectpicker span6" data-style="btn-info">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select>
						<select class="selectpicker span6" data-style="btn-success">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select>
					</div>
					<div class="row-fluid">
						<select class="selectpicker span6" data-style="btn-warning">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select> 
						<select class="selectpicker span6" data-style="btn-inverse">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select>
					</div>
				</div>
				<div class="span4">
					<h5>Grid</h5>
					<div class="row-fluid">
						<select class="selectpicker span3">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select> 
						<select class="selectpicker span9">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select>
					</div>
					<div class="row-fluid">
						<select class="selectpicker span4">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select> 
						<select class="selectpicker span8">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select>
					</div>
					<div class="row-fluid">
						<select class="selectpicker span6">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select> 
						<select class="selectpicker span6">
							<option>Mustard</option>
							<option>Ketchup</option>
							<option>Relish</option>
						</select>
					</div>
				</div>
			</div>
		
		</div>
	</div>
</div>	
<div class="relativeWrap">
	<div class="widget widget-gray">
		<div class="widget-head">
			<h4 class="heading">Input controls</h4>
		</div>
		<div class="widget-body center">
			<div class="row-fluid">
				<div class="span4">
					<h5>Default</h5>
					<div class="row-fluid">
						<input type="text" placeholder="Text input" class="span12" />
					</div>
					<hr/>
					<h5>Extended</h5>
					<div class="input-prepend">
					  	<span class="add-on">@</span>
					  	<input id="prependedInput" class="span10" type="text" placeholder="Username" />
					</div>
					<hr class="visible-phone" style="margin-top: 20px;" />
				</div>
				<div class="span4">
					<h5>Combined</h5>
					<div class="input-prepend input-append">
						<span class="add-on">$</span>
						<input class="span9" id="appendedPrependedInput" type="text" placeholder="100,000,000" style="margin-bottom: 10px;" /> 
						<span class="add-on">.00</span>
					</div>
					<hr/>
					<h5>Buttons</h5>
					<div class="input-append">
					  	<input class="span6" id="appendedInputButtons" type="text" placeholder="Placeholder .." />
					  	<button class="btn" type="button"><i class="icon-search"></i></button>
					  	<button class="btn" type="button">Options</button>
					</div>
					<hr class="visible-phone" style="margin-top: 20px;" />
				</div>
				<div class="span4">
					<h5>Dropdown / Dropup</h5>
					<div class="input-append">
						<input class="span8" id="appendedDropdownButton" type="text" style="margin-bottom: 10px;" />
						<div class="btn-group dropup">
							<button class="btn dropdown-toggle" data-toggle="dropdown">
								Action <span class="caret"></span>
							</button>
							<ul class="dropdown-menu pull-right">
								<li><a href="#">Action</a></li>
								<li><a href="#">Another action</a></li>
								<li><a href="#">Something else here</a></li>
								<li class="divider"></li>
								<li><a href="#">Separated link</a></li>
							</ul>
						</div>
						<!-- /btn-group -->
					</div>
					<hr/>
					<h5>Segmented Groups</h5>
					<div class="input-append">
						<input type="text" class="span7" />
						<div class="btn-group dropup">
							<button class="btn" tabindex="-1">Action</button>
							<button class="btn dropdown-toggle" data-toggle="dropdown" tabindex="-1">
								<span class="caret"></span>
							</button>
							<ul class="dropdown-menu pull-right">
								<li><a href="#">Action</a></li>
								<li><a href="#">Another action</a></li>
								<li><a href="#">Something else here</a></li>
								<li class="divider"></li>
								<li><a href="#">Separated link</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</div>
</div>		

<div class="row-fluid">
	<div class="span4 uniformjs">
		<div class="relativeWrap">
			<div class="widget widget-gray widget-gray-white margin-bottom-none">
				<div class="widget-head">
					<h4 class="heading">Checkbox</h4>
				</div>
				<div class="widget-body list fluid">
					<ul>
						<li>
							<label class="checkbox">
								<input type="checkbox" class="checkbox" value="1" />
								Option 1 - Sexy checkbox
							</label>
							<label class="checkbox">
								<input type="checkbox" class="checkbox" value="1" checked="checked" />
								Option 2 - Checked
							</label>
							<label class="checkbox">
								<input type="checkbox" class="checkbox" value="1" disabled="disabled" />
								Option 3 - Disabled checkbox
							</label>
						</li>
						<li>
							<h5>Inline</h5>
							<label class="checkbox inline">
								<input type="checkbox" class="checkbox" value="1" checked="checked" />
								Option 1
							</label>
							<label class="checkbox inline">
								<input type="checkbox" class="checkbox" value="1" checked="checked" />
								Option 2
							</label>
							<label class="checkbox inline">
								<input type="checkbox" class="checkbox" value="1" />
								Option 3
							</label>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="span4 uniformjs">
		<div class="relativeWrap">
			<div class="widget widget-gray widget-gray-white margin-bottom-none">
				<div class="widget-head">
					<h4 class="heading">Radio</h4>
				</div>
				<div class="widget-body list fluid">
					<ul>
						<li>
							<label class="radio">
								<input type="radio" class="radio" name="radio" value="1" />
								Option 1 - Sexy radio
							</label><br/>
							<label class="radio">
								<input type="radio" class="radio" name="radio" value="1" checked="checked" />
								Option 2 - Checked
							</label><br/>
							<label class="radio">
								<input type="radio" class="radio disabled" name="radio" value="1" disabled="disabled" />
								Option 3 - Disabled radio
							</label>
						</li>
						<li>
							<h5>Inline</h5>
							<label class="radio inline">
								<input type="radio" class="radio" name="radioInline" value="1" />
								Option 1
							</label>
							<label class="radio inline">
								<input type="radio" class="radio" name="radioInline" value="1" checked="checked" />
								Option 2
							</label>
							<label class="radio inline">
								<input type="radio" class="radio disabled" name="radioInline" value="1" />
								Option 3
							</label>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="span4 center">
		<h5>Toggle buttons</h5>
		<div class="separator"></div>
		<div class="toggle-button">
			<input type="checkbox" checked="checked" />
		</div>
		<div class="toggle-button" data-toggleButton-style-enabled="info">
			<input type="checkbox" checked="checked" />
		</div>
		<div class="toggle-button" data-toggleButton-style-enabled="warning">
			<input type="checkbox" checked="checked" />
		</div>
		<div class="toggle-button" data-toggleButton-style-enabled="danger">
			<input type="checkbox" checked="checked" />
		</div>
		<div class="toggle-button" data-toggleButton-style-enabled="success">
			<input type="checkbox" checked="checked" />
		</div>
		<div class="toggle-button"
			data-toggleButton-style-custom-enabled-background="#3F4246"
			data-toggleButton-style-custom-enabled-gradient="#000000">
			<input type="checkbox" checked="checked" />
		</div>
		<hr class="separator" />
		<h5>Text &amp; Size</h5>
		<div class="toggle-button" data-toggleButton-width="220"
			data-toggleButton-label-enabled="Lorem Ipsum"
			data-toggleButton-label-disabled="Dolor Sit"
			data-toggleButton-height="35"
			data-toggleButton-font-lineHeight="35px">
			<input type="checkbox" checked="checked" />
		</div>
	</div>
</div>
<br/>

<div class="row-fluid">
	<div class="span6 center">
		<div class="relativeWrap">
			<div class="widget widget-gray widget-gray-white">
				<div class="widget-head">
					<h4 class="heading">File controls</h4>
				</div>
				<div class="widget-body list fluid">
					<ul>
						<li>
							<h5>File upload widget</h5>
							<div class="fileupload fileupload-new" data-provides="fileupload">
							  	<div class="input-append">
							    	<div class="uneditable-input span3"><i class="icon-file fileupload-exists"></i> <span class="fileupload-preview"></span></div><span class="btn btn-file"><span class="fileupload-new">Select file</span><span class="fileupload-exists">Change</span><input type="file" /></span><a href="#" class="btn fileupload-exists" data-dismiss="fileupload">Remove</a>
							  	</div>
							</div>
						</li>
						<li>
							<h5>File upload button</h5>
							<div class="fileupload fileupload-new" data-provides="fileupload">
							  	<span class="btn btn-file"><span class="fileupload-new">Select file</span><span class="fileupload-exists">Change</span><input type="file" /></span>
							  	<span class="fileupload-preview"></span>
							  	<a href="#" class="close fileupload-exists" data-dismiss="fileupload" style="float: none">×</a>
							</div>
						</li>
						<li>
							<h5>Image upload previews</h5>
							<div class="fileupload fileupload-new" data-provides="fileupload">
								<div class="fileupload-new thumbnail" style="width: 200px; height: 150px;"><img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&text=no+image" /></div>
							  	<div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div>
							  	<div>
									<span class="btn btn-file"><span class="fileupload-new">Select image</span><span class="fileupload-exists">Change</span><input type="file" /></span>
							    	<a href="#" class="btn fileupload-exists" data-dismiss="fileupload">Remove</a>
							  	</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="span6">
		<div class="relativeWrap">
			<div class="widget widget-gray widget-gray-white">
				<div class="widget-head">
					<h4 class="heading">Color picker &amp; Date pickers</h4>
				</div>
				<div class="widget-body">
					
					<div class="form-horizontal">
						<div class="control-group">
							<label class="control-label">Color picker</label>
							<div class="controls">
								<input type="text" id="colorpickerColor" value="#D15353" /><br/><br/>
								<div id="colorpicker"></div>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">Date picker</label>
							<div class="controls">
								<input type="text" id="datepicker" value="" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">Inline Date picker</label>
							<div class="controls">
								<div id="datepicker-inline"></div>
							</div>
						</div>
					</div>
							
				</div>
			</div>
		</div>
	</div>
</div>
<br/>
