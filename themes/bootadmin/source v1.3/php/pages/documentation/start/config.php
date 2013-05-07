<p>Find your way around BootAdmin with it's available theme &amp; layout options and learn how to change to a custom theme, the menu position &amp; size, allow or disallow skin or menu customization options from the browser etc.</p>

<h3>Configuration options <code>php/index.php</code></h3>
<hr class="separator bottom" />
<pre class="prettyprint">
/* Allow menu customization from the browser
 * Values: true/false
 */
defined('MENU_JS') || define('MENU_JS', true);

/* Allow skin customization from the browser
 * Values: true/false
 */
defined('SKIN_JS') || define('SKIN_JS', true);

/* If set true, loads the custom skin files
 * Values: false/filename without .extension
 */
defined('SKIN_CUSTOM') || define('SKIN_CUSTOM', 'brown');

/* DO NOT EDIT UNLESS YOU KNOW WHAT YOU'RE DOING
 * To load a custom skin, edit SKIN_CUSTOM above
 * When browser skin customization is allowed, ignore SKIN_CUSTOM
 */
defined('SKIN') || define('SKIN', SKIN_JS ? false : SKIN_CUSTOM);

/* Change menu position
 * Values: left/right/top
 */
defined('MENU_POSITION') || define('MENU_POSITION', 'left');

/* Change menu size
 * Values: large/small
 */
defined('MENU_SIZE') || define('MENU_SIZE', 'large');
</pre>