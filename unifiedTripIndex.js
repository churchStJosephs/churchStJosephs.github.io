var responseYote;

var phoneNumber = null;

var totalWorkHours = 0;

var assignmentsUrl;

var allowedHours = 40 * 1000 * 60 * 60;

async function getContentFromJsonPlaceholder(phoneNumber) {
	phoneNumber = phoneNumber;

	let result = await axios.get('http://kaizalafortwiga.azurewebsites.net/api/drivers', {
		headers : {
			'Access-Control-Allow-Origin' : '*'
		}
	});

	let driverArray = result.data._embedded.drivers;

	let actualDriver = driverArray.filter((driver) => driver.phoneNumber == '0708453901');

	console.log(actualDriver);

	assignmentsUrl = actualDriver[0]._links.assignments.href;

	console.log(assignmentsUrl);

	getAssignments(phoneNumber == null ? 'http://kaizalafortwiga.azurewebsites.net/api/assignments' : assignmentsUrl);
}

function getAssignments(assignmentsUrl) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', assignmentsUrl);

	xhr.send();

	xhr.onload = function() {
		if (xhr.readyState !== 4) {
			alert('Error: ' + xhr.status);
			return;
		}

		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			responseYote = JSON.parse(xhr.response);

			console.log('responseYote');
			console.log(responseYote);

			var managedResponse = responseYote._embedded.assignments;

			console.log('managedResponse');
			console.log(managedResponse);

			createTable(managedResponse);

			return;
		}
	};
}

function getTimeDifference(result) {
	console.log(result);
	if (result.tripEnd == null) {
		return '------';
	} else {
		let diff = Math.abs(new Date(result.tripEnd) - new Date(result.tripStart));

		totalWorkHours += diff;

		var milliseconds = parseInt((diff % 1000) / 100),
			seconds = Math.floor((diff / 1000) % 60),
			minutes = Math.floor((diff / (1000 * 60)) % 60),
			hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		return (
			// hours + ":" + minutes + ":" + seconds + "." + milliseconds
			hours + ' hours, ' + minutes + ' minutes'
		);
	}
}

function getTotalHoursWorked() {
	let diff = totalWorkHours;

	var milliseconds = parseInt((diff % 1000) / 100),
		seconds = Math.floor((diff / 1000) % 60),
		minutes = Math.floor((diff / (1000 * 60)) % 60),
		hours = Math.floor(diff / (1000 * 60 * 60)),
		// hours = Math.floor((diff / (1000 * 60 * 60)) % 24),
		// days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);

		// days = days < 10 ? "0" + days : days;
		hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	return (
		// hours + ":" + minutes + ":" + seconds + "." + milliseconds
		// days + " days, " + hours + " hours, " + minutes + " minutes"
		hours + 'h, ' + minutes + 'm'
	);
}

function getHoursLeft() {
	let diff = allowedHours - totalWorkHours;
	console.log('diff');
	console.log('allowedHours');
	console.log(allowedHours);
	console.log('hoursWorked');

	console.log(totalWorkHours);
	console.log(diff);
	var milliseconds = parseInt((diff % 1000) / 100),
		seconds = Math.floor((diff / 1000) % 60),
		minutes = Math.floor((diff / (1000 * 60)) % 60),
		hours = Math.floor(diff / (1000 * 60 * 60)),
		// hours = Math.floor((diff / (1000 * 60 * 60)) % 24),
		// days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);

		// days = days < 10 ? "0" + days : days;
		hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	return (
		// hours + ":" + minutes + ":" + seconds + "." + milliseconds
		// days + " days, " + hours + " hours, " + minutes + " minutes"
		hours + 'h, ' + minutes + 'm'
	);
}
