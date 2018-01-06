var grader = {};
var adobeAPI = require('adobe-api-helpers');

grader.s_code = function(url){
  //maybe read in the s_code somehow and analyze that too?
//probably this would be server-side, I'd guess with PhantomJS or something in Lambda
//this is because of the difficulty of examining the s_code sitting within DTM or similar.
//or just examine the s object rather than the code itself
//still tells us all we need to know, and can be done trivially in Phantom
//see https://github.com/cjdd3b/lambda-screenshot for an example
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