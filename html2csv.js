jQuery.fn.table2CSV = function(options, reportType) {
	var reportType = reportType;

	var options = jQuery.extend(
		{
			separator : ',',
			header    : [],
			delivery  : 'popup' // popup, value
		},
		options
	);

	var csvData = [];
	var headerArr = [];
	var el = this;

	//header
	var numCols = options.header.length;
	var tmpRow = []; // construct header avalible array

	if (numCols > 0) {
		for (var i = 0; i < numCols; i++) {
			tmpRow[tmpRow.length] = formatData(options.header[i]);
		}
	} else {
		$(el).filter(':visible').find('th').each(function() {
			if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
		});
	}

	row2CSV(tmpRow);

	// actual data
	$(el).find('tr').each(function() {
		var tmpRow = [];
		$(this).filter(':visible').find('td').each(function() {
			if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
		});
		row2CSV(tmpRow);
	});
	if (options.delivery == 'popup') {
		var mydata = csvData.join('\n');
		return popup(mydata);
	} else {
		var mydata = csvData.join('\n');
		return mydata;
	}

	function row2CSV(tmpRow) {
		var tmp = tmpRow.join(''); // to remove any blank rows
		// alert(tmp);
		if (tmpRow.length > 0 && tmp != '') {
			var mystr = tmpRow.join(options.separator);
			csvData[csvData.length] = mystr;
		}
	}
	function formatData(input) {
		// replace " with “
		var regexp = new RegExp(/["]/g);
		var output = input.replace(regexp, '“');
		//HTML
		var regexp = new RegExp(/\<[^\<]+\>/g);
		var output = output.replace(regexp, '');
		if (output == '') return '';
		return '"' + output + '"';
	}
	function popup(data) {
		let dataWithVingongos = data;

		console.log('dataWithVingongos');
		console.log(dataWithVingongos);

		cleanData = dataWithVingongos.replace(/"/g, '');
		console.log('cleanData');
		console.log(cleanData);

		// doSendEmail(cleanData);
		// doSendEmail(dataWithVingongos);
	}

	// function doSendEmail(cleanData) {
	// 	let bodyToSend = {
	// 		csvContent : cleanData,
	// 		emailName  : reportType
	// 	};

	// 	// fetch('https://kaizalafortwiga.azurewebsites.net/sendEmailsAsReport', {
	// 	fetch('http://localhost:8080/sendEmailsAsReport', {
	// 		method  : 'POST',
	// 		body    : JSON.stringify(bodyToSend),

	// 		headers : {
	// 			'Content-Type' : 'Application/json'
	// 		}
	// 	})
	// 		.then((response) => response.json())
	// 		.then((mapato) => {
	// 			console.log(mapato);

	// 			swal('Report sent to logistics@twiga.com', '', 'success').then(() =>
	// 				window.location.replace('./reports.html')
	// 			);
	// 		})
	// 		.catch((err) => console.log(err));
	// }

	function popup(data) {
        var generator = window.open('', 'csv', 'height=400,width=600');
        generator.document.write('<html><head><title>CSV</title>');
        generator.document.write('</head><body >');
        generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
        generator.document.write(data);
        generator.document.write('</textArea>');
        generator.document.write('</body></html>');
        generator.document.close();
        return true;
    }
};
