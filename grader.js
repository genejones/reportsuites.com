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
//maybe possible to do with JSHINT on page, getting the s_code dynamically?
};

grader.processData = function(){
	let evars = adobeAPI.mapToNameValuePairs(evarArray, 'evars');
	let props = adobeAPI.mapToNameValuePairs(propArray, 'props');
	let events = adobeAPI.mapToNameValuePairs(eventArray, 'events');
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

