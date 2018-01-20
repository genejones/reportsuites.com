var enablePaginationButtons = function (element) {
    if (element.data("nextStep")) {
        jQuery("#adobe-instructions-modal > li.next").removeClass("disabled");
    }
    else {
        jQuery("#adobe-instructions-modal > li.prev").addClass("disabled");
    }
    if (element.data("prevStep")) {
        jQuery("#adobe-instructions-modal > li.prev").removeClass("disabled");
    }
    else {
        jQuery("#adobe-instructions-modal > li.prev").addClass("disabled");
    }
};

jQuery("#adobe-instructions-modal li.next a").click(function () {
    var elem = jQuery('*[data-current-instruction="true"');
    if (elem.data("next-step")) {
        var nextElem = jQuery("#" + elem.data("next-step"));
        elem.hide("fast");
        delete elem[0].dataset.currentInstruction;
        console.log(nextElem);
        nextElem.show("slow");
        nextElem[0].dataset.currentInstruction = "true";
        //set up the next/prev steps
        enablePaginationButtons(nextElem);
    }
});

jQuery("#adobe-instructions-modal li.previous a").click(function () {
    var elem = jQuery('*[data-current-instruction="true"');
    if (elem.data("prev-step")) {
        var prevElem = jQuery("#" + elem.data("prev-step"));
        elem.hide("fast");
        delete elem[0].dataset.currentInstruction;
        prevElem.show("fast");
        nextElem[0].dataset.currentInstruction = "true";
        //set up the next/prev steps
        enablePaginationButtons(prevElem);
    }
});

$('#adobe-instructions-modal').on('shown.bs.modal', function () {
    console.log("modal open");
    var imgs = $('#adobe-instructions-modal img');
    //change src from the transparent GIF to the actual source on modal open
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].getAttribute('data-src')) {
            imgs[i].setAttribute('src', imgs[i].getAttribute('data-src'));
        }
    }
});