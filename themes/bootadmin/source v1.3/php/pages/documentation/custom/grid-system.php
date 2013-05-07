<p>This theme is build on Twitter's Bootstrap Framework. You can learn more about the framework and it's features in <a href="http://twitter.github.com/bootstrap/scaffolding.html" target="_blank">it's own nifty documentation</a>. If you're not familiar with Bootstrap, for your convenience we included some of the information here, but it's highly recommended that you learn straight from <a href="http://twitter.github.com/bootstrap/" target="_blank">Twitter's Bootstrap</a> documentation.</p>
<hr class="separator" />

<p>The default Bootstrap grid system utilizes <strong>12 columns</strong>, making for a 940px wide container without responsive features enabled. With the responsive version, the grid adapts to be 724px and 1170px wide depending on your viewport. Below 767px viewports, the columns become fluid and stack vertically.</p>

<h3>Grid example</h3>
<hr class="separator bottom" />

<div class="bs-docs-grid">
	<div class="row-fluid show-grid">
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
		<div class="span1">1</div>
	</div>
	<div class="row-fluid show-grid">
		<div class="span4">4</div>
		<div class="span4">4</div>
		<div class="span4">4</div>
	</div>
	<div class="row-fluid show-grid">
		<div class="span4">4</div>
		<div class="span8">8</div>
	</div>
	<div class="row-fluid show-grid">
		<div class="span6">6</div>
		<div class="span6">6</div>
	</div>
	<div class="row-fluid show-grid">
		<div class="span12">12</div>
	</div>
</div>

<h3>Basic grid HTML</h3>
<hr class="separator bottom" />
<p>For a simple two column layout, create a <code>.row-fluid</code> and add the appropriate number of <code>.span*</code> columns. As this is a 12-column grid, each <code>.span*</code> spans a number of those 12 columns, and should always add up to 12 for each row (or the number of columns in the parent).</p>

<pre class="prettyprint">
&lt;div class="row-fluid"&gt;
  	&lt;div class="span4"&gt;...&lt;/div&gt;
  	&lt;div class="span8"&gt;...&lt;/div&gt;
&lt;/div&gt;
</pre>
<p>Given this example, we have <code>.span4</code> and <code>.span8</code>, making for 12 total columns and a complete row.</p>

<h3>Nesting columns</h3>
<hr class="separator bottom" />
<p>To nest your content with the default grid, add a new <code>.row-fluid</code> and set of <code>.span*</code> columns within an existing <code>.span*</code> column. Nested rows should include a set of columns that add up to the number of columns of its parent.</p>

<div class="row-fluid show-grid">
	<div class="span12">
		Level 1 column <code>.span12</code>
		<div class="row-fluid show-grid">
			<div class="span9">Level 2 <code>.span9</code></div>
			<div class="span3">Level 2 <code>.span3</code></div>
		</div>
	</div>
</div>
<pre class="prettyprint">
&lt;div class="row-fluid"&gt;
	&lt;div class="span12"&gt;
		Level 1 column
		&lt;div class="row-fluid"&gt;
			&lt;div class="span9"&gt;Level 2&lt;/div&gt;
			&lt;div class="span3"&gt;Level 2&lt;/div&gt;
		&lt;/div&gt;
  	&lt;/div&gt;
&lt;/div&gt;
</pre>