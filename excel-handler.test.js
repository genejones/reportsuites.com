var excel = require('./excel-handler.js');
var excelbuilder = require('./assets/js/msexcel-builder.js');
var workbook = excelbuilder.createWorkbook("./", 'test.xlsx');

test("brief sanity check", () => {
	expect(1 + 1).toBe(2);
});