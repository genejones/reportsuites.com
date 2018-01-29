"use strict";
var currentTokenWSSE = '';
var wsse = require('wsse');
var request = require('browser-request');

let username = '';
let password = '';
function setCredentials (userInput, passInput){
	username = userInput;
	password = passInput;
}
function getCredentials (){
	return {username, password};
}

function getNewAuthToken ()  {
	var token = wsse(getCredentials());
	currentTokenWSSE = token.getWSSEHeader({ nonceBase64: true });
	return currentTokenWSSE;
}

function getHeaders (){
	let currentTokenWSSE = getNewAuthToken();
	return {
      'Content-Type': 'application/x-www-form-urlencoded',
	  'X-WSSE': currentTokenWSSE
    };
}

function constructRequestBodyRSID (report_suites) {
    //posting this over AJAX makes things picky for some reason.
    //this function manually constructs the POST body to make Adobe happy
    //because all my earlier attempts to use querystring or other methods failed.
    window.rsid_list = {
        "rsid_list": []
    };
    var stringList = '{"rsid_list":[';
    for (var i = 0; i < report_suites.length; i++) {
        stringList = stringList + '"' + report_suites[i] + '"';
        if (i < report_suites.length - 1) {
            stringList = stringList + ",";
        }
    }
    stringList = stringList + ']}';
    return stringList;
}

function getListOfReportSuites (callback) {
    var options = {
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=Company.GetReportSuites',
        body: "search=&types=standard",
        method: 'POST',
        json: true
    };
    request(options, function (err, res, body) {
        if (!err) {
            report_suites = body.report_suites;
            callback(report_suites);
        }
        else {
            console.log(res.statusCode);
            displayError(err);
        }
    });
}

function getListOfEvars (form, callback) {
    getNewAuthToken();
    request({
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvars',
        body: form,
        method: 'POST'
    }, function (err, res, body) {
        if (!err) {
            var evarsRaw = body;
            let evars = JSON.parse(evarsRaw);
			callback(evars, form);
        }
        else {
            console.log(res.statusCode);
            displayError(err);
            console.log(body);
        }
    });
}

function getListOfProps (form, callback) {
    getNewAuthToken();
    request({
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetProps',
        body: form,
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

function getListOfEvents (form, callback) {
    request({
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvents',
        body: form,
        method: 'POST'
    }, function (err, res, body) {
        if (!err) {
            var eventsRaw = body;
			let events = JSON.parse(eventsRaw);
			callback(events, form);
		}
        else {
            console.log(res.statusCode);
            displayError(err);
            console.log(body);
        }
    });
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
	_currentTokenWSSE : function(){return currentTokenWSSE;},
};