var client = require('./client-handler.js');
var expectedValues = require('./__mocks__/expected-values.js').modules;
var htmlSnippets = require('./__mocks__/html-segments-for-client.js');

test("full selection of reportsuites", () => {
	document.body.innerHTML = htmlSnippets.displaySystem + htmlSnippets.rsSelectAll;
	let formData = client.handleUserSelectionOfRSID();
	expect(formData).toEqual(expectedValues.selectedFormDataAll);
});

test("partial selection of reportsuites", () => {
	document.body.innerHTML = htmlSnippets.displaySystem + htmlSnippets.rsSelectSome;
	let formData = client.handleUserSelectionOfRSID();
	expect(formData).toBe(expectedValues.selectedFormDataPartial);
});

test("check hash", () => {
	let hashedValue = client._getHash("bobIsSpyingOnAlice");
	expect(hashedValue).toEqual("8163516d345499ce4db43bba611b8a0019ab77163c9a85f8b0803c962035a736");
});

//add error display

//add progress display

//add complete work flow (from RS selection)

//add complete work flow (start to finish)