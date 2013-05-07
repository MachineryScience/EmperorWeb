<?php
function getLEVEL()
{
	global $_LEVEL;
	$level = $_LEVEL == 0 ? '' : '';
	$level = $_LEVEL > 0 ? str_repeat('../', $_LEVEL) : $level;

	return $level;
}
function setLEVEL($level = false)
{
	global $_LEVEL;
	$_LEVEL = $level ? $level : LEVEL;
}
function getURL($query = false)
{
	global $locale;
	if (!is_array($query))
		return $query ? (DEV ? 'index.php' : getLEVEL() . 'index.html') : getLEVEL();
	else
		return DEV ?
		( !isset($query[0]) ? "?" . http_build_query($query, '', '&amp;') : 'index.php?lang=' . $locale . '&page=' . $query[0] ) :
		getLEVEL() . implode("/", $query) . ".html?lang=" . $locale;
}

if (!DEV && $section != 'index') setLEVEL(1);
if (!DEV && $sub_section != 'index') setLEVEL(2);