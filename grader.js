var grader = {};
var adobeAPI = require('adobe-api-helpers');
var union = require('lodash/union');
var keys = require('lodash/keys');

grader.s_code = function(url){
  //maybe read in the s_code somehow and analyze that too?
//probably this would be server-side, I'd guess with PhantomJS or something in Lambda
//this is because of the difficulty of examining the s_code sitting within DTM or similar.
//or just examine the s object rather than the code itself
//still tells us all we need to know, and can be done trivially in Phantom
//see https://github.com/cjdd3b/lambda-screenshot for an example
};

grader.processData = function(){
	let evars = mapToNameValuePairs(evarArray, 'evars');
	let props = mapToNameValuePairs(propArray, 'props');
	let events = mapToNameValuePairs(eventArray, 'events');
}

grader.getRSID = function(){
	rsids = JSON.parse(localStorage.getItem('rsids')) || getRsidType();
	grader.rsids = rsids;
};

grader.getData = function(arr){
	//determine how many variables aren't setup
	for (var i=0; i<arr.length; i++){
		
	}
};

function mapToNameValuePairs(array, nameofVarSlot){
	var rsid_mapping = {};
	for (var i=0; i<array.length; i++){
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

grader.report_suite = function(username, pass){
  var reportsuites = getListOfReportSuites(function(err, reportsuites){
    if (err){
      //report on this
    }
    else {
      //do whatever
    }
  });
};

