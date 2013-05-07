<?php
$section = isset($_GET['section']) ? $_GET['section'] : 'index';

//require_once 'ajax/gallery.config.php';
//require_once 'ajax/functions.php';

switch ($section)
{
	default:
		// 404
		break;

	case 'calendarEvents':
	case 'galleryAlbum':
	case 'galleryRemove':
	case 'galleryItems':
	case 'galleryUpload':
		if (file_exists('ajax/' . $section . '.php')) require_once 'ajax/' . $section . '.php';
		break;

}