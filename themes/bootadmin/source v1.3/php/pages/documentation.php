<!-- Documentation -->
<section class="documentation">
	<div class="row-fluid">
		<div class="span9">
				
			<!-- Documentation CONTENT -->
			<?php require_once 'pages/documentation/' . $section . '.php'; ?>
			<!-- Documentation CONTENT END -->
				
		</div>
		<div class="span3">
			<div class="widget widget-2 primary widget-body-white">
				<div class="widget-head">
					<h4 class="heading glyphicons circle_question_mark"><i></i> Documentation</h4>
				</div>
				<div class="widget-body list list-2">
					<ul>
						<li<?php if ($section == 'index'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation')); ?>" title="" class="glyphicons link"><i></i>Overview</a></li>
						<li class="hasSubmenu<?php if ($section == 'getting-started'): ?> active<?php endif; ?>">
							<a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'getting-started', 'ss' => 'files')); ?>" title="" class="glyphicons link"><i></i>Getting Started</a>
							<ul>
								<li<?php if ($section == 'getting-started' && $sub_section == 'files'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'getting-started', 'ss' => 'files')); ?>" title="">What's in the package</a></li>
								<li<?php if ($section == 'getting-started' && $sub_section == 'config'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'getting-started', 'ss' => 'config')); ?>" title="">Configuration</a></li>
								<li<?php if ($section == 'getting-started' && $sub_section == 'lang'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'getting-started', 'ss' => 'lang')); ?>" title="">Translations</a></li>
							</ul>
						</li>
						<li class="hasSubmenu<?php if ($section == 'customization-guide'): ?> active<?php endif; ?>">
							<a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'grid-system')); ?>" title="" class="glyphicons link"><i></i>Customization Guide</a>
							<ul>
								<li<?php if ($section == 'customization-guide' && $sub_section == 'grid-system'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'grid-system')); ?>" title="">Grid System</a></li>
								<li<?php if ($section == 'customization-guide' && $sub_section == 'buttons'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'buttons')); ?>" title="">Buttons</a></li>
								<li<?php if ($section == 'customization-guide' && $sub_section == 'icons'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'icons')); ?>" title="">Icons</a></li>
								<li<?php if ($section == 'customization-guide' && $sub_section == 'tables'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'tables')); ?>" title="">Tables</a></li>
								<li<?php if ($section == 'customization-guide' && $sub_section == 'widgets'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'widgets')); ?>" title="">Widgets</a></li>
								<li<?php if ($section == 'customization-guide' && $sub_section == 'tabs'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'tabs')); ?>" title="">Tabs</a></li>
								<li<?php if ($section == 'customization-guide' && $sub_section == 'elements'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'elements')); ?>" title="">Other</a></li>
							</ul>
						</li>
						<li<?php if ($section == 'credits'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'credits')); ?>" title="" class="glyphicons link"><i></i>Credits</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- Documentation END -->