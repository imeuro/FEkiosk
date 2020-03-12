// global vars
let rebootURL = ["blocks/firstboot.html",'Start'];
let URLlist = [ // URL, voce a menu, sorgente dati, durata localStorage
	{
		'uri'		: "blocks/presenze.html",
		'name' 		: "Presenze",
		'source' 	: "https://wrapapi.com/use/meuro/fekiosk/FEpresenze/latest?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH",
		'duration' 	: 3
	},
	{
		'uri' 		: "blocks/jira.html",
		'name' 		: "Jira",
		'source' 	: "https://wrapapi.com/use/meuro/fekiosk/Jira/latest?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH",
		'duration' 	: 1
	},
	{
		'uri' 		: "blocks/mensa.html",
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


var date = new Date(parseInt(Date.now()));
let hhmm = (ts) => {
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute:'2-digit'
  });
}
let ddmm = (ts) => {
  return date.toLocaleTimeString(navigator.language, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
let DOMclockdate = () => {
	let hhmmtarget = document.getElementById("clock");

	let hhmmDOM = document.createElement("H1");
	let hhmmtext = document.createTextNode(hhmm(Date.now()));
	hhmmDOM.appendChild(hhmmtext);

	let ddmmDOM = document.createElement("span");
	let ddmmtext = document.createTextNode(ddmm(Date.now()));
	ddmmDOM.appendChild(ddmmtext);

	hhmmtarget.innerHTML='';
	hhmmtarget.appendChild(hhmmDOM);
	hhmmtarget.appendChild(ddmmDOM)
}


document.addEventListener("DOMContentLoaded", function() {
	// loadblock('clock','./blocks/clock.html',1);
	DOMclockdate();
	setInterval(function () { DOMclockdate(); }, 30*1000);
});


