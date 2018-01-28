var union = require('lodash/union');
var keys = require('lodash/keys');
var FileSaver = require('file-saver');
var excelHelpers = require('./excel-helpers.js');

var styles = {
	'active' : {"fill": { type: 'solid', fgColor: '3D9970'}},
	'disabled': {"fill": {type: 'solid', fgColor: 'DDDDDD'}},
	'header': {"fill":{type:'solid', fgColor: '0074D9'}, "font":{color:"DDDDDD"} },
	'maroon-highlight': {"fill":{type:'solid', fgColor:'85144b'}, "font":{color:"FFFFFF"} },
	'grey-navy': {"fill":{type:'solid', fgColor:'DDDDDD'}, "font":{color:"001f3f"} },
	'grey-blue': {"fill":{type:'solid', fgColor:'DDDDDD'}, "font":{color:"001f3f"} }
};

var sheets = {};

function createSummarySheet(wb, report_suites, allAvailableReportSuites){
	var timeGeneratedAt = new Date();
	var timeGeneratedAtString = timeGeneratedAt.toLocaleString('en-US', {timeZoneName:'short'});
	var array = [ [{value:"Adobe Analytics Multi Reportsuite Configuration Report", "style":{font:{sz:18, bold:'true'}}}], [['']], ["Generated by Gene Jones's reportsuites.com"], ["Generated at " + timeGeneratedAtString] ];
	array.push(['']);
	array.push(['']);
	array.push(['']);
	if (report_suites.length === allAvailableReportSuites.length){
		array.push(["Reportsuites", "", "All available reportsuites for this account are listed."]);
	}
	else{
		array.push(["Reportsuites", "", "", "The portion of reportsuites for this account are listed."]);
	}
	
	array.push(['', {"value":"RSID"}, {"value":"Site Title"} ]);
	for (let i=0; i<report_suites.length; i++){
		array.push([[], {'value': report_suites[i].rsid, "style":{font:{iter:'true'}}}, {'value': report_suites[i].site_title, "style":{}}]);
	}
	if (report_suites.length !== allAvailableReportSuites.length){
		array.push(['']);
		array.push(['Non exported reportsuites', '', '', 'A list of reportsuites not included in this export.']);
		array.push(['', {"value":"RSID"}, {"value":"Site Title"} ]);
		for(let i=0; i<allAvailableReportSuites.length; i++){
			let isNotInSelectedSuites = true;
			for (let j=0; j<report_suites.length; j++){
				if (report_suites[j].rsid == allAvailableReportSuites[i].rsid){
					isNotInSelectedSuites = false;
					break;
				}
			}
			if (isNotInSelectedSuites){
				array.push([[], {'value': allAvailableReportSuites[i].rsid, "style":{font:{iter:'true'}}}, {'value': allAvailableReportSuites[i].site_title, "style":{}}]);
			}
		}
	}
	
	var sheet = excelHelpers.makeNewSheet(wb, array, "Summary", true);
	fileSummaryStyling(sheet);
	return sheet;
}

function fileSummaryStyling(ws){
	excelHelpers.applyStylesToTheWholeSheet(ws, styles['grey-navy']);
	ws.width(1, 38); //set the first column to be wider
	ws.width(2, 30);
	ws.width(3, 30);
	ws.width(4, 48);
	ws.height(1,27); //the first row should also be taller
	ws.merge({col:1, row:1},{col:5, row:1}); //be a merged cell
	//and have a border
	excelHelpers.setBorder(ws, {bottom:'thin'}, [1,1], 5);
}

var createOverviewOfSlot = function(report_suites, inputNVP, slotName, workbook){
	var outputArray = [];
	var firstRow = [[]];
	for (let i=0; i<report_suites.length; i++){
		firstRow.push({'value':report_suites[i].rsid, 'style':{font:{bold:'true'}, border:{bottom:'medium'}}});
	}
	outputArray.push(firstRow);
	var allKeys = []; //create a global list of keys for comparison
	for (let i=0; i<report_suites.length; i++){
		allKeys = union(allKeys, (keys(inputNVP[report_suites[i].rsid])) );
	}
	for (let i=0; i<allKeys.length; i++){
		var key = allKeys[i];
		var row = [key];
		for (var j=0; j<report_suites.length; j++) {
			if (key in inputNVP[report_suites[j].rsid]) {
				var varOfInterest = inputNVP[report_suites[j].rsid][key];
				var obj = {"value":varOfInterest.name};
				if (varOfInterest.enabled || (slotName==="events" && varOfInterest.type!="disabled")){
					obj.style = styles.active;
				}
				else{
					obj.style = styles.disabled;
				}
				row.push(obj);
			}
			else{
				row.push('');
			}
		}
		outputArray.push(row);
	}
	let ws = excelHelpers.makeNewSheet(workbook, outputArray, slotName, true);
};

var generateSummaryForReportSuite = function(report_suite, evars, props, events, workbook){
	var array = [];
	var columns = ["id", "name", "description", "type", "enabled", "expiration_type", "expiration_custom_days", "allocation_type", "default_metric", "participation", "serialization", "polarity", "visibility"];
	array.push(columns);
	var allVariables = [props, evars, events];
	var slotNames = ["props", "evars", "events"];
	for (let i=0; i<allVariables.length; i++){
		var slotName = slotNames[i];
		var vars = allVariables[i][report_suite];
		var allKeys = keys(vars);
		for (let j=0; j<allKeys.length; j++){
			var key = allKeys[j];
			var row = [];
			var varOfInterest = vars[key];
			for (let k=0; k<columns.length; k++){
				var column = columns[k];
				var obj = {};
				if (column in varOfInterest){
					obj.value = varOfInterest[column];
				}
				else{
					obj.value = 'N/A';
				}
				if (varOfInterest.enabled || (slotName==="events" && varOfInterest.type!="disabled")){
					obj.style = styles.active;
				}
				else{
					obj.style = styles.disabled;
				}
				row.push(obj);
			}
			array.push(row);
		}
	}
	
	var s = excelHelpers.makeNewSheet(workbook, array, report_suite);
	excelHelpers.populate_sheet_from_array_of_arrays(s, array);
};

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

function exportSiteCatToExcel(report_suites, allAvailableReportSuites, evarArray, propArray, eventArray, fileName, callback) {
	var workbook = excelbuilder.createWorkbook("./", fileName);
	console.log("creating a summary/export sheet");
	let summarySheet = createSummarySheet(workbook, report_suites, allAvailableReportSuites);
	
	let evars = mapToNameValuePairs(evarArray, 'evars');
	let props = mapToNameValuePairs(propArray, 'props');
	let events = mapToNameValuePairs(eventArray, 'events');
	
	console.log("creating tabs for evars, props, and events");
	createOverviewOfSlot(report_suites, evars, "evars", workbook);
	createOverviewOfSlot(report_suites, props, "props", workbook);
	createOverviewOfSlot(report_suites, events, "events", workbook);
	
	console.log("creating tabs for each report suite");
	for (let i=0; i<report_suites.length; i++){
		var rs = report_suites[i];
		generateSummaryForReportSuite(rs.rsid, evars, props, events, workbook);
	}
	
	let totalSheetsCreated = 1 + 3 + report_suites.length;
	summarySheet.set(1, 6, "This spreadsheet has " + totalSheetsCreated + " sheets.");
	
	workbook.generate(function(err, JSZip){
		if (err) return callback(err);
		
		JSZip.generateAsync({type: "blob", mimeType: 'application/vnd.ms-excel;'}).then(function (blob) {
			window.analytics.fileSize = blob.size;
			callback(true);
			FileSaver.saveAs(blob, fileName);
		});
	});
}

module.exports = {
	exportSiteCatToExcel,
	excelHelpers,
	_createSummarySheet : createSummarySheet,
	_fileSummaryStyling : fileSummaryStyling,
	_createOverviewOfSlot : createOverviewOfSlot,
	_generateSummaryForReportSuite : generateSummaryForReportSuite,
	_mapToNameValuePairs : mapToNameValuePairs,
	styles
};