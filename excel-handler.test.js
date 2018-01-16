var excel = require('./excel-handler.js');
var excelbuilder = require('./assets/js/msexcel-builder.js');


var workbook = excelbuilder.createWorkbook("./", 'test.xlsx');

test("brief sanity check", () => {
	expect(1 + 1).toBe(2);
});

test("test worksheet creation", () => {
	expect(workbook).toBeDefined();
	console.log(workbook);
});

test("test worksheet creation", () => {
	var newSheet = workbook.createSheet("demo sheet", 3, 3);
	console.log(newSheet);
	expect(newSheet).toBeDefined();
});


test("empty new sheet is created with correct name", () => {
	let emptyName = "empty sheet";
	let ws = excel._makeNewSheet(workbook, [["empty name test"]], emptyName);
	console.log(ws);
	expect(ws.name).toEqual(emptyName);
	expect(excel._getSheets()[emptyName]).toBeDefined();
	expect(excel._getSheets()[emptyName].dimensions).toEqual({'rows':1, 'columns':1});
});

test("sheet dimension measurements are accurate", () => {
	expect(excel._getDimensionsForNewSheet([[]])).toEqual({'rows':1, 'columns':1});
	expect(excel._getDimensionsForNewSheet([[0,2]])).toEqual({'rows':1, 'columns':2});
	expect(excel._getDimensionsForNewSheet([[0],[1]])).toEqual({'rows':2, 'columns':1});
	expect(excel._getDimensionsForNewSheet([[0, 1],[2]])).toEqual({'rows':2, 'columns':2});
	expect(excel._getDimensionsForNewSheet([[0],[1,2]])).toEqual({'rows':2, 'columns':2});
});

test("sheet dimensions are accurate", () => {
	expect(excel._getDimensionsForNewSheet([[]])).toEqual({'rows':1, 'columns':1});
	expect(excel._getDimensionsForNewSheet([[0,2]])).toEqual({'rows':1, 'columns':2});
	expect(excel._getDimensionsForNewSheet([[0],[1]])).toEqual({'rows':2, 'columns':1});
	expect(excel._getDimensionsForNewSheet([[0, 1],[2]])).toEqual({'rows':2, 'columns':2});
	expect(excel._getDimensionsForNewSheet([[0],[1,2]])).toEqual({'rows':2, 'columns':2});
});

/*
test("array construction", () => {
	populate_sheet_from_array_of_arrays
});
*/

test("border construction - rejects improper input", () => {
	let style = {bottom:'thin'};
	let ws = excel._makeNewSheet(workbook, [["empty name test"],[0]], "border improper");
	console.log(ws);
	expect(() => {
		excel._setBorder(ws, style, '', 4);
	}).toThrow("no startLocation present");
	expect(() => {
		excel._setBorder(ws, style, [1], 4);
	}).toThrow("startLocation dimensions are wrong");
	expect(() => {
		excel._setBorder(ws, style, [1,1], 4);
	}).toThrow("startLocation dimensions are wrong");
});

test("border construction - method overloading works", () => {
	let style = {bottom:'thin'};
	let ws = excel._makeNewSheet(workbook, [["empty name test",'1','2'],['border','0','1']], "border overloading");
	excel._setBorder(ws, style, {row:1,colummn:1}, 2);
	excel._setBorder(ws, style, [3,1], 1);
});

/*
test("border construction - length", () => {
	let style = {bottom:'thin'};
	let ws = excel._makeNewSheet(workbook, [["empty name test",'1','2'],['border','0','1']], "border length");
	excel._setBorder(ws, style, {row:1,colummn:1}, 2);
	excel._setBorder(ws, style, [3,1], 1);
});
*/
