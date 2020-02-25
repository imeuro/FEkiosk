let loadblock = (targetDiv,blockUrl,interval) => {
	fetch(blockUrl).then(
		(response) => {
			return response.text();
		}).then((blockcontent) => {
			document.getElementById(targetDiv).innerHTML = blockcontent;
		}).catch((error) => {
			console.debug('Error:', error);
		});
	setInterval(function(){
		fetch(blockUrl).then(
		(response) => {
			return response.text();
		}).then((blockcontent) => {
			document.getElementById(targetDiv).innerHTML = blockcontent;
		}).catch((error) => {
			console.debug('Error:', error);
		});
		console.debug('block '+blockUrl+' loaded.');
	}, interval*60*1000);

}


// main content: rotates content every X mins
var s = document.getElementById("FEcontainer");
let rebootURL = ["blocks/firstboot.php",'Start',5];

let URLlist = [ // URL, voce a menu, secondi permanenza
	["blocks/presenze.php",'Presenze',300],
	["blocks/currentIP.php",'current IP',15],
	["blocks/mensa.php",'Mensa',15],
	["/info.php",'Test Page',15],
];
let slength = URLlist.length;
let i = 0;
var interval = rebootURL[2]*1000
let menuitems = null;



// fetch(rebootURL[0]).then(
// 	(response) => {
// 		return response.text();
// 	}).then((URLcontent) => {
// 		s.innerHTML = URLcontent;
// 	}).catch((error) => {
// 		console.debug('Error:', error);
// 	});

setInterval(function () {
	console.debug(i+' - scheda: '+URLlist[i][1]);
	if (i===0) {
		interval = rebootURL[2]*1000 // prima slide
	} else if (i == slength-1) {
		console.debug('reached end. restarting!');
		interval = URLlist[slength-1][2]*1000;
		menuitems[slength-1].classList.add('current');
		i=0;
	} else {
		interval = URLlist[i][2]*1000;
	}
	fetch(URLlist[i][0],{cache: 'no-cache'}).then((response) => {
		return response.text();
	}).then((URLcontent) => {
		console.debug('url: '+URLlist[i][0]+' - time: '+interval);
		s.innerHTML = URLcontent;


		if ( URLlist[i][1] == "Presenze") {
				console.debug('loaded');

			if (checkLSData('Presenze') === true) {
				getLSData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze');
			} else {
				loadExtData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze',3);
				getLSData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze');
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



		
	
}, interval); // 5mins: 5*60*1000


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


