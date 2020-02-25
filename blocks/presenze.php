<script>
	if (checkLSData('Presenze') === true) {
		getLSData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze');
	} else {
		loadExtData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze',3);
		getLSData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze');
	}
</script>

<div id="presenze">
	<h1 class="FEtitle">Presenze :</h1>
	<ul class="today-pres"></ul>
</div>