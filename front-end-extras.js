function enablePaginationButtons (element) {
    if (element.dataset.nextStep) {
        jQuery("#adobe-instructions-modal ul.pagination li.next.disabled").removeClass("disabled");
    }
    else {
        jQuery("#adobe-instructions-modal ul.pagination li.next").addClass("disabled");
    }
    if (element.dataset.prevStep) {
        jQuery("#adobe-instructions-modal ul.pagination li.previous.disabled").removeClass("disabled");
    }
    else {
        jQuery("#adobe-instructions-modal ul.pagination li.previous").addClass("disabled");
    }
};

function advanceForwards(event = undefined) {
    let elem = document.querySelector('[data-current-instruction="true"]');
	let nextStepID = elem.dataset.nextStep;
    if (nextStepID) {
        let nextElem = document.getElementById(nextStepID);
        jQuery(elem).hide("fast");
        delete elem.dataset.currentInstruction;
        jQuery(nextElem).show("slow");
        nextElem.dataset.currentInstruction = "true";
        //set up the next/prev steps
        enablePaginationButtons(nextElem);
    }
	else{
		console.log("no selected page");
	}
};
jQuery("#adobe-instructions-modal li.next a").click(advanceForwards);

function advanceBackwards(event = undefined) {
	let elem = document.querySelector('[data-current-instruction="true"]');
	let previousStepID = elem.dataset.prevStep;
    if (previousStepID) {
        let prevElem = document.getElementById(previousStepID);
        jQuery(elem).hide("fast");
        delete elem.dataset.currentInstruction;
        jQuery(prevElem).show("slow");
        prevElem.dataset.currentInstruction = "true";
        //set up the next/prev steps
        enablePaginationButtons(prevElem);
    }
	else{
		console.log("no selected page");
	}
};
jQuery("#adobe-instructions-modal li.previous a").click(advanceBackwards);

/*
The initial instruction images are transparent 1x1 (43 byte) GIF data-uri images.
This is to lower the page loading time.
We lazy load the correct URLs using an attribute called 'data-src'
*/
function loadInstructionImages() {
	if (window.omnibus.front.imagesLoaded !== true){
		window.omnibus.front.imagesLoaded = true;
		dataLayer.push({'event': 'instructionModalOpen'});
		var imgs = $('#adobe-instructions-modal img');
		//change src from the transparent GIF to the actual source on modal open
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].getAttribute('data-src')) {
				imgs[i].setAttribute('src', imgs[i].getAttribute('data-src'));
			}
		}
	}
};
$('#adobe-instructions-modal').on('shown.bs.modal', loadInstructionImages);

/*
We need to cleanly 
*/

module.exports = {advanceForwards, advanceBackwards, loadInstructionImages, enablePaginationButtons, imagesLoaded:false};