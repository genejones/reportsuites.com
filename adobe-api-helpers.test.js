var adobe_api = require('./adobe-api-helpers.js');
var expectedValues = require('./__mocks__/expected-values.js').modules;
var htmlSnippets = require('./__mocks__/html-segments-for-client.js');

test("wsse creates and updates value", () => {
	adobe_api.getNewAuthToken();
	let oldToken = adobe_api.getNewAuthToken();
	expect(oldToken).not.toBe('');
	//verify that update works
	let newToken = adobe_api.getNewAuthToken();
	expect(newToken).not.toBe(oldToken);
});

test("reportsuite API request", done => {
	function callback(reportsuites){
		expect(reportsuites).toEqual(expectedValues.reportsuitesRequest.report_suites);
		done();
	}
	
	adobe_api.getListOfReportSuites(callback);
});

test("evars API request", done => {
	document.body.innerHTML = htmlSnippets.displaySystem + htmlSnippets.progressDisplay;
	function callback(evars){
		expect(evars).toEqual(expectedValues.evars);
		done();
	}
	
	adobe_api.getListOfEvars(expectedValues.selectedFormDataAll, callback);
});

test("props API request", done => {
	document.body.innerHTML = htmlSnippets.displaySystem + htmlSnippets.progressDisplay;
	function callback(evars){
		expect(evars).toEqual(expectedValues.props);
		done();
	}
	
	adobe_api.getListOfProps(expectedValues.selectedFormDataAll, callback);
});

test("events API request", done => {
	document.body.innerHTML = htmlSnippets.displaySystem + htmlSnippets.progressDisplay;
	function callback(evars){
		expect(evars).toEqual(expectedValues.events);
		done();
	}
	
	adobe_api.getListOfEvents(expectedValues.selectedFormDataAll, callback);
});

test("name value pair creation", () => {
	let props = adobe_api.mapToNameValuePairs(expectedValues.props, 'props');
	expect(Object.keys(props)).toEqual(["illuminati2014global","illuminati2014en","illuminati2012de"]);
	expect(Object.keys(props.illuminati2014global)).toEqual(["prop1", "prop2", "prop3"]);
});