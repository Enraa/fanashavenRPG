// interactionfunctions.js
//
// This js file will contain all of our functions to generate buttons and lists, such that we can simply say
// interactionfunctions.buttonlist("whichdoor!","Left Door","Right Door","Ahead")
// And return an interaction object that provides these things. 

const Discord = require('discord.js');

// We can pass any number of buttons from 1 to 4. We will reduce the buttons object and use the first four buttons. 
// This will return an array that can be fed into "components:" on a Discord message. 
// Interactions will be tagged with the first param supplied to this function. We can mark and disable buttons accordingly. 
function buttonlist(playerparam, ...buttons) {
    var buttonsfromargs = buttons;
    var buttonlist = [];
    var count = 1;
    // We have at least one button
    if (buttonsfromargs.length > 0) {
        buttonsfromargs.forEach((thisbutton) => {
            // Buttons beyond 4 will be truncated, so we can have the back button. 
            if (buttonlist.length < 4) {
                buttonlist.push({
                    type: 2,
                    label: thisbutton,
                    style: 1,
                    customId: `${playerparam}_choice${count}`
                })
                count++;
            }
        })
    }
    // Add the back button, which will undo one event in the user's history. This will also ensure our button array always returns at least one button. 
    buttonlist.push({
        type: 2,
        label: "↩ Back",
        style: 4,
        customId: `backbutton`
    })
    var returnarray = [{
        type: 1,
        components: buttonlist
    }]
    return returnarray;
}
// We can pass any number of list variables up to 25. The difference is, this list must have at least one object, as there won't be a default.
// This will return an array that can be fed into "components:" on a Discord message. 
// Interactions will be tagged with the first param supplied to this function. We can mark and disable the list accordingly. 
function choicelist(playerparam, ...choices) {
    var choicesfromargs = choices;
    var choicelist = [];
    var count = 1;
    // We have at least one button
    if (choicesfromargs.length > 0) {
        choicesfromargs.forEach((thisbutton) => {
            let tempbutton = thisbutton;
            if (Array.isArray(tempbutton) != true) { // We supplied a string
                tempbutton = [thisbutton, thisbutton]; // Convert it to a two part array
            }
            console.log(tempbutton);
            // Buttons beyond 4 will be truncated, so we can have the back button. 
            if (choicelist.length < 25) {
                choicelist.push({
                    label: tempbutton[0],
                    description: tempbutton[1],
                    value: `${playerparam}_choice${count}`
                })
                count++;
            }
        })
    }
    var returnarray = [
        {
            type: 1,
            components: [
                {
                    type: 3,
                    customId: playerparam,
                    options: choicelist
                }
            ]
        }
    ]
    return returnarray;
}
// This will provide a "Next" button. 
// This will return an array that can be fed into "components:" on a Discord message. 
// Interactions will be tagged with the first param supplied to this function. We can mark and disable the button accordingly. 
function next(playerparam) {
    var returnarray = [{
        type: 1, 
        components: [{
            type: 2,
            label: "Next",
            style: 1,
            customId: playerparam
        }]
    }]
    return returnarray;
}
// This will take a message from a buttoninteraction and return a message object with the chosen choice marked green and all buttons disabled. 
// This can directly be used in a .send function to validate and disable a button. 
function chooseButton(buttonInteraction) {
    var msg = buttonInteraction.message
    msg.components[0].components.forEach((component) => {
        console.log(component);
        var index = msg.components[0].components.indexOf(component)
        if (component.customId == buttonInteraction.customId) { // This choice was chosen
            msg.components[0].components[index].style = "SUCCESS"
        }
        else {
            msg.components[0].components[index].style = "SECONDARY"
        }
        msg.components[0].components[index].disabled = true;
    })
    var returnmsg = {
        reference: msg.reference,
        content: msg.content,
        components: msg.components,
    }
    return returnmsg
}
// This will take a message from a Listinteraction and return a message object with the chosen choice marked green and all buttons disabled. 
// This can directly be used in a .send function to validate and disable a button. 
function chooseList(SelectMenuInteraction) {
    var msg = SelectMenuInteraction.message
    msg.components[0].components[0].disabled = true;
    var index = msg.components[0].components[0].options.findIndex((opt) => { return opt.value == SelectMenuInteraction.values[0] })
    msg.components[0].components[0].options[index].default = true;
    var returnmsg = {
        reference: msg.reference,
        content: msg.content,
        components: msg.components,
    }
    return returnmsg
}

exports.buttonlist = buttonlist;
exports.choicelist = choicelist;
exports.chooseButton = chooseButton;
exports.chooseList = chooseList;
exports.next = next;