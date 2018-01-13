"use strict";
exports.__esModule = true;
var $ = require("jquery");
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
var analytics = { 'rs': {} };
window.analytics = analytics;
var processInitialOptions = function () {
    window.fileName = jQuery('input#filename').val() + '.xlsx';
    window.username = jQuery('input#adobe-username').val();
    window.pass = jQuery('input#adobe-secret').val();
    window.dataLayer.push({ 'event': 'export-complete',
        'company': analytics.company,
        'user': analytics.user,
        'filename': window.fileName });
    getListOfReportSuites();
};
jQuery('#action-initial').click(processInitialOptions);
var getNewAuthToken = function () {
    var token = wsse({ username: window.username, password: window.pass });
    currentTokenWSSE = token.getWSSEHeader({ nonceBase64: true });
    console.debug(currentTokenWSSE);
};
var getHeaders = function () {
    getNewAuthToken();
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-WSSE': currentTokenWSSE
    };
};
var displayError = function (err) {
    console.log(err);
    jQuery('.display-3').text("There was an error");
    if (err.hasOwnProperty("error_description")) {
        jQuery('.lead').text(err.error_description);
    }
};
var getListOfReportSuites = function (callback) {
    var options = {
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=Company.GetReportSuites',
        body: "search=&types=standard",
        method: 'POST',
        json: true
    };
    request(options, function (err, res, body) {
        if (!err) {
            console.log(body);
            report_suites = body.report_suites;
            window.adobe_vars.report_suites = report_suites;
            displayRsChoices(report_suites);
        }
        else {
            console.log(res.statusCode);
            displayError(err);
        }
    });
};
var displayRsChoices = function (report_suites) {
    jQuery('.display-3').text("Select Reportsuites");
    jQuery('.lead').text("Select which reportsuites will be exported");
    jQuery('#adobe-action').remove();
    jQuery('.jumbotron').append(RSID_selection_template({ report_suite: report_suites }));
    analytics.numberOfReportSuites = report_suites.length;
    jQuery('#rsid-select-action').click(handleUserSelectionOfRSID);
};
var displayProgressBar = function () {
    jQuery('#rsid-selection').remove();
    jQuery('.display-3').text("Working on it");
    jQuery('.lead').text("Your export is being created");
    jQuery('.jumbotron').append(progressDisplay({ progress: "20", msg: "Fetching eVars" }));
};
var displayProgress = function (progressPct, msg) {
    jQuery('#progress-view div.progress-bar').css("width", progressPct + "%");
    jQuery('#progress-view div.progress-bar').attr("aria-valuenow", progressPct);
    jQuery('#progress-view div.progress-bar').text(msg);
    jQuery('.lead').text(msg);
};
var handleUserSelectionOfRSID = function (event) {
    window.listOfSelectedRSID = new Array();
    var selected_rsid_dict = {};
    jQuery.each(jQuery('input[type="checkbox"]:checked'), function (key, value) {
        var rsid = jQuery(value).attr("name");
        listOfSelectedRSID.push(rsid);
        selected_rsid_dict[rsid] = true;
    });
    for (var i = 0; i < report_suites.length; i++) {
        var rs = report_suites[i];
        if (selected_rsid_dict.hasOwnProperty(rs.rsid)) {
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
var constructRequestBodyRSID = function (report_suites) {
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
};
var salt = "41C382B46D9AAB7CCC801A8E7C8F";
function buf2hex(buffer) {
    //taken from https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
    return Array.prototype.map.call(new Uint8Array(buffer), function (x) { return ('00' + x.toString(16)).slice(-2); }).join('');
}
var getHash = function (infoToHash) {
    //uses 5000 iterations, which is the same default Lastpass uses
    //a predetermined salt, and an export length of 30 bytes
    //use the digest of SHA256, which is a bit faster than SHA512 and works better in JS
    var hashBuffer = crypto.pbkdf2Sync(infoToHash, salt, 5000, 32, 'sha256');
    return buf2hex(hashBuffer);
};
var determineAnalyticsInformation = function (adobeVar) {
    var report_suites = adobeVar.report_suites;
    var evars = adobeVar.evars;
    var props = adobeVar.props;
    var events = adobeVar.events;
    var user = window.username.split(":")[1];
    var company = window.username.split(":")[0];
    analytics.user = getHash(user);
    analytics.company = getHash(company);
    analytics.file = getHash(window.fileName);
    analytics.availReportSuites = window.report_suites.length;
    analytics.selectedReportSuites = window.selected_report_suites.length;
    window.dataLayer.push({
        'companyHash': analytics.company,
        'user': analytics.user,
        'fileHash': analytics.file,
        'rsAvailable': analytics.availReportSuites,
        'rsSelected': analytics.selectedReportSuites
    });
    //GA may use the Company/User unique hash as an user identifier in the future
    console.debug(report_suites);
};
var getListOfEvars = function (form) {
    displayProgress(15, "Fetching evars");
    request({
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvars',
        'body': form,
        method: 'POST'
    }, function (err, res, body) {
        if (!err) {
            var evarsRaw = body;
            window.adobe_vars.evars = JSON.parse(evarsRaw);
            console.debug("succesfully got eVars");
            getListOfProps(form);
        }
        else {
            console.log(res.statusCode);
            displayError(err);
            console.log(body);
        }
    });
};
var getListOfProps = function (form) {
    displayProgress(25, "Fetching props");
    getNewAuthToken();
    request({
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetProps',
        body: form,
        method: 'POST'
    }, function (err, res, body) {
        if (!err) {
            var propsRaw = body;
            window.adobe_vars.props = JSON.parse(propsRaw);
            console.debug("successfully got props");
            getListOfEvents(form);
        }
        else {
            console.log(res.statusCode);
            displayError(err);
            console.log(body);
        }
    });
};
var handleExcelSuccess = function (input) {
    if (input === true) {
        displayProgress(100, "Excel export complete");
        window.dataLayer.push({ 'event': 'export-complete', 'fileSize': window.analytics.fileSize });
        jQuery('#progress-view div').removeClass("progress-bar-info progress-bar-striped active");
        jQuery('#progress-view div').addClass("progress-bar-success");
        jQuery('.jumbotron .display-3').text("All done");
    }
    else {
        console.error(input);
    }
};
var getListOfEvents = function (form) {
    displayProgress(40, "Fetching events");
    request({
        headers: getHeaders(),
        uri: 'https://api.omniture.com/admin/1.4/rest/?method=ReportSuite.GetEvents',
        body: form,
        method: 'POST'
    }, function (err, res, body) {
        if (!err) {
            var eventsRaw = body;
            console.log("succesfully got events");
            window.adobe_vars.events = JSON.parse(eventsRaw);
            console.log(window.selected_report_suites);
            displayProgress(65, "Creating hashes");
            determineAnalyticsInformation(window.adobe_vars);
            displayProgress(85, "Building spreadsheet");
            excel.exportSiteCatToExcel(window.selected_report_suites, window.report_suites, window.adobe_vars.evars, window.adobe_vars.props, window.adobe_vars.events, window.fileName, handleExcelSuccess);
        }
        else {
            console.log(res.statusCode);
            displayError(err);
            console.log(body);
        }
    });
};
var enablePaginationButtons = function (element) {
    if (element.data("nextStep")) {
        jQuery("#adobe-instructions-modal > li.next").removeClass("disabled");
    }
    else {
        jQuery("#adobe-instructions-modal > li.prev").addClass("disabled");
    }
    if (element.data("prevStep")) {
        jQuery("#adobe-instructions-modal > li.prev").removeClass("disabled");
    }
    else {
        jQuery("#adobe-instructions-modal > li.prev").addClass("disabled");
    }
};
jQuery("#adobe-instructions-modal li.next a").click(function () {
    var elem = jQuery('*[data-current-instruction="true"');
    if (elem.data("next-step")) {
        var nextElem = jQuery("#" + elem.data("next-step"));
        elem.hide("fast");
        delete elem[0].dataset.currentInstruction;
        console.log(nextElem);
        nextElem.show("slow");
        nextElem[0].dataset.currentInstruction = "true";
        //set up the next/prev steps
        enablePaginationButtons(nextElem);
    }
});
jQuery("#adobe-instructions-modal li.previous a").click(function () {
    var elem = jQuery('*[data-current-instruction="true"');
    if (elem.data("prev-step")) {
        var prevElem = jQuery("#" + elem.data("prev-step"));
        elem.hide("fast");
        delete elem[0].dataset.currentInstruction;
        prevElem.show("fast");
        nextElem[0].dataset.currentInstruction = "true";
        //set up the next/prev steps
        enablePaginationButtons(prevElem);
    }
});
$('#adobe-instructions-modal').on('shown.bs.modal', function () {
    console.log("modal open");
    var imgs = $('#adobe-instructions-modal img');
    //change src from the transparent GIF to the actual source on modal open
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].getAttribute('data-src')) {
            imgs[i].setAttribute('src', imgs[i].getAttribute('data-src'));
        }
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
