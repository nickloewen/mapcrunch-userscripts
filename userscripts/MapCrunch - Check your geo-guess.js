// ==UserScript==

// @name            MapCrunch - Check your geo-guess
// @author          n loewen
// @description     Adds an input for map coordinates, and a button to open Google Maps directions from your MapCrunch starting point to those coordinates

// @updateURL       https://raw.githubusercontent.com/nickloewen/mapcrunch-userscripts/main/userscripts/MapCrunch%20-%20Check%20your%20geo-guess.js
// @version         2022.01.17.1
// @match           https://*.mapcrunch.com/*
// @run-at          document-idle

// ==/UserScript==


// SETUP

// Used to store the coordinates where a new streetview starts out,
// before the user changes their position:
let startingCoordinates = null;

function updateStartingCoordinates() {
    try {
        // `panorama` is provided by MapCrunch / streetview    
        startingCoordinates = panorama.location.latLng.lat()+','+panorama.location.latLng.lng();
        console.log('MC Check Guess - New panorama at', startingCoordinates);    
    } catch (e) {
        console.error(`MC Check Guess - Couldn't get coordinates from \`panorama.location\`. Continuing anyway, because the next panorama might work.`);
    }
}

updateStartingCoordinates(); // Get the coordinates for the homepage
G.event.addListener(map, "center_changed", updateStartingCoordinates); // Get future coordinates


// CREATE USER INTERFACE

// Text input
let guessInput = document.createElement('input');
guessInput.placeholder = "Guess coordinates";
// Make sure that typing in a location doesn't trigger a keyboard shortcut:
guessInput.addEventListener('keydown', (e) => event.stopPropagation());

// Submit button
let guessButton = document.createElement('button');
guessButton.innerHTML = "Check";
guessButton.className = "btn btn-facebook";
guessButton.type = "submit";
// The magic:
guessButton.addEventListener('click', () => window.open( `https://www.google.com/maps/dir/${startingCoordinates}/${guessInput.value}`) );

// Add the inputs to a form
// (So that pressing Enter in the input field will work as expected)
let guessForm = document.createElement('form');
guessForm.appendChild(guessInput);
guessForm.appendChild(guessButton);

// Add the form to the page
let buttons = document.getElementById('buttons'); // #buttons is provided by MapCrunch
buttons.appendChild(guessForm);


// A LITTLE CSS

// "MapCrunch - Minimal UI" makes this much nicer

guessForm.style.cssText = `display: inline-block;`;

guessInput.style.cssText = `
    margin-left: 40px;
    margin-right: 5px;
    vertical-align: middle;
    `;
