let loadblock = (targetDiv,blockUrl,interval) => {
	fetch(blockUrl).then((response) => {
		return response.text();
	}).then((blockcontent) => {
		document.getElementById(targetDiv).innerHTML = blockcontent;
	}).catch((error) => {
		console.debug('Error:', error);
	});
}


// main content: rotates content every X seconds (var interval)
var s = document.getElementById("FEcontainer");
let rebootURL = ["blocks/firstboot.php",'Start'];

let URLlist = [ // URL, voce a menu
	["blocks/presenze.php",'Presenze'],
	// ["blocks/currentIP.php",'current IP'],
	["blocks/mensa.php",'Mensa'],
	// ["/info.php",'Test Page'],
];
let slength = URLlist.length;
let i = 0;
var interval = 60*1000; // millis... 5mins: 5*60*1000
let menuitems = null;



// fetch(rebootURL[0]).then((response) => {
// 		return response.text();
// 	}).then((URLcontent) => {
// 		s.innerHTML = URLcontent;
// 	}).catch((error) => {
// 		console.debug('Error:', error);
// 	});

setInterval(function () {
	 if (i == slength) {
		console.debug('reached end. restarting!');
		menuitems[slength-1].classList.add('current');
		i=0;
	}
	console.debug(i+' - scheda: '+URLlist[i][1]);
	fetch(URLlist[i][0],{cache: 'no-cache'}).then((response) => {
		return response.text();
	}).then((URLcontent) => {
		console.debug('url: '+URLlist[i][0]+' - time: '+interval);
		s.innerHTML = URLcontent;

		if ( URLlist[i][1] == "Presenze") {

			if (checkLSData('Presenze') === true) {
				getLSData('Presenze');
			} else {
				loadExtData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze',3);
				getLSData('Presenze');
			}

		} else if ( URLlist[i][1] == "Mensa") {

			if (checkLSData('Mensa') === true) {
				getLSData('Mensa');

			} else {
				loadExtData('https://wrapapi.com/use/quetz82/pellegrini/menu_linea/0.0.1?wrapAPIKey=8iOtqFcQ0YdtspWymuhzgq2yj7AGTZDt','Mensa',3);
				getLSData('Mensa');
			}

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
	asidemenu = asidemenu+'<li>'+item[1]+'</li>';
});
asidemenu = asidemenu+'</ul>';
document.getElementById('paginator').innerHTML = asidemenu;
menuitems = document.querySelectorAll('.asidemenu li');

document.addEventListener("DOMContentLoaded", function() {
	loadblock('clock','./blocks/clock.php',1);
});


