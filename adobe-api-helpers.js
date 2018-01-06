var currentTokenWSSE = '';
var wsse = require('wsse');

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
			callback(false, report_suites);
		}
		else{
			console.log(res.statusCode);
			callback(err, null);
		}
	    
  });
};

var exports = module.exports = {};
exports.getHeaders = getHeaders;
exports.getNewAuthToken = getNewAuthToken;
exports.getListOfReportSuites = getListOfReportSuites;