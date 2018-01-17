var sheets = {};

function populate_sheet_from_array_of_arrays(sheet, array) {
	for (var i=0; i<array.length; i++){
		var row = array[i];
		for (var j=0; j<row.length; j++){
			var cell = row[j];
			cellProps = {
				'set': cell.value,
			};
			if (typeof(cell) !== 'object'){
				cellProps.set = cell;
			}
			else{
				if (cell.style){
					for (var prop in cell.style){
						if (cell.style.hasOwnProperty(prop)){
							cellProps[prop] = cell.style[prop];
						}
					}
				}
			}
			if (cellProps.set !== undefined && cellProps.set !== "" ){
				//the column/rows is switched from what you might think, j (column) goes first
				sheet.set(j + 1, i + 1, cellProps);
			}
			//we do not set undefined values
		}
	}
	return sheet;
}

function getDimensionsForNewSheet(array){
	var rows = array.length;
	var columns = 1;
	for (var i=0; i<array.length; i++){
		var row = array[i];
		var rowLength = row.length;
		if (rowLength > columns){columns = rowLength;}
	}
	return {'rows':rows, 'columns':columns};
}

function makeNewSheet(workbook, array, name){
	dimensions = getDimensionsForNewSheet(array);
	//console.log(name + " " + JSON.stringify(dimensions));
	var newSheet = workbook.createSheet(name, dimensions.columns, dimensions.rows);
	setReasonableColumnWidths(dimensions, newSheet);
	sheets[name] = {sheet:newSheet, dimensions:dimensions};
	return newSheet;
}

function applyStylesToTheWholeSheet(sheetObj, styleObj){
	let cols = sheetObj.dimensions.columns;
	let rows = sheetObj.dimensions.columns;
	let sheet = sheetObj.sheet;
	for (var col=1; col<=cols; col++){
		for (var row=1; row<=rows; row++){
			if (styleObj.hasOwnProperty("font")){
				sheet.font(col, row, styleObj.font);
			}
			if (styleObj.hasOwnProperty("border")){
				sheet.border(col, row, styleObj.font);
			}
			if (styleObj.hasOwnProperty("fill")){
				sheet.fill(col, row, styleObj.font);
			}
		}
	}
}

function setReasonableColumnWidths(dimensions, worksheet){
	//by default, the column width will be only 8.43, or 64 pixels.
	//this is pretty miserable to work with
	//a more reasonable value is a width of 20
	//with the first column in a file always being shorter, at 15
	setColumnWidths(dimensions, worksheet, 20, 15);
}

function setColumnWidths (dimensions, worksheet, defaultWidth, firstWidth){
	for (var i=0; i<dimensions.columns; i++){
		if (i === 0 && firstWidth >= 0){
			worksheet.width(i+1, firstWidth);
		}
		else{
			worksheet.width(i+1, defaultWidth);
		}
	}
}

function setRowHeights (dimensions, worksheet, defaultHeight, firstHeight){
	for (var i=0; i<dimensions.rows; i++){
		if (i === 0 && firstHeight >= 0){
			worksheet.height(i+1, firstHeight);
		}
		else{
			worksheet.height(i+1, defaultHeight);
		}
	}
}

function setBorder(sheet, style, startLocation, direction){
	if (Array.isArray(startLocation)){
		//do some overload detection - if an array with two elements exists
		if (startLocation.length === 2){
			// then it is [x,y] and we convert to a property
			var x = startLocation[0];
			var y = startLocation[1];
			startLocation = {column:y, row:x};
		}
		else {
			throw ("startLocation dimensions are wrong");
		}
	}
	else{
		if (startLocation.hasOwnProperty('column') && startLocation.hasOwnProperty('row')) {
			startLocation = {column:y, row:x};
		}
		else{
			throw ("no startLocation present");
		}
	}
	var column = startLocation.column;
	var row = startLocation.row;
	//direction gives us up or down, and length. For example, {long:5}
	if (typeof(direction) === 'number'){
		//we do some overloading, if direction is a number we just assume length
		direction = {'long':direction};
	}
	if (direction.hasOwnProperty('long')){
		var length = direction.long - 1;
		for (let i=column; i<length+column; i++){
			sheet.border(i,row,style);
		}
	}
	else {if (direction.hasOwnProperty('tall')){
		var height = direction.height - 1;
		for (let i=row; i<height+row; i++){
			sheet.border(row,i,style);
		}
	}}
}

function getSheets(){
	return sheets;
}

module.exports = {
	getDimensionsForNewSheet : getDimensionsForNewSheet,
	makeNewSheet : getDimensionsForNewSheet,
	applyStylesToTheWholeSheet : applyStylesToTheWholeSheet,
	setBorder : setBorder,
	getSheets: getSheets
};