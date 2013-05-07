<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html> <!--<![endif]-->
<head>
	<title>BootAdmin - Responsive Admin HTML Template</title>
	
	<!-- Meta -->
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	
	<!-- Bootstrap -->
	<link href="<?php echo getURL(); ?>bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="<?php echo getURL(); ?>bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
	
	<!-- Bootstrap Extended -->
	<link href="<?php echo getURL(); ?>bootstrap/extend/jasny-bootstrap/css/jasny-bootstrap.min.css" rel="stylesheet">
	<link href="<?php echo getURL(); ?>bootstrap/extend/jasny-bootstrap/css/jasny-bootstrap-responsive.min.css" rel="stylesheet">
	<link href="<?php echo getURL(); ?>bootstrap/extend/bootstrap-wysihtml5/css/bootstrap-wysihtml5-0.0.2.css" rel="stylesheet">
	
	<!-- JQueryUI v1.9.2 -->
	<link rel="stylesheet" href="<?php echo getURL(); ?>theme/scripts/jquery-ui-1.9.2.custom/css/smoothness/jquery-ui-1.9.2.custom.min.css" />
	
	<!-- Glyphicons -->
	<link rel="stylesheet" href="<?php echo getURL(); ?>theme/css/glyphicons.css" />
	
	<!-- Bootstrap Extended -->
	<link rel="stylesheet" href="<?php echo getURL(); ?>bootstrap/extend/bootstrap-select/bootstrap-select.css" />
	<link rel="stylesheet" href="<?php echo getURL(); ?>bootstrap/extend/bootstrap-toggle-buttons/static/stylesheets/bootstrap-toggle-buttons.css" />
	
	<!-- Uniform -->
	<link rel="stylesheet" media="screen" href="<?php echo getURL(); ?>theme/scripts/pixelmatrix-uniform/css/uniform.default.css" />

<?php if ($page == 'tables_enhanced'): ?>
	<!-- DataTables -->
	<link rel="stylesheet" media="screen" href="<?php echo getURL(); ?>theme/scripts/DataTables/media/css/DT_bootstrap.css" />

<?php endif; ?>
<?php if ($page == 'form_elements'): ?>
	<!-- ColorPicker -->
	<link rel="stylesheet" media="screen" href="<?php echo getURL(); ?>theme/scripts/farbtastic/farbtastic.css" />

<?php endif; ?>
	<!-- JQuery v1.8.2 -->
	<script src="<?php echo getURL(); ?>theme/scripts/jquery-1.8.2.min.js"></script>
	
	<!-- Modernizr -->
	<script src="<?php echo getURL(); ?>theme/scripts/modernizr.custom.76094.js"></script>
	
	<!-- MiniColors -->
	<link rel="stylesheet" media="screen" href="<?php echo getURL(); ?>theme/scripts/jquery-miniColors/jquery.miniColors.css" />
	
<?php if ($page == 'calendar'): ?>
	<!-- Calendar -->
	<link rel="stylesheet" media="screen" href="<?php echo getURL(); ?>theme/scripts/fullcalendar/fullcalendar/fullcalendar.css" />

<?php endif; ?>
<?php if ($page == 'documentation'): ?>
	<!-- google-code-prettify -->
	<link href="<?php echo getURL(); ?>theme/scripts/google-code-prettify/prettify.css" type="text/css" rel="stylesheet" />
	
<?php endif; ?>
<?php if ($page == 'file_managers'): ?>
	<!-- plupload -->
	<style type="text/css">@import url(<?php echo getURL(); ?>theme/scripts/plupload/js/jquery.plupload.queue/css/jquery.plupload.queue.css);</style>
	
<?php endif; ?>
<?php if (DEV): ?>
	<!-- Theme -->
	<link rel="stylesheet/less" href="<?php echo getURL(); ?>theme/less/style.less?<?php echo time(0); ?>" />
	
<?php if (SKIN): ?>	
	<!-- Skin -->
	<link rel="stylesheet/less" href="<?php echo getURL(); ?>theme/skins/less/<?php echo SKIN; ?>.less?<?php echo time(0); ?>" />
<?php endif; ?>
<?php else: ?>
	<!-- Theme -->
	<link rel="stylesheet" href="<?php echo getURL(); ?>theme/css/style.min.css?<?php echo time(0); ?>" />
<?php if (SKIN): ?>	
	<!-- Skin -->
	<link rel="stylesheet" href="<?php echo getURL(); ?>theme/skins/css/<?php echo SKIN; ?>.min.css?<?php echo time(0); ?>" />
<?php endif; ?>	
<?php endif; ?>
<?php if (DEV): ?>
	<!-- FireBug Lite -->
	<!-- <script type="text/javascript" src="https://getfirebug.com/firebug-lite-debug.js"></script> -->
	
<?php endif; ?>
<?php if (GA): ?>
	<!-- Google Analytics -->
	
<?php endif; ?>
	<!-- LESS 2 CSS -->
	<script src="<?php echo getURL(); ?>theme/scripts/less-1.3.3.min.js"></script>
	
<?php if ($page == 'gallery' || $page == 'finances' || $page == 'index'): ?>	
	<!--[if IE]><script type="text/javascript" src="<?php echo getURL(); ?>theme/scripts/excanvas/excanvas.js"></script><![endif]-->
<?php endif; ?>
</head>
<body>
	
	<!-- Start Content -->
	<div class="container-fluid <?php echo MENU_POSITION; ?>-menu">
		
		<div class="navbar main">
			<div class="innerpx">
				<button type="button" class="btn btn-navbar hidden-desktop hidden-tablet">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
				</button>
				<div class="positionWrapper">
					<span class="line"></span>
					<?php if ($page != 'login'): ?>
					<div class="profile">
						<img src="<?php if (DEV): ?><?php echo getURL(); ?>theme/images/demo/profile-photo.jpg<?php else: ?>http://www.placehold.it/38x38/232323<?php endif; ?>" class="avatar" alt="Profile" />
						<span class="info hidden-phone">
							<strong>Adrian Demian</strong>
							<em>Content Manager</em>
						</span>
					</div>
					<ul class="notif">
						<li><a href="" class="glyphicons chat btn" rel="tooltip" data-placement="bottom" data-original-title="7 <?php echo $translate->_('new_chat_messages'); ?>"><i></i><span>7</span></a></li>
						<li><a href="" class="glyphicons shopping_cart btn" rel="tooltip" data-placement="bottom" data-original-title="1 <?php echo $translate->_('new_products'); ?>"><i></i><span>1</span></a></li>
						<li><a href="" class="glyphicons user_add btn" rel="tooltip" data-placement="bottom" data-original-title="4 <?php echo $translate->_('new_members'); ?>"><i></i><span>4</span></a></li>
						<li><a href="" class="glyphicons envelope btn" rel="tooltip" data-placement="bottom" data-original-title="3 <?php echo $translate->_('new_emails'); ?>"><i></i><span>3</span></a></li>
					</ul>
					<?php else: ?>
					<div class="profile heading">
						<h1>bootadmin</h1>
						<em>your next admin template</em>
					</div>
					<?php endif; ?>
					<ul class="topnav hidden-phone">
						<li>
							<div class="btn-group">
								<a href="#" class="btn-inverse dropdown-toggle" data-toggle="dropdown">
								<img src="<?php echo getURL(); ?>theme/images/lang/<?php echo $locale; ?>.png" align="absmiddle">
								<span class="caret"></span></a>
						    	<ul class="dropdown-menu pull-right">
						      		<li<?php if ($locale == 'en'): ?> class="active"<?php endif; ?>><a href="?<?php echo http_build_query(array_merge($_GET, array('lang' => 'en'))); ?>" title="<?php echo $translate->_('english'); ?>"><img src="<?php echo getURL(); ?>theme/images/lang/en.png" align="absmiddle"> <?php echo $translate->_('english'); ?></a></li>
						      		<li<?php if ($locale == 'ro'): ?> class="active"<?php endif; ?>><a href="?<?php echo http_build_query(array_merge($_GET, array('lang' => 'ro'))); ?>" title="<?php echo $translate->_('romanian'); ?>"><img src="<?php echo getURL(); ?>theme/images/lang/ro.png" align="absmiddle"> <?php echo $translate->_('romanian'); ?></a></li>
						      		<li<?php if ($locale == 'it'): ?> class="active"<?php endif; ?>><a href="?<?php echo http_build_query(array_merge($_GET, array('lang' => 'it'))); ?>" title="<?php echo $translate->_('italian'); ?>"><img src="<?php echo getURL(); ?>theme/images/lang/it.png" align="absmiddle"> <?php echo $translate->_('italian'); ?></a></li>
						      		<li<?php if ($locale == 'fr'): ?> class="active"<?php endif; ?>><a href="?<?php echo http_build_query(array_merge($_GET, array('lang' => 'fr'))); ?>" title="<?php echo $translate->_('french'); ?>"><img src="<?php echo getURL(); ?>theme/images/lang/fr.png" align="absmiddle"> <?php echo $translate->_('french'); ?></a></li>
						      		<li<?php if ($locale == 'pl'): ?> class="active"<?php endif; ?>><a href="?<?php echo http_build_query(array_merge($_GET, array('lang' => 'pl'))); ?>" title="<?php echo $translate->_('polish'); ?>"><img src="<?php echo getURL(); ?>theme/images/lang/pl.png" align="absmiddle"> <?php echo $translate->_('polish'); ?></a></li>
						    	</ul>
						  	</div>
						</li>
						<?php if (SKIN_JS): ?>
						<li>
							<a href="#themer" data-toggle="collapse" class="logout glyphicons eyedropper"><i></i><span><?php echo $translate->_('Themer'); ?></span></a>
							<div id="themer" class="collapse">
								<div class="wrapper">
									<h4>Themer <span>color &amp; layout options</span></h4>
									<ul>
										<li>Theme: <select id="themer-theme" class="pull-right"></select><div class="clearfix"></div></li>
										<li>Primary Color: <input type="minicolors" data-default="#ffffff" data-slider="hue" data-textfield="false" data-position="left" id="themer-primary-cp" /><div class="clearfix"></div></li>
										<li class="advanced">Header Color: <input type="minicolors" data-slider="hue" data-default="#ffffff" data-textfield="false" data-position="left" id="themer-header-cp" /><div class="clearfix"></div></li>
										<li class="advanced">Menu Color: <input type="minicolors" data-slider="hue" data-default="#ffffff" data-textfield="false" data-position="left" id="themer-menu-cp" /><div class="clearfix"></div></li>
										<li>
											<span class="link" id="themer-custom-reset">reset theme</span>
											<span class="pull-right"><label>advanced <input type="checkbox" value="1" id="themer-advanced-toggle" /></label></span>
										</li>
									</ul>
									<?php if (MENU_JS): ?>
									<hr class="separator" />
									<ul>
										<li>Menu position: <select id="themer-menu-position" class="pull-right"></select><div class="clearfix"></div></li>
										<li>Menu size: <select id="themer-menu-size" class="pull-right"></select><div class="clearfix"></div></li>
									</ul>
									<?php endif; ?>
									<div id="themer-getcode" class="hide">
										<hr class="separator" />
										<button class="btn btn-primary btn-small pull-right btn-icon glyphicons download" id="themer-getcode-less"><i></i>Get LESS</button>
										<button class="btn btn-inverse btn-small pull-right btn-icon glyphicons download" id="themer-getcode-css"><i></i>Get CSS</button>
										<div class="clearfix"></div>
									</div>
								</div>
							</div>
						</li>
						<?php endif; ?>
						<?php if ($page != 'login'): ?>
						<li>
							<a href="<?php echo getURL(array('login')); ?>" class="logout glyphicons lock"><i></i><span><?php echo $translate->_('logout'); ?></span></a>
						</li>
						<?php endif; ?>
					</ul>
				</div>
			</div>
		</div>
	
		<div class="row-fluid rrow main">
			<div class="span12 main col" role="main">
				<div class="row-fluid rrow">
					<div class="span2 col main-left hide<?php if ($page != 'login'): ?> hidden-phone<?php endif; ?><?php if ($page == 'login'): ?> login<?php endif; ?> menu-<?php echo MENU_SIZE; ?>">
						<div class="rrow scroll-y-left">
							<div class="iScrollWrapper">
								<ul>
									<li class="glyphicons home<?php if ($page == 'index'): ?> currentScroll active<?php endif; ?>"><a href="<?php echo getURL(array('index')); ?>"><i></i><span><?php echo $translate->_('dashboard'); ?></span></a></li>
									<li class="glyphicons coins<?php if ($page == 'finances'): ?> currentScroll active<?php endif; ?>"><a href="<?php echo getURL(array('finances')); ?>"><i></i><span><?php echo $translate->_('finances'); ?></span></a></li>
									<li class="hasSubmenu2<?php if ($page == 'products' || $page == 'categories' || $page == 'product_edit'): ?> currentScroll<?php endif; ?>">
										<a data-toggle="collapse" class="glyphicons shopping_cart" href="#menu_ecommerce"><i></i><span><?php echo $translate->_('online_shop'); ?></span></a>
										<ul class="collapse<?php if ($page == 'products' || $page == 'categories' || $page == 'product_edit'): ?> in<?php endif; ?>" id="menu_ecommerce">
											<li class="<?php if ($page == 'products'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('products')); ?>" class="glyphicons show_thumbnails"><i></i><span><?php echo $translate->_('products'); ?></span></a></li>
											<!-- <li class="<?php if ($page == 'categories'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('categories')); ?>" class="glyphicons show_big_thumbnails"><i></i><span><?php echo $translate->_('categories'); ?></span></a></li> -->
											<li class="<?php if ($page == 'product_edit'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('product_edit')); ?>" class="glyphicons cart_in"><i></i><span><?php echo $translate->_('add_product'); ?></span></a></li>
											<!-- <li class="<?php if ($page == 'orders'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('orders')); ?>" class="glyphicons list"><i></i><span><?php echo $translate->_('orders'); ?></span></a></li> -->
										</ul>
									</li>
									<li class="glyphicons sort<?php if ($page == 'pages'): ?> currentScroll active<?php endif; ?>"><a href="<?php echo getURL(array('pages')); ?>"><i></i><span><?php echo $translate->_('site_pages'); ?></span></a></li>
									<li class="glyphicons picture<?php if ($page == 'gallery'): ?> currentScroll active<?php endif; ?>"><a href="<?php echo getURL(array('gallery')); ?>"><i></i><span><?php echo $translate->_('photo_gallery'); ?></span></a></li>
									<li class="glyphicons adress_book<?php if ($page == 'bookings'): ?> currentScroll active<?php endif; ?>"><a href="<?php echo getURL(array('bookings')); ?>"><i></i><span><?php echo $translate->_('bookings'); ?></span></a></li>
									<li class="glyphicons charts<?php if ($page == 'charts'): ?> currentScroll active<?php endif; ?>"><a href="<?php echo getURL(array('charts')); ?>"><i></i><span><?php echo $translate->_('charts'); ?></span></a></li>
									<li class="glyphicons cogwheels<?php if ($page == 'ui'): ?> currentScroll active<?php endif; ?>"><a href="<?php echo getURL(array('ui')); ?>"><i></i><span><?php echo $translate->_('ui_elements'); ?></span></a></li>
									<li class="hasSubmenu2<?php if ($page == 'form_elements' || $page == 'form_demo' || $page == 'form_validator' || $page == 'file_managers'): ?> currentScroll<?php endif; ?>">
										<a data-toggle="collapse" class="glyphicons show_thumbnails_with_lines" href="#menu_forms"><i></i><span><?php echo $translate->_('forms'); ?></span></a>
										<ul class="collapse<?php if ($page == 'form_elements' || $page == 'form_demo' || $page == 'form_validator' || $page == 'file_managers'): ?> in<?php endif; ?>" id="menu_forms">
											<li class="<?php if ($page == 'form_demo'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('form_demo')); ?>" class="glyphicons user"><i></i><span><?php echo $translate->_('my_account'); ?></span></a></li>
											<li class="<?php if ($page == 'form_elements'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('form_elements')); ?>" class="glyphicons show_big_thumbnails"><i></i><span><?php echo $translate->_('form_elements'); ?></span></a></li>
											<li class="<?php if ($page == 'form_validator'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('form_validator')); ?>" class="glyphicons circle_ok"><i></i><span><?php echo $translate->_('form_validator'); ?></span></a></li>
											<!-- <li class="<?php if ($page == 'form_wizzard'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('form_wizzard')); ?>" class="glyphicons share_alt"><i></i><span><?php echo $translate->_('form_wizzard'); ?></span></a></li> -->
											<li class="<?php if ($page == 'file_managers'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('file_managers')); ?>" class="glyphicons file_import"><i></i><span><?php echo $translate->_('file_managers'); ?></span></a></li>
										</ul>
									</li>
									<li class="hasSubmenu2<?php if ($page == 'tables' || $page == 'tables_themed' || $page == 'tables_enhanced'): ?> currentScroll<?php endif; ?>">
										<a data-toggle="collapse" class="glyphicons table" href="#menu_tables"><i></i><span><?php echo $translate->_('tables'); ?></span></a>
										<ul class="collapse<?php if ($page == 'tables' || $page == 'tables_themed' || $page == 'tables_enhanced'): ?> in<?php endif; ?>" id="menu_tables">
											<li class="<?php if ($page == 'tables'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('tables')); ?>" class="glyphicons show_thumbnails"><i></i><span><?php echo $translate->_('tables_classic'); ?></span></a></li>
											<li class="<?php if ($page == 'tables_themed'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('tables_themed')); ?>" class="glyphicons show_thumbnails"><i></i><span><?php echo $translate->_('tables_themed'); ?></span></a></li>
											<li class="<?php if ($page == 'tables_enhanced'): ?> active<?php endif; ?>"><a href="<?php echo getURL(array('tables_enhanced')); ?>" class="glyphicons show_thumbnails"><i></i><span><?php echo $translate->_('tables_enhanced'); ?></span></a></li>
										</ul>
									</li>
									<li class="glyphicons calendar<?php if ($page == 'calendar'): ?> currentScroll active<?php endif; ?>"><a href="<?php echo getURL(array('calendar')); ?>"><i></i><span><?php echo $translate->_('calendar'); ?></span></a></li>
								</ul>
							</div>
							<span class="navarrow hide">
								<span class="glyphicons circle_arrow_down"><i></i></span>
							</span>
						</div>
					</div>
					<div class="span10 col main-right<?php if ($page == 'login'): ?> login<?php endif; ?>">
						<div class="rrow scroll-y" id="mainYScroller">
							<div class="inner topRight">