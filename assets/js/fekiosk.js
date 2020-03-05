// global vars
let rebootURL = ["blocks/firstboot.php",'Start'];
let URLlist = [ // URL, voce a menu, sorgente dati, durata localStorage
	{
		'uri'		: "blocks/presenze.php",
		'name' 		: "Presenze",
		'source' 	: "https://wrapapi.com/use/meuro/fekiosk/FEpresenze/latest?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH",
		'duration' 	: 3
	},
	{
		'uri' 		: "blocks/jira.php",
		'name' 		: "Jira",
		'source' 	: "https://wrapapi.com/use/meuro/fekiosk/Jira/latest?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH",
		'duration' 	: 1
	},
	{
		'uri' 		: "blocks/mensa.php",
		'name' 		: "Mensa",
		'source' 	: "https://wrapapi.com/use/quetz82/pellegrini/menu_linea/latest?wrapAPIKey=8iOtqFcQ0YdtspWymuhzgq2yj7AGTZDt",
		'duration' 	: 6
	}
];
let Ulen = URLlist.length;
var s = document.getElementById("FEcontainer");
let i = 0;
var interval = 10*1000; // millis... 5mins: 5*60*1000
let menuitems = null;



fetch(rebootURL[0]).then((response) => {
		return response.text();
	}).then((URLcontent) => {
		s.innerHTML = URLcontent;
		initialChecks();
	}).catch((error) => {
		console.debug('Error:', error);
	});


setInterval(function () {
	 if (i == Ulen) {
		console.debug('reached end. restarting!');
		menuitems[Ulen-1].classList.add('current');
		i=0;
	}
	console.debug(i+' - scheda: '+URLlist[i]['name']);
	fetch(URLlist[i]['uri'],{cache: 'no-cache',}).then((response) => {
		return response.text();
	}).then((URLcontent) => {
		console.debug('url: '+URLlist[i]['uri']+' - time: '+interval);
		s.innerHTML = URLcontent;

		if (checkLSData(URLlist[i]['name']) === true) {
			getLSData(URLlist[i]['name']);
		} else {
			loadExtData(URLlist[i]['source'],URLlist[i]['name'],URLlist[i]['duration']);
			getLSData(URLlist[i]['name']);
		}

		Array.from(menuitems).forEach(function(el){
			el.classList.remove('current');
		})
		menuitems[i+1].classList.add('current');

		i++;
	}).catch((error) => {
		console.debug('Error:', error);
	});
	
}, interval);


// aside menu
let asidemenu = '<ul class="asidemenu">';
asidemenu = asidemenu+'<li>'+rebootURL[1]+'</li>';
URLlist.forEach(function(item,el){
	asidemenu = asidemenu+'<li>'+item['name']+'</li>';
});
asidemenu = asidemenu+'</ul>';
document.getElementById('paginator').innerHTML = asidemenu;
menuitems = document.querySelectorAll('.asidemenu li');




let loadblock = (targetDiv,blockUrl,interval) => {
	fetch(blockUrl).then((response) => {
		return response.text();
	}).then((blockcontent) => {
		document.getElementById(targetDiv).innerHTML = blockcontent;
	}).catch((error) => {
		console.debug('Error:', error);
	});

	setInterval(function () {
		fetch(blockUrl).then((response) => {
			return response.text();
		}).then((blockcontent) => {
			document.getElementById(targetDiv).innerHTML = blockcontent;
		}).catch((error) => {
			console.debug('Error:', error);
		});
	}, interval*60*1000);
}

document.addEventListener("DOMContentLoaded", function() {
	loadblock('clock','./blocks/clock.php',1);
});


