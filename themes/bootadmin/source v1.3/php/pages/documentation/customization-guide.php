<h1>Customization Guide</h1>
<hr class="separator bottom" />

<ul class="nav nav-tabs">
	<!-- <li<?php if ($sub_section == 'index'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide')); ?>" title="">Overview</a></li> 
	<li<?php if ($sub_section == 'typography'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'typography')); ?>" title="">Typography</a></li> -->
	<li<?php if ($sub_section == 'grid-system'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'grid-system')); ?>">Grid system</a></li>
	<li<?php if ($sub_section == 'buttons'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'buttons')); ?>" title="">Buttons</a></li>
	<li<?php if ($sub_section == 'icons'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'icons')); ?>" title="">Icons</a></li>
	<li<?php if ($sub_section == 'tables'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'tables')); ?>" title="">Tables</a></li>
	<li<?php if ($sub_section == 'widgets'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'widgets')); ?>" title="">Widgets</a></li>
	<li<?php if ($sub_section == 'tabs'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'tabs')); ?>" title="">Tabs</a></li>
	<li<?php if ($sub_section == 'elements'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'customization-guide', 'ss' => 'elements')); ?>" title="">Other</a></li>
</ul>

<?php if (@file_exists('pages/documentation/custom/' . $sub_section . '.php')) require_once 'pages/documentation/custom/' . $sub_section . '.php'; ?>