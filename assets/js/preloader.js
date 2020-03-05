let curtime = Date.now();

// initial checks (firstboot page):
let initialChecks = () => {
	URLlist.forEach(function(item,el) {

		if (checkLSData(item['name']) === false) {
			loadExtData(item['source'],item['name'],item['duration']);
			console.debug('initialChecks '+item['name']+': false');

		} else {
			console.debug('initialChecks '+item['name']+': true');
			document.querySelector('#'+item['name']+' span').innerText = 'data already good.';
		}
	});
	
}


// checks if there's already a Localstorage item named LSname
let checkLSData = (LSname) => {
	let LScontent = JSON.parse(localStorage.getItem(LSname));
	
	if (LScontent) {
		if(curtime < LScontent.exptime) {
			return true;
		} else {
			localStorage.removeItem(LSname)
			return false;
		}
	}

	return false;
}



// gets external data and stores it in Localstorage
let loadExtData = (Furl,LSname,Delayhrs=3) => {
	
	let exptime = curtime + Delayhrs*60*60*1000;
	let retrievedObj = localStorage.getItem(LSname);
	let checker = document.querySelector('#'+LSname+' span');

	console.debug('NO localStorage for '+LSname+' OR localstorage is MORE than '+Delayhrs+' hours old')

	fetch(Furl,{
		//mode: 'no-cors',
		method: 'POST',
		cache: 'no-cache',
		headers: {
			"Content-Type": "application/json"
		}
	}).then((response) => {
		return response.json();
	}).then((URLcontent) => {
		//console.debug(URLcontent.data);

		let LSdata = {
			data: URLcontent.data,
			exptime: exptime,
		}
		// set Localstorage
		localStorage.setItem(LSname, JSON.stringify(LSdata));
		if (checker){
			document.querySelector('#'+LSname+' span').innerText = 'data updated.';
		} else {
			getLSData(LSname);
		}

		

	}).catch((error) => {
		console.debug('Error:', error);
		if (checker){
			document.querySelector('#'+LSname+' span').innerText = 'Error: '+error;
		}
	});

}




// gets data from Localstorage
let getLSData = (LSname) => {
	let LScontent = JSON.parse(localStorage.getItem(LSname));

	if (LScontent) {
		// console.debug(curtime);
		// console.debug(LScontent.exptime);
		let target = document.querySelector('.'+LSname);

		let containerli = document.createElement("li");
		document.querySelectorAll('.'+LSname)[0].appendChild(containerli);

		if (LSname == 'Presenze') {
			Array.from(LScontent.data.sviluppatore).forEach(function(item,el){
				// console.debug(item);
				let containerul = document.createElement("ul");
				containerul.setAttribute('class', LSname+'-sviluppatore');
				let devli = document.createElement("li");
				devli.setAttribute('class', LSname+'-name');
				let statli = document.createElement("li");
				statli.setAttribute('class', LSname+'-status '+LSname+'-'+LScontent.data.status[el].toLowerCase());
				devli.appendChild(document.createTextNode(item));
				statli.appendChild(document.createTextNode(LScontent.data.status[el]));
				

				if (document.querySelectorAll('.'+LSname).length !== 0) {
					document.querySelectorAll('.'+LSname+' li')[0].appendChild(containerul).appendChild(devli);
					document.querySelectorAll('.'+LSname+' li')[0].appendChild(containerul).appendChild(statli);
				}
			});
		} else if(LSname == 'Mensa') {
			let d = new Date();
			let DOW = d.getDay();
			if (d.getUTCHours() >= 14 ) { // dopo le 14 mostro quelli di domani
				DOW = d.getDay()+1;
			}
			Array.from(LScontent.data.Piatti).forEach(function(item,el){
				// console.debug(item);
				let containerul = document.createElement("ul");
				containerul.setAttribute('class', LSname+'-portata');

				if ( LScontent.data.Piatti[el].Giorno == DOW) { // solo quelli di oggyyy
					let devli = document.createElement("li");
					devli.setAttribute('class', LSname+'-name');
					let statli = document.createElement("li");
					statli.setAttribute('class', LSname+'-foto');
					devli.appendChild(document.createTextNode(LScontent.data.Piatti[el].Piatto.Nome));
					let piattopic = document.createElement("img");
					piattopic.setAttribute('src', LScontent.data.Piatti[el].Piatto.Foto);
					statli.appendChild(piattopic);
				
				

					if (document.querySelectorAll('.'+LSname).length !== 0) {
						document.querySelectorAll('.'+LSname+' li')[0].appendChild(containerul).appendChild(devli);
						document.querySelectorAll('.'+LSname+' li')[0].appendChild(containerul).appendChild(statli);
					}
				}

				printDOW();
			});
		} else if(LSname == 'Jira') {
			Array.from(LScontent.data.output.issues).forEach(function(item,el){
				let containerul = document.createElement("ul");
				containerul.setAttribute('class', LSname+'-issue');
				

				let KEYli = document.createElement("li");
				KEYli.setAttribute('class', LSname+'-issue-key');
				KEYli.appendChild(document.createTextNode(LScontent.data.output.issues[el].key));
				let SUMli = document.createElement("li");
				SUMli.setAttribute('class', LSname+'-issue-summary');
				SUMli.appendChild(document.createTextNode(LScontent.data.output.issues[el].fields.summary));
				let PRIOli = document.createElement("li");
				PRIOli.setAttribute('class', LSname+'-issue-priority');
				let PRIOpic = document.createElement('img');
				PRIOpic.setAttribute('src',LScontent.data.output.issues[el].fields.priority.iconUrl);
				PRIOli.appendChild(PRIOpic);

				document.querySelectorAll('.'+LSname+' li')[0].appendChild(containerul).appendChild(PRIOli);
				document.querySelectorAll('.'+LSname+' li')[0].appendChild(containerul).appendChild(KEYli);
				document.querySelectorAll('.'+LSname+' li')[0].appendChild(containerul).appendChild(SUMli);
				
			});
			
		}
		return true;
	}
}

let printDOW = () => {
	let d = new Date();
	if (d.getUTCHours() >= 14 ) {
		d.setDate(d.getDate() + 1);
	}

	let weekday = new Array(7);
	weekday[0] = "Domenica";
	weekday[1] = "Lunedì";
	weekday[2] = "Martedì";
	weekday[3] = "Mercoledì";
	weekday[4] = "Giovedì";
	weekday[5] = "Venerdì";
	weekday[6] = "Sabato";

	let n = weekday[d.getDay()];
	n = n + ' ' + d.toLocaleDateString("it-IT")
	document.getElementById('DOW').innerHTML=n;
}