var excel = require('./excel-helpers.js');
var excelbuilder = require('./assets/js/msexcel-builder.js');
var workbook = excelbuilder.createWorkbook("./", 'test.xlsx');

test("brief sanity check", () => {
	expect(1 + 1).toBe(2);
});

test("test worksheet creation", () => {
	expect(workbook).toBeDefined();
});

test("test manual worksheet creation", () => {
	var newSheet = workbook.createSheet("demo sheet", 2, 2);
	expect(newSheet).toBeDefined();
	expect(newSheet.name).toEqual("demo sheet");
});

test("empty new sheet is created with correct name", () => {
	let emptyName = "test new sheet const";
	var ws = excel.makeNewSheet(workbook, [[0, 1], [3]], emptyName);
	//check creation
	expect(ws.name).toEqual(emptyName);
	expect(excel.getSheets()[emptyName]).toBeDefined();
	expect(excel.getSheets()[emptyName].dimensions).toEqual({'rows':2, 'columns':2});
	//verify reasonableColumnWidths were set
	//expect(ws.col_wd);
});

test("empty new sheet is created and populated", () => {
	let emptyName = "populated new sheet";
	let arr = [[0, 1], [2, 3]];
	var ws = excel.makeNewSheet(workbook, arr, emptyName, true);
	//check creation
	expect(ws.name).toEqual(emptyName);
	expect(excel.getSheets()[emptyName]).toBeDefined();
	expect(excel.getSheets()[emptyName].dimensions).toEqual({'rows':2, 'columns':2});
	//check population
	let row1 = Object.keys(ws.data[1]).map(e => ws.data[1][e]);
	let row2 = Object.keys(ws.data[2]).map(e => ws.data[2][e]);
	let compArray = [row1, row2];
	const expectedArray = [
		[{"dataType": "number", "v":0}, {"dataType": "number", "v":1}],
		[{"dataType": "number", "v":2}, {"dataType": "number", "v":3}]
	];
	expect(compArray).toEqual(expectedArray);
	let reducedCompArray = compArray.map(x => x.map(y => y.v));
	expect(reducedCompArray).toEqual(arr);
});

test("sheet dimension measurements are accurate", () => {
	expect(excel.getDimensionsForNewSheet([[]])).toEqual({'rows':1, 'columns':1});
	expect(excel.getDimensionsForNewSheet([[0,2]])).toEqual({'rows':1, 'columns':2});
	expect(excel.getDimensionsForNewSheet([[0],[1]])).toEqual({'rows':2, 'columns':1});
	expect(excel.getDimensionsForNewSheet([[0, 1],[2]])).toEqual({'rows':2, 'columns':2});
	expect(excel.getDimensionsForNewSheet([[0],[1,2]])).toEqual({'rows':2, 'columns':2});
});

test("sheet dimensions are accurate", () => {
	expect(excel.getDimensionsForNewSheet([[]])).toEqual({'rows':1, 'columns':1});
	expect(excel.getDimensionsForNewSheet([[0,2]])).toEqual({'rows':1, 'columns':2});
	expect(excel.getDimensionsForNewSheet([[0],[1]])).toEqual({'rows':2, 'columns':1});
	expect(excel.getDimensionsForNewSheet([[0, 1],[2]])).toEqual({'rows':2, 'columns':2});
	expect(excel.getDimensionsForNewSheet([[0],[1,2]])).toEqual({'rows':2, 'columns':2});
});

test("array construction", () => {
	var newSheet = workbook.createSheet("array population", 3, 3);
	let arr = [ [0,1,2],[3,4,5],[6,7,8] ];
	const expectedArray = [
		[{"dataType": "number", "v":0}, {"dataType": "number", "v":1}, {"dataType": "number", "v":2}],
		[{"dataType": "number", "v":3}, {"dataType": "number", "v":4}, {"dataType": "number", "v":5}],
		[{"dataType": "number", "v":6}, {"dataType": "number", "v":7}, {"dataType": "number", "v":8}]
	];
	let updatedSheet = excel.populate_sheet_from_array_of_arrays(newSheet, arr);
	let row1 = Object.keys(updatedSheet.data[1]).map(e => updatedSheet.data[1][e]);
	let row2 = Object.keys(updatedSheet.data[2]).map(e => updatedSheet.data[2][e]);
	let row3 = Object.keys(updatedSheet.data[3]).map(e => updatedSheet.data[3][e]);
	let compArray = [row1, row2, row3];
	expect(compArray).toEqual(expectedArray);
	let reducedCompArray = compArray.map(x => x.map(y => y.v));
	expect(reducedCompArray).toEqual(arr);
});

test("array construction - styles", () => {
	var newSheet = workbook.createSheet("array population styles", 3, 3);
	var style = {"fill": { type: 'solid', fgColor: 'DDDDDD'}};
	var arr = [ [{"style":style, "value":0},1,2],[3,{"style":style, "value":4},5],[6,7,{"style":style, "value":8}] ];
	var strippedArr = arr.map(x => x.map(function(y){ if (y.hasOwnProperty('value')){return y['value'];} return y;}));
	const expectedArray = [
		[{"dataType": "number", "v":0}, {"dataType": "number", "v":1}, {"dataType": "number", "v":2}],
		[{"dataType": "number", "v":3}, {"dataType": "number", "v":4}, {"dataType": "number", "v":5}],
		[{"dataType": "number", "v":6}, {"dataType": "number", "v":7}, {"dataType": "number", "v":8}]
	];
	let updatedSheet = excel.populate_sheet_from_array_of_arrays(newSheet, arr);
	let row1 = Object.keys(updatedSheet.data['1']).sort().map(e => updatedSheet.data['1'][e]);
	let row2 = Object.keys(updatedSheet.data['2']).sort().map(e => updatedSheet.data['2'][e]);
	let row3 = Object.keys(updatedSheet.data['3']).sort().map(e => updatedSheet.data['3'][e]);
	let compArray = [row1, row2, row3];
	//types and values should remain the same as if no styles were applied
	expect(compArray).toEqual(expectedArray);
	let reducedCompArray = compArray.map(x => x.map(y => y.v));
	expect(reducedCompArray).toEqual(strippedArr);
	//styles should also be applied
	expect(updatedSheet.styles).toEqual({ fill_1_1: 2, fill_2_2: 2, fill_3_3: 2 });
});

test("apply style to entire sheet", () => {
	var newSheet = workbook.createSheet("style whole sheet", 2, 2);
	var style = {"fill": { type: 'solid', fgColor: 'DDDDDD'}};
	var arr = [ [1,2], [2,4]];
	let updatedSheet = excel.populate_sheet_from_array_of_arrays(newSheet, arr);
	excel.applyStylesToTheWholeSheet(updatedSheet, style);
	expect(updatedSheet.styles).toEqual({ fill_1_1: 1, fill_1_2: 1, fill_2_1: 1, fill_2_2: 1 });
	let fills = updatedSheet.book.st.mfills;
	//check if the fill color is correct
	expect(fills[1]).toEqual({'type': 'solid', fgColor: 'DDDDDD', 'bgColor': '-'});
});

test("border construction - rejects improper input", () => {
	let style = {bottom:'thin'};
	let ws = excel.makeNewSheet(workbook, [["empty name test"],[0]], "border improper");
	expect(() => {
		excel.setBorder(ws, style, '', 4);
	}).toThrow("no startLocation present");
	expect(() => {
		excel.setBorder(ws, style, [1], 4);
	}).toThrow("startLocation dimensions are wrong");
	//this should not throw any error
	excel.setBorder(ws, style, [1,1], 4);
});

test("border construction - method overloading works", () => {
	let style = {bottom:'thin'};
	let ws = excel.makeNewSheet(workbook, [["empty name test",'1','2'],['border','0','1']], "border overloading");
	excel.setBorder(ws, style, {row:1,column:1}, 2);
	excel.setBorder(ws, style, [3,1], 1);
	console.log(ws.styles);
});

test("border construction - length", () => {
	let style = {bottom:'thin'};
	let ws = excel.makeNewSheet(workbook, [["empty name test",'1','2'],['border','0','1']], "border length");
	excel.setBorder(ws, style, {row:1,column:2}, {'long':3});
	//expect(ws.sheet.style).toEqual({bder_1_3:2, bder_2_3:2, bder_3_3: 2});
	console.log(ws.styles);
	excel.setBorder(ws, style, {row:3,column:1}, {'tall':2});
	console.log(ws.styles);
});

test("setRowHeights", () => {
	let ws = excel.getSheets()["border length"];
	let defaultHeight = 8;
	excel.setRowHeights(ws.dimensions, ws.sheet, defaultHeight);
	expect(ws.sheet.row_ht).toEqual({'1': defaultHeight, '2': defaultHeight});
});

test("setRowHeights - firstRowHeight", () => {
	let ws = excel.getSheets()["border overloading"];
	let defaultHeight = 8;
	let firstHeight = 12;
	excel.setRowHeights(ws.dimensions, ws.sheet, defaultHeight, firstHeight);
	expect(ws.sheet.row_ht).toEqual({'1': firstHeight, '2': defaultHeight});
});

test("setColumnWidths", () => {
	let ws = excel.getSheets()["border overloading"];
	let defaultWidth = 21;
	excel.setColumnWidths(ws.dimensions, ws.sheet, defaultWidth);
	console.log(ws.sheet);
});

test("setColumnWidths with first column", () => {
	let ws = excel.getSheets()["border overloading"];
	let defaultWidth = 22;
	let firstWidth = 12;
	excel.setColumnWidths(ws.dimensions, ws.sheet, defaultWidth, firstWidth);
	console.log(ws.sheet);
});

