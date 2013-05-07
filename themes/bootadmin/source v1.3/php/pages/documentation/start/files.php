<h3>What's in the package</h3>
<hr class="separator bottom" />
<p>BootAdmin is released in 2 versions:</p>
<ul>
	<li><strong>PHP version:</strong> offers a good base for PHP implementations</li>
	<li><strong>HTML version:</strong> for a clean start from scratch implementation or non-PHP implementations.
</ul><br/>

<h4>Differences between PHP &amp; HTML versions</h4>
<hr class="separator bottom" />
<p>Each version has it's advantages and choosing one over the other depends of how you will want to implement it. For example, you may want to start a new project from scratch or use a framework like Zend or Cake, or maybe you don't want to use PHP at all and use some other scripting language and you don't want to spend precious time cleaning up PHP parts you don't need, in this case you'll want to use the clean HTML version.</p>
<p>However, if you don't have much experience with scripting languages like PHP or never used a framework like Zend or Cake PHP, BootAdmin's PHP version offers a good base, yet simple for starting your implementation, with examples of a minimal structure, file templating - header, pages, footer - reusable functions, etc.</p>
<p>Most of the features are available in both versions, with the following exceptions:</p>
<ul>
	<li><strong>Translate System</strong> - only available in PHP version</li>
	<li><strong>Easy configurable theme &amp; layout options</strong> - only available in PHP version / in HTML version you will have to modify the markup yourself as needed</li>
</ul>

<h3>Main structure</h3>
<hr class="separator bottom" />
<pre class="prettyprint lang-html">
/ 						// Root Directory
&lt;php|html&gt;/					// BootAdmin HTML/PHP versions
	bootstrap/ 				// Twitter Bootstrap
	documentation/				// Documentation
	theme/ 					// Theme Directory
		css/ 				// Default LESS/CSS files
		fonts/				// Fonts
		images/				// Default Images
		scripts/			// Scripts
		skins/				// Skins
			css/&lt;skin&gt;.css 		// Skin CSS files
			less/&lt;skin&gt;.less 	// Skin LESS files
</pre>

<h3>CSS Files</h3>
<hr class="separator bottom" />
<p>BootAdmin uses couple of stylesheets to control visual apperance. There are stylesheets from Twitter Bootstrap, default theme stylesheets, skin stylesheets, and plugin stylesheets.</p>

<pre class="prettyprint lang-html">
bootstrap/css/<strong>&lt;file&gt;</strong>.css 		// Twitter Bootstrap Stylesheets
theme/css/<strong>&lt;file&gt;</strong>.css 			// Default Stylesheets
theme/skins/css/<strong>&lt;skin&gt;</strong>.css 		// Skin Stylesheets
theme/scripts/<strong>&lt;plugin&gt;</strong>/css/<strong>&lt;file&gt;</strong>.css 	// Plugin stylesheets
</pre>

<h3>LESS is MORE</h3>
<hr class="separator bottom" />
<p>First of all, you may ask: <strong>What the <code>&lt;beep&gt;</code> is LESS?</strong> Well, LESS is The dynamic stylesheet language.</p>
<p>LESS extends CSS with dynamic behavior such as variables, mixins, operations and functions. LESS runs on both the client-side (Chrome, Safari, Firefox) and server-side, with Node.js and Rhino, but for our purpose, we will use the client-side <em>less.js</em> compiler for FAST and SMART deveopment and for production, we'll convert and minify the LESS files to the regular CSS by using a local compiler, like WinLess.</p>

<h3>The LESS files</h3>
<hr class="separator bottom" />
<pre class="prettyprint lang-html">
theme/less/<strong>mixins</strong>.less 			// Common Mixins
theme/less/<strong>style</strong>.less 			// Default Stylesheet
theme/skins/less/<strong>&lt;skin&gt;</strong>.less 		// Skin Stylesheet
</pre>

<p>Don't worry! If you never worked with LESS before, we assure you it's not that big of a step from CSS. Actually, after you start working LESS, you'll never look back. Also, it has a really great <a href="http://lesscss.org/" class="no-js">documentation</a>.</p>

<h3>Scripts</h3>
<hr class="separator bottom" />
<p>
	BootAdmin uses many 3rd party plugins &amp; scripts, as well as custom
	ones. There are scripts from Twitter Bootstrap, jQuery &amp; plugins,
	Modernizr, custom scripts, etc. They are all located in
	<code>theme/scripts/</code>. 
	For more information about external scripts reffer to <a
		href="<?php echo getURL(array('page' => 'documentation', 'section' => 'credits')); ?>"
		class="glyphicons single share"><i></i>Credits</a>
</p>
