// ==UserScript==

// @name            MapCrunch - Jump to map
// @author          n loewen
// @description     Adds a button that opens Google Maps at your current location, and another that opens Maps with directions to your current location, from where you started when you pressed "Go"

// @updateURL       https://raw.githubusercontent.com/nickloewen/mapcrunch-userscripts/main/userscripts/MapCrunch%20-%20Jump%20to%20map.js
// @version         2022.01.17.1
// @match           https://*.mapcrunch.com/*

// ==/UserScript==


// NB - Google Maps API documentation: https://developers.google.com/maps/documentation/urls/get-started

let globalStartingCoords = {lat: null, lng: null};
let globalEndingCoords   = {lat: null, lng: null};

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === "complete") {
        // console.log('page loaded :) ');
        updateStartingCoordinates();
        G.event.addListener(map, "center_changed", updateStartingCoordinates);
        insertButtons();
    }
});

function updateStartingCoordinates() {
    try {
        // `panorama` is provided by MapCrunch / streetview    
        globalStartingCoords.lat = panorama.location.latLng.lat();
        globalStartingCoords.lng = panorama.location.latLng.lng();
        console.log('MC Jump to map - New panorama at', startingCoordinates);    
    } catch (e) {
        console.error(`MC Jump to map - Couldn't get coordinates from \`panorama.location\`. Continuing anyway, because the next panorama might work.`);
    }
}

function buildGoogleMapsLocationURL() {
     // eg: https://www.google.com/maps/search/?api=1&query=47.5951518%2C-122.3316393
     return `https://www.google.com/maps/search/?api=1&query=${
         panorama.location.latLng.lat() }%2C${ panorama.location.latLng.lng() }`;
}

function buildGoogleMapsDirectionsURL() {
    // eg: https://www.google.com/maps/dir/?api=1&origin=47.62052847512178%2C-122.34918709521587&destination=47.60970882153664%2C-122.3421489788391
    return `https://www.google.com/maps/dir/?api=1&origin=${ 
        globalStartingCoords.lat }%2C${ 
        globalStartingCoords.lng }&destination=${ 
        panorama.location.latLng.lat() }%2C${ 
        panorama.location.latLng.lng() }`;
}

function insertButtons() {
    let mapCrunchButtons = document.getElementById('buttons');

    // Make MapCrunch's buttons div wider,
    // so that our buttons can be right-aligned
    mapCrunchButtons.style.width = "calc( 100% - 250px )"
    
    // Add our buttons
    let buttonContainer = document.createElement('div');
    buttonContainer.style = "float: right;";
    mapCrunchButtons.appendChild(buttonContainer);
    
    insertLocationButton(buttonContainer);
    insertDirectionsButton(buttonContainer);
}

function insertLocationButton(buttonContainer) {
    // Create button        
    let gmapsButton = document.createElement('button');
    gmapsButton.id = 'gmaps-location-button';
    gmapsButton.innerHTML = "Map";
    gmapsButton.className = "btn btn-facebook";
    gmapsButton.style.marginRight = "5px";

    // Insert button
    buttonContainer.appendChild(gmapsButton);
    
    // Handle button-clicking
    gmapsButton.addEventListener('click', (event) => {
        window.open( buildGoogleMapsLocationURL() );
    });
}

function insertDirectionsButton(buttonContainer) {
    // Create button
    let gmapsButton = document.createElement('button');
    gmapsButton.id = 'gmaps-directions-button';
    gmapsButton.innerHTML = "Directions from start";
    gmapsButton.className = "btn btn-facebook";

    // Insert button
    buttonContainer.appendChild(gmapsButton);
    
    // Handle button-clicking
    gmapsButton.addEventListener('click', (event) => {
        window.open( buildGoogleMapsDirectionsURL() );
    });
}
