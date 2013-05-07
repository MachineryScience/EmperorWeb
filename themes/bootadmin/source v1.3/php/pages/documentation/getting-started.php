<h1>Getting Started</h1>
<hr class="separator bottom" />

<ul class="nav nav-tabs">
	<li<?php if ($sub_section == 'files'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'getting-started', 'ss' => 'files')); ?>" title="">What's in the package</a></li>
	<li<?php if ($sub_section == 'config'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'getting-started', 'ss' => 'config')); ?>" title="">Configuration</a></li>
	<li<?php if ($sub_section == 'lang'): ?> class="active"<?php endif; ?>><a href="<?php echo getURL(array('page' => 'documentation', 'section' => 'getting-started', 'ss' => 'lang')); ?>" title="">Translations</a></li>
</ul>

<?php if (@file_exists('pages/documentation/start/' . $sub_section . '.php'))  require_once 'pages/documentation/start/' . $sub_section . '.php'; ?>