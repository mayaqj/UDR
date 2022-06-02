// MAIN STUFF
console.log("HEYYY");

// Find all radios and add EventListener triggering showHide(), passing the radio ID as the argument
radios = document.querySelectorAll("input[type='radio'], input[type='checkbox']");
for (const radio of radios) {
    radio.setAttribute("onChange", `showHide(${radio.id})`);
}

function showHide(radID) {
    // Get only the inputs that share the name of the clicked input
    let radGroup = document.querySelectorAll(`.udr-form input[type="radio"][name="${radID.name}"]`);
    
    // (for checkbox triggers)
    //onlyOneChoice(radID, radGroup);

    // the span that matches the radio group
    var spanID = radID.name + '_toggle';

    // If the current input is a trigger, show span if checked, hide if unchecked
    if (radID.className == 'trigger') {
        if (radID.checked) { spanShow(spanID); }
        else { spanHide(spanID); }
    }

    // if current input is not a trigger but has one its group, hide the span
    else {
        var trigger = document.querySelectorAll(`.udr-form input[class="trigger"][name="${radID.name}"]`);
        if (trigger.length > 0 ) { spanHide(spanID); }
    }
}


// [ Required Fields ] 
// set all non-optional radio/checkboxes to be required, based on group name/for attributes
formChoiceLabels = document.querySelectorAll('.udr-form p[for]');
for (const label of formChoiceLabels) {
    if (!label.classList.contains('optional')) {
        // get the for= (aka group) name for the input group
        let groupName = label.getAttribute('for');
        // get inputs that share the group name, set required to true
        let groupInputs = document.querySelectorAll(`input[name="${groupName}"][type="radio"]`);
        for (const input of groupInputs) {input.required = true;}
    }
}


// [ Validate on Submit Button ]
// for each hidden input, disable it to avoid validation errors
function validateSubmit() {
    document.querySelectorAll('.udr-form .fs-hidden input').forEach(
        function (input) { input.disabled = true; }
    )
}


// SUPPORTING FUNCTIONS
// ====================
function spanShow(spanID) {
    document.getElementById(spanID).classList.add('fs-visible');
    document.getElementById(spanID).classList.remove('fs-hidden');
}
function spanHide(spanID) {
    document.getElementById(spanID).classList.add('fs-hidden');
    document.getElementById(spanID).classList.remove('fs-visible');
}
function onlyOneChoice(radID,radGroup) {
    for (const input of radGroup) {
        if (input.id !== radID.id) { input.checked = false; }
    }
}