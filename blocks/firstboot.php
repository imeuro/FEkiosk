
<h1>Cheking ext data:</h1>
<pre>
<ul>
	<li id="Presenze">Presenze............<span></span></li>
	<li id="mensa">Mensa...............<span></span></li>
</ul>
</pre>


<script>
	console.debug('loaded');
	
	if (checkLSData('Presenze') === true) {
		getLSData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze');
	} else {
		loadExtData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze',3);
		getLSData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze');
	}

</script>