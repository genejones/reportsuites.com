var expectedValues = require('./expected-values.js').modules;

function request(options, callback) {
	let url = options.uri;
	let routingTable = {
		"https://api.omniture.com/admin/1.4/rest/?method=Company.GetReportSuites": getReportSuites,
		"https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvars": getEvars,
		"https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetProps": getProps,
		"https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvents" : getEvents
		
	};
	if (routingTable.hasOwnProperty(url)){
		routingTable[url](options, callback);
	}
	else{
		returnError("404 no url of that name", 404, callback);
	}
}

function returnError(message, status, callback){
	let err = new Error(message);
	let res = {statusCode: status};
	let body = message;
	callback(err, res, body);
}

function getReportSuites(options, callback) {
	let bodyIsCorrect = options.body === "search=&types=standard";
	let isMethodCorrect = options.method === 'POST';
	let jsonIsSet = options.json === true;
	let headersHaveOptions = options.headers.hasOwnProperty('Content-Type') && options.headers.hasOwnProperty('X-WSSE');
	let allOptionsCorrect = bodyIsCorrect && isMethodCorrect && jsonIsSet && headersHaveOptions;
	if (allOptionsCorrect){
		let err = false;
		let res = {statusCode: 200};
		let body = expectedValues.reportsuitesRequest;
		callback(err, res, body);
	}
	else{
		returnError("incorrect options", 401, callback);
	}
}

function getEvars(options, callback) {
	let isMethodCorrect = options.method === 'POST';
	let headersHaveOptions = options.headers.hasOwnProperty('Content-Type') && options.headers.hasOwnProperty('X-WSSE');
	let allOptionsCorrect = isMethodCorrect && headersHaveOptions;
	if (allOptionsCorrect){
		let err = false;
		let res = {statusCode: 200};
		let body = JSON.stringify(expectedValues.evars);
		callback(err, res, body);
	}
	else{
		returnError("incorrect options", 401, callback);
	}
}

function getProps(options, callback) {
	let isMethodCorrect = options.method === 'POST';
	let headersHaveOptions = options.headers.hasOwnProperty('Content-Type') && options.headers.hasOwnProperty('X-WSSE');
	let allOptionsCorrect = isMethodCorrect && headersHaveOptions;
	if (allOptionsCorrect){
		let err = false;
		let res = {statusCode: 200};
		let body = JSON.stringify(expectedValues.props);
		callback(err, res, body);
	}
	else{
		returnError("incorrect options", 401, callback);
	}
}

function getEvents(options, callback) {
	let isMethodCorrect = options.method === 'POST';
	let headersHaveOptions = options.headers.hasOwnProperty('Content-Type') && options.headers.hasOwnProperty('X-WSSE');
	let allOptionsCorrect = isMethodCorrect && headersHaveOptions;
	if (allOptionsCorrect){
		let err = false;
		let res = {statusCode: 200};
		let body = JSON.stringify(expectedValues.events);
		callback(err, res, body);
	}
	else{
		returnError("incorrect options", 401, callback);
	}
}

module.exports = request;