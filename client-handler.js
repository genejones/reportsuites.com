var wsse = require('wsse');
var request = require('browser-request');
var excel = require('./excel-handler.js');
var handlebars = require('handlebars/runtime')["default"];
var RSID_selection_template = require('./select_rsid.handlebars');
var progressDisplay = require('./progress-display.handlebars');
var crypto = require('pbkdf2');

var currentTokenWSSE = '';

window.report_suites = {};
window.selected_report_suites = [];
window.adobe_vars = {};
var analytics = {'rs':{}};
window.analytics = analytics;

var processInitialOptions = function() {
    window.fileName = jQuery('input#filename').val() + '.xlsx';
    window.username = jQuery('input#adobe-username').val();
    window.pass = jQuery('input#adobe-secret').val();
	window.dataLayer.push({'event': 'export-complete',
		'company': analytics.company,
		'user': analytics.user,
		'filename':window.fileName});
    getListOfReportSuites();
};
jQuery('#action-initial').click(processInitialOptions);

var getNewAuthToken = function() {
	var token = wsse({username:window.username, password:window.pass});
	currentTokenWSSE = token.getWSSEHeader({ nonceBase64: true });
	console.debug(currentTokenWSSE);
};

var getHeaders = function(){
	getNewAuthToken();
	return {
      'Content-Type': 'application/x-www-form-urlencoded',
	  'X-WSSE': currentTokenWSSE
    };
};

var displayError = function(err){
	console.log(err);
	jQuery('.display-3').text("There was an error");
	if (err.hasOwnProperty("error_description")){
		jQuery('.lead').text(err.error_description);
	}
};

var getListOfReportSuites = function(callback){
	var options = {
		headers: getHeaders(),
		uri: 'https://api.omniture.com/admin/1.4/rest/?method=Company.GetReportSuites',
		body: "search=&types=standard",
		method: 'POST',
		json: true
	}; 
	request(options, function (err, res, body) {
		if (!err){
			console.log(body);
			report_suites = body.report_suites;
			window.adobe_vars.report_suites = report_suites;
            displayRsChoices(report_suites);
		}
		else{
			console.log(res.statusCode);
			displayError(err);
		}
	    
  });
};

var displayRsChoices = function (report_suites){
    jQuery('.display-3').text("Select Reportsuites");
    jQuery('.lead').text("Select which reportsuites will be exported");
    jQuery('#adobe-action').remove();
    jQuery('.jumbotron').append(RSID_selection_template({report_suite:report_suites}));
    analytics.numberOfReportSuites = report_suites.length;
    jQuery('#rsid-select-action').click(handleUserSelectionOfRSID);
};

var displayProgressBar = function(){
	jQuery('#rsid-selection').remove();
	jQuery('.display-3').text("Working on it");
    jQuery('.lead').text("Your export is being created");
	jQuery('.jumbotron').append(progressDisplay({progress:"33", msg:"Fetching eVars"}));
};

var displayProgress = function(progressPct, msg){
	jQuery('#progress-view div.progress-bar').css("width", progressPct + "%");
	jQuery('#progress-view div.progress-bar').attr("aria-valuenow", progressPct);
	jQuery('#progress-view div.progress-bar').text(msg);
	jQuery('.lead').text(msg);
};

var handleUserSelectionOfRSID = function(event){
    window.listOfSelectedRSID = new Array();
	let selected_rsid_dict = {};
    jQuery.each(jQuery('input[type="checkbox"]:checked'), function (key, value) {
		let rsid = jQuery(value).attr("name");
        listOfSelectedRSID.push(rsid);
		selected_rsid_dict[rsid] = true;
		
    });
	for (var i=0; i<report_suites.length; i++){
		let rs = report_suites[i];
		if (selected_rsid_dict.hasOwnProperty(rs.rsid)){
			window.selected_report_suites.push(report_suites[i]);
		}
	}
	window.adobe_vars.selected_report_suites = window.selected_report_suites;
    formData = constructRequestBodyRSID(listOfSelectedRSID);
    console.debug(formData);
	//update the ui
	displayProgressBar();
    getListOfEvars(formData);
    return false;
};

var constructRequestBodyRSID = function(report_suites){
	//posting this over AJAX makes things picky for some reason.
	//this function manually constructs the POST body to make Adobe happy
	//because all my earlier attempts to use querystring or other methods failed.
	window.rsid_list = {
		"rsid_list":[
		]
	};
	var stringList = '{"rsid_list":[';
	for (var i=0;i<report_suites.length; i++){
		stringList = stringList + '"' + report_suites[i] + '"';
		if (i < report_suites.length -1){
			stringList = stringList + ",";
		}
	}
	
	stringList = stringList + ']}';
	return stringList;
};

const salt = "41C382B46D9AAB7CCC801A8E7C8F";
function buf2hex(buffer) { // buffer is an ArrayBuffer
	//taken from https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

var getHash = function(infoToHash){
	//uses 3000 iterations, which is weak but we are just using this as a glorified hashing system to provide reassurance
	//if it was md5 it would be bad because I could trivially reconstruct everything
	//a predetermined salt, and an export length of 30 bytes
	//use the digest of SAH512
	
	let hashBuffer = crypto.pbkdf2Sync(infoToHash, salt, 3000, 32, 'sha512');
	return buf2hex(hashBuffer);
};

var determineAnalyticsInformation = function(adobeVar){
	let report_suites = adobeVar.report_suites;
	let evars = adobeVar.evars;
	let props = adobeVar.props;
	let events = adobeVar.events;
	let user = window.username.split(":")[1];
	let company = window.username.split(":")[0];
    analytics.user = getHash(user);
	analytics.company = getHash(company);
	analytics.file = getHash(window.fileName);
	analytics.availReportSuites = window.report_suites.length;
	analytics.selectedReportSuites = window.selected_report_suites.length;
	window.dataLayer.push({
		'companyHash': analytics.company,
		'user': analytics.user,
		'fileHash':analytics.file,
		'rsAvailable': analytics.availReportSuites,
		'rsSelected': analytics.selectedReportSuites
		});
	//GA may use the Company/User unique hash as an user identifier in the future
	console.debug(report_suites);
};

var getListOfEvars = function(form) {
	request({
    headers: getHeaders(),
    uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvars',
    'body': form,
    method: 'POST'
  }, function (err, res, body) {
	  if(!err){
		  let evarsRaw = body;
		  window.adobe_vars.evars = JSON.parse(evarsRaw);
		  console.debug("succesfully got eVars");
		  getListOfProps(form);
	  }
	  else{
	    console.log(res.statusCode);
	    displayError(err);
		console.log(body);
	  }
  });
};

var getListOfProps = function(form) {
	displayProgress(45, "Fetching props");
	getNewAuthToken();
	request({
    headers: getHeaders(),
    uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetProps',
    body: form,
    method: 'POST'
  }, function (err, res, body) {
	  if (!err){
		  let propsRaw = body;
		  window.adobe_vars.props = JSON.parse(propsRaw);
		  console.debug("successfully got props");
		  getListOfEvents(form);
	  }
	  else{
	    console.log(res.statusCode);
	    displayError(err);
		console.log(body);
	  }
  });
};

var handleExcelSuccess = function(input){
	if (input === true){
		displayProgress(100, "Excel export complete");
		window.dataLayer.push({'event': 'export-complete', 'fileSize':window.analytics.fileSize});
		jQuery('#progress-view div').removeClass("progress-bar-info progress-bar-striped active");
		jQuery('#progress-view div').addClass("progress-bar-success");
		jQuery('.jumbotron .display-3').text("All done");
	}
	else{
		console.error(input);
	}
};

var getListOfEvents = function(form) {
	displayProgress(66, "Fetching events");
	request({
    headers: getHeaders(),
    uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvents',
    body: form,
    method: 'POST'
  }, function (err, res, body) {
	  if (!err){
		  let eventsRaw = body;
		  console.log("succesfully got events");
		  window.adobe_vars.events = JSON.parse(eventsRaw);
		  console.log(window.selected_report_suites);
          determineAnalyticsInformation(window.adobe_vars);
		  displayProgress(95, "Building spreadsheet");
		  excel.exportSiteCatToExcel(window.selected_report_suites, window.adobe_vars.evars, window.adobe_vars.props, window.adobe_vars.events, window.fileName, handleExcelSuccess);
	  }
	  else{
	    console.log(res.statusCode);
	    displayError(err);
		console.log(body);
	  }
  });
};

var enablePaginationButtons = function(element){
	if (element.data("nextStep")){
		jQuery("#adobe-instructions-modal > li.next").removeClass("disabled");
	}
	else{
		jQuery("#adobe-instructions-modal > li.prev").addClass("disabled");
	}
	if (element.data("prevStep")){
		jQuery("#adobe-instructions-modal > li.prev").removeClass("disabled");
	}
	else{
		jQuery("#adobe-instructions-modal > li.prev").addClass("disabled");
	}
};

jQuery("#adobe-instructions-modal li.next a").click(function(){
	let elem = jQuery('*[data-current-instruction="true"');
	if (elem.data("next-step")){
		var nextElem = jQuery("#" + elem.data("next-step") );
		elem.hide("fast");
		delete elem[0].dataset.currentInstruction;
		console.log(nextElem);
		nextElem.show("slow");
		nextElem[0].dataset.currentInstruction = "true";
		//set up the next/prev steps
		enablePaginationButtons(nextElem);
	}
});
jQuery("#adobe-instructions-modal li.previous a").click(function(){
	let elem = jQuery('*[data-current-instruction="true"');
	if (elem.data("prev-step")){
		var prevElem = jQuery("#" + elem.data("prev-step") );
		elem.hide("fast");
		delete elem[0].dataset.currentInstruction;
		prevElem.show("fast");
		nextElem[0].dataset.currentInstruction = "true";
		//set up the next/prev steps
		enablePaginationButtons(prevElem);
	}
});

var exports = module.exports = {};
exports.getListOfReportSuites = getListOfReportSuites;
window.getListOfReportSuites = getListOfReportSuites;
exports.processInitialOptions = processInitialOptions;
exports.handleUserSelectionOfRSID = handleUserSelectionOfRSID;
exports.displayProgressBar = displayProgressBar;
exports.displayProgress = displayProgress;
exports.displayError = displayError;