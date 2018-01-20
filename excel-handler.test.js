var excel = require('./excel-handler.js');
var excelbuilder = require('./assets/js/msexcel-builder.js');
var workbook = excelbuilder.createWorkbook("./", 'test.xlsx');

var expectedValues = require('./__mocks__/expected-values.js').modules;

test("name value pair creation", () => {
	let props = excel._mapToNameValuePairs(expectedValues.props, 'props');
	
	expect(Object.keys(props)).toEqual(["illuminati2014global","illuminati2014en","illuminati2012de"]);
	expect(Object.keys(props.illuminati2014global)).toEqual(["prop1", "prop2", "prop3"]);
});