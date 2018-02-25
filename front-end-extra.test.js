var htmlSnippets = require('./__mocks__/html-segments-for-frontend.js');
const modal_at_step_1 = htmlSnippets.modal_at_step_1;
const modal = htmlSnippets.modal;
var front = require('./front-end-extras.js');

test("next page", done => {
	document.body.innerHTML = modal;
	//disable animations to increase speed of this test
	jQuery.fx.off = true;
	
	let first_activeElem = jQuery('*[data-current-instruction="true"]')[0];
	expect(first_activeElem.id).toEqual("cred-instructions-0");
	
	front.advanceForwards();
	let test_page_change = function(){
		let activePages = jQuery('*[data-current-instruction="true"]');
		expect(activePages.length).toBe(1);
		let activeElem = activePages[0];
		expect(activeElem.id).toEqual("cred-instructions-1");
		done();
	}
	setTimeout(test_page_change, 100);
});

test("previous page", done => {
	document.body.innerHTML = modal_at_step_1;
	//disable animations to increase speed of this test
	jQuery.fx.off = true;
	
	let first_activeElem = jQuery('*[data-current-instruction="true"]')[0];
	expect(first_activeElem.id).toEqual("cred-instructions-1");
	
	front.advanceBackwards();
	let test_page_change = function(){
		let activePages = jQuery('*[data-current-instruction="true"]');
		expect(activePages.length).toBe(1);
		let activeElem = activePages[0];
		expect(activeElem.id).toEqual("cred-instructions-0");
		done();
	}
	setTimeout(test_page_change, 100);
});

test("disable when no more prior pages", done => {
	document.body.innerHTML = modal_at_step_1;
	//disable animations to increase speed of this test
	jQuery.fx.off = true;
	
	let first_activeElem = jQuery('*[data-current-instruction="true"]')[0];
	expect(first_activeElem.id).toEqual("cred-instructions-1");
	
	front.advanceBackwards();
	
	let test_page_change = function(){
		let activePages = jQuery('*[data-current-instruction="true"]');
		expect(activePages.length).toBe(1);
		let activeElem = activePages[0];
		expect(activeElem.id).toEqual("cred-instructions-0");
		expect(document.querySelector("li.previous").classList ).toContain("disabled");
		done();
	}
	setTimeout(test_page_change, 300);
});

test("disable when no more forward pages", done => {
	document.body.innerHTML = modal_at_step_1;
	//disable animations to increase speed of this test
	jQuery.fx.off = true;
	
	let first_activeElem = jQuery('*[data-current-instruction="true"]')[0];
	expect(first_activeElem.id).toEqual("cred-instructions-1");
	
	front.advanceForwards();
	
	let test_page_change = function(){
		let activePages = jQuery('*[data-current-instruction="true"]');
		expect(activePages.length).toBe(1);
		let activeElem = activePages[0];
		console.log(activeElem.id);
		expect(activeElem.id).toEqual("cred-instructions-2");
		expect(document.querySelector("li.next").classList).toContain("disabled");
		done();
	}
	setTimeout(test_page_change, 300);
});

test("load instruction images", done => {
	document.body.innerHTML = modal;
	
	const transparentImage = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
	let imgs = document.getElementsByTagName('img');
	for (var i=0; i<imgs.length; i++){
		expect(imgs[i].getAttribute('src')).toEqual(transparentImage);
	}
	
	front.loadInstructionImages();
	
	let test_page_change = function(){
		let imgs = document.getElementsByTagName('img');
		for (var i=0; i<imgs.length; i++){
			expect(imgs[i].getAttribute('src')).toEqual(i + '.jpg');
		}
		done();
	}
	setTimeout(test_page_change, 100);
});