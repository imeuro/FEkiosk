<script>
	if (checkLSData('Presenze') === true) {
		getLSData('Presenze');
	} else {
		console.debug('no data...');
		loadExtData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze',3);
		setInterval(function(){
			if (checkLSData('Presenze') === true) {
				getLSData('Presenze');
				console.debug('data!');
			}
			console.debug('no data...');
		},1000)
	}
</script>

<div id="presenze">
	<h1 class="FEtitle">Presenze :</h1>
	<ul class="Presenze"></ul>
</div>