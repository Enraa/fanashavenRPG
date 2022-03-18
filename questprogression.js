// questprogression.js
//
// This library will do functions that can take a quest step as input and return the next quest step in the chain. 
// It will read from a JSON file to determine the next quest step, which can then be used in a second function to return
// data from the same JSON file. 

const Discord = require('discord.js');
const fs = require('fs');
var dbadmin = require('firebase-admin')

var dbserviceaccount = require('./keys/fanashaven-firebase-adminsdk-4888m-7ec8ca94c4.json');
dbadmin.initializeApp({
    credential: dbadmin.credential.cert(dbserviceaccount),
    databaseURL: "https://fanashaven-default-rtdb.firebaseio.com"
});

// This is the database object we can call our lookup and put functions on. 
var db = dbadmin.database();

// Gets the next step by reading the JSON file at the step provided, then taking the choice and player attributes into account. 
// In *most* cases, this will return a +10 increment on the quest stage, which will be returned. 
function nextStep(queststep,choice,playerid) {
    if (false == true) {

    }
    else { // If nothing happens from the JSON file, then return +10
        return
    }
}
// Given a player ID, this will save the full path of the json given for choices. This will additionally verify if it exists
// and use the update method instead if it does. 
function saveVariable(player,json) {

}
// Retrieves the current player object in the database. 
function player(playerid) {
    let ref = db.val(`/players/${playerid}`);
    ref.once('value', (data) => {
        return data.val();
    })
}