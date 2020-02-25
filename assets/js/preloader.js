let loadExtData = (Furl,LSname,Delayhrs=3) => {
	let curtime = Date.now();
	let exptime = curtime + Delayhrs*60*60*1000;
	let retrievedObj = localStorage.getItem(LSname);
	let checker = document.querySelector('#'+LSname+' span');

	if (!retrievedObj || retrievedObj.time > exptime) {
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

			if (LSname == 'Presenze') { // check data per lista Presenze
				let LSdata = {
					data: URLcontent.data,
					exptime: exptime,
				}
				// set Localstorage
				localStorage.setItem(LSname, JSON.stringify(LSdata));
				if (checker){
					document.querySelector('#'+LSname+' span').innerText = 'OK';
				}
			}

		}).catch((error) => {
			console.debug('Error:', error);
			if (checker){
				document.querySelector('#'+LSname+' span').innerText = 'Error: '+error;
			}
		});
	} else {
		console.debug('localStorage for '+LSname+' is LESS than '+Delayhrs+' hours old');
		if (checker){
			document.querySelector('#'+LSname+' span').innerText = 'OK';
		}
	}
}









	let curtime = Date.now();
	let checkLSData = (LSname) => {
		let LScontent = JSON.parse(localStorage.getItem(LSname));
		
		if (LScontent) {
			if(curtime < LScontent.exptime) {
				return true;
			}
		}
		return false;
	}


	let getLSData = (Furl,LSname) => {
		let LScontent = JSON.parse(localStorage.getItem(LSname));

		if (LScontent) {
			console.debug(curtime);
			console.debug(LScontent.exptime);
			if(curtime < LScontent.exptime) {
				let target = document.querySelector('.today-pres');

				let containerli = document.createElement("li");
				document.querySelectorAll('.today-pres')[0].appendChild(containerli);
				Array.from(LScontent.data.sviluppatore).forEach(function(item,el){
					console.debug(item);
					let containerul = document.createElement("ul");
					containerul.setAttribute('class', 'today-pres-sviluppatore');
					let devli = document.createElement("li");
					devli.setAttribute('class', 'today-pres-name');
					let statli = document.createElement("li");
					statli.setAttribute('class', 'today-pres-status today-pres-'+LScontent.data.status[el].toLowerCase());
					devli.appendChild(document.createTextNode(item));
					statli.appendChild(document.createTextNode(LScontent.data.status[el]));
					

					if (document.querySelectorAll('.today-pres').length !== 0) {
						document.querySelectorAll('.today-pres li')[0].appendChild(containerul).appendChild(devli);
						document.querySelectorAll('.today-pres li')[0].appendChild(containerul).appendChild(statli);
					}
				});
				return true;
			} else {
				console.debug('LScontent old, reloading...');
				localStorage.removeItem(LSname);
				loadExtData(Furl,LSname,3);
				return false;
			}
		} else {
			console.debug('LScontent old or not present');
			loadExtData(Furl,LSname,3);
			return false;
		}
	}
window.onload = function(e){ 
	console.debug('loaded');
	
	// if (checkLSData('Presenze') === true) {
	// 	getLSData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze');
	// } else {
	// 	loadExtData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze',3);
	// 	getLSData('https://wrapapi.com/use/meuro/fekiosk/FEpresenze/0.0.1?wrapAPIKey=UCmyH6A9ybca3cojcz8O4oQgP4icziFH','Presenze');
	// }
};

