<p>BootAdmin is multilingual &amp; ready for your language, whatever
	that is! It comes with a translate system, ready-to-go translations and
	it's really easy to use and customize - as simple as editing a CSV file
	with OpenOffice or Excel.</p>
<p>Zend_Translate is Zend Framework's solution for multilingual
	applications. In multilingual applications, the content must be
	translated into several languages and display content depending on the
	user's language. PHP offers already several ways to handle such
	problems, however the PHP solution has some problems. You can read more about it on Zend_Translate's <a href="http://framework.zend.com/manual/1.12/en/zend.translate.introduction.html" target="_blank">official documentation</a>.</p>

<h3>Translation files</h3>
<hr class="separator bottom" />
<p>
	All translations are organized into the
	<strong>lang/</strong> folder of the application. Each language has
	it's own folder &amp; file like
	<strong>lang/en/&lt;translation&gt;.csv</strong>. You can edit these
	files with OpenOffice or Excel.
</p>

<h3>Translation</h3>
<hr class="separator bottom" />
<p>Each translation string resides on it's own row and it's made of two columns, the string to be translated and the translated value, just like this:</p>
<pre class="prettyprint lang-html">
username;Nom d'utilisateur
password;Mot de passe
login;Login
forgot_password;oubli&#233; mot de passe
register;Enregistrer
logout;D&#233;connexion
new_chat_messages;nouveaux messages de chat
new_products;produits nouveaux
</pre>

<p>Then, using PHP it's really simple to get that value in any page of BootAdmin and display it to the user:</p>
<pre class="prettyprint">
&lt;?php echo $translate->_('username'); // prints Nom d'utilisateur ?&gt;
</pre>

<h3>Changing the language</h3>
<hr class="separator bottom" />
<p>Zend_Translate has the following configuration:</p>
<pre class="prettyprint">
&lt;?php
$locale = isset($_GET['lang']) ? $_GET['lang'] : 'en'; // default language
$translate = new Zend_Translate( array( 
	'adapter' => 'csv', 
	'content' => APP_LANG, 
	'scan' => Zend_Translate::LOCALE_DIRECTORY 
) );
$translate->setLocale($locale);
?&gt;
</pre>
<p>With this configuration, any translation file is loaded automagically by Zend and whatever value <code>$locale</code> is set to, Zend_Translate will get the translations from the corresponding folder, so for example, when <code>$locale = 'en';</code> Zend_Translate will search for .csv files in the <strong>lang/en/</strong> folder.</p>