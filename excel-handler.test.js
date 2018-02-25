var excel = require('./excel-handler.js');
var excelbuilder = require('./assets/js/msexcel-builder.js');
var workbook = excelbuilder.createWorkbook("./", 'test.xlsx');

test("sanity check", () => {
	expect(1 + 1).toEqual(2);
});