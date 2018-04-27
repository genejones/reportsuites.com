"use strict";
var currentTokenWSSE = '';
var wsse = require('wsse');
var request = require('browser-request');

class WSSEauth {
	constructor (usernameInput, passwordInput){
		this.username = userInput;
		this.password = passInput;
		this.wsseGenerator = wsse({username: this.username, password: this.password});
	}
	get username() {
		return this.username;
	}
	get token() {
		return wsseGenerator.getWSSEHeader({ nonceBase64: true });
	}
	get header() {
		return {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-WSSE': this.token
		};
	}
}
var wsseInstance = {};
function setCredentials (username, password){
	wsseInstance = new WSSEauth(username, password);
}

const MAX_REPORTSUITES_PER_REQUEST = 15;

function splitResults (reportsuiteList, functionToCall, callback){
	if (reportsuiteList.length > MAX_REPORTSUITES_PER_REQUEST){
		let slot = [];
		for (let i=0; i<reportsuiteList.length; i + MAX_REPORTSUITES_PER_REQUEST){
			let spliceLength = MAX_REPORTSUITES_PER_REQUEST;
			let currentListPortion = reportsuiteList.splice(i, i + MAX_REPORTSUITES_PER_REQUEST - 1);
			functionToCall(currentListPortion, function(){
				//do nothing
			});
		}
		callback(slot, reportsuiteList);
	}
	else
	{
		
	}
}

function getListOfEvars (reportsuites, callback) {
	splitResults(getListOfEvarsForPortion, reportsuites, callback);
}

class adobeInstance {
	constructor (auth){this.auth = auth;}
	get requestBody () {
		//posting this over AJAX makes things picky for some reason.
		//this function manually constructs the POST body to make Adobe happy
		//because all my earlier attempts to use querystring or other methods failed.
		window.rsid_list = {
			"rsid_list": []
		};
		var stringList = '{"rsid_list":[';
		for (var i = 0; i < this.report_suites.length; i++) {
			stringList = stringList + '"' + this.report_suites[i] + '"';
			if (i < this.report_suites.length - 1) {
				stringList = stringList + ",";
			}
		}
		stringList = stringList + ']}';
		return stringList;
	}
	get reportsuites () {
		//see if we can't load it out of localStorage
		//else, use getListOfReportSuites
	}
	getListOfReportSuites (callback) {
		var options = {
			headers: this.auth.header,
			uri: 'https://api.omniture.com/admin/1.4/rest/?method=Company.GetReportSuites',
			body: "search=&types=standard",
			method: 'POST',
			json: true
		};
		request(options, function (err, res, body) {
			if (!err) {
				let report_suites = body.report_suites;
				this.report_suites = report_suites;
				callback(report_suites);
			}
			else {
				console.log(res.statusCode);
				displayError(err);
			}
		});
	}
}

class fetchVariableDefintions {
	constructor(uri) {this.uri = uri;}
	getListOfEvarsForPortion (reportsuites, callback) {
		request({
			headers: auth.header,
			this.uri,
			body: this.adobeInstance.report_suites,
			method: 'POST'
		}, function (err, res, body) {
			if (!err) {
				var evarsRaw = body;
				let evars = JSON.parse(evarsRaw);
				callback(evars, reportsuites);
			}
			else {
				console.log(res.statusCode);
				displayError(err);
				console.log(body);
			}
		});
	}
}

function getListOfEvarsForPortion (reportsuites, callback) {
    getNewAuthToken();
    request({
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvars',
        body: reportsuites,
        method: 'POST'
    }, function (err, res, body) {
        if (!err) {
            var evarsRaw = body;
            let evars = JSON.parse(evarsRaw);
			callback(evars, reportsuites);
        }
        else {
            console.log(res.statusCode);
            displayError(err);
            console.log(body);
        }
    });
}

function getListOfProps (reportsuites, callback) {
    getNewAuthToken();
    request({
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetProps',
        body: reportsuites,
        method: 'POST'
    }, function (err, res, body) {
        if (!err) {
            var propsRaw = body;
            let props = JSON.parse(propsRaw);
			callback(props, form);
        }
        else {
            console.log(res.statusCode);
            displayError(err);
            console.log(body);
        }
    });
}

function getListOfEvents (reportsuites, callback) {
    request({
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvents',
        body: reportsuites,
        method: 'POST'
    }, function (err, res, body) {
        if (!err) {
            var eventsRaw = body;
			let events = JSON.parse(eventsRaw);
			callback(events, reportsuites);
		}
        else {
            console.log(res.statusCode);
            displayError(err);
            console.log(body);
        }
    });
}

function mapToNameValuePairs(array, nameofVarSlot){
	var rsid_mapping = {};
	for (let i=0; i<array.length; i++){
		var reportSuiteInfo = array[i];
		var rsid = reportSuiteInfo.rsid;
		var vars = reportSuiteInfo[nameofVarSlot];
		var nvp = {};
		for (var j=0; j<vars.length; j++){
			var presentVariable = vars[j];
			nvp[presentVariable.id] = presentVariable;
		}
		rsid_mapping[rsid] = nvp;
	}

	return rsid_mapping;
}

var exports = module.exports = {
	constructRequestBodyRSID,
	setCredentials,
	getHeaders,
	getNewAuthToken,
	getListOfReportSuites,
	getListOfEvents,
	getListOfEvars,
	getListOfProps,
	_currentTokenWSSE : function(){return wsseInstance.token;},
	mapToNameValuePairs
};