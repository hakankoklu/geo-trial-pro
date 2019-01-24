/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


// Shortcuts to DOM Elements.
var addDataButton = document.getElementById('add-data-button');
var readDataButton = document.getElementById('read-data-button');
var queryDataButton = document.getElementById('query-data-button');
var userNameField = document.getElementById('user-name');
var userLatField = document.getElementById('user-lat');
var userLongField = document.getElementById('user-long');
var queryLatField = document.getElementById('query-lat');
var queryLongField = document.getElementById('query-long');
var radiusField = document.getElementById('query-radius');
// random Firebase location
var firestore = firebase.firestore();
var users = firestore.collection("users")
var geofirestore = new GeoFirestore(firestore);
var userGeocollection = geofirestore.collection("users");
// var geofirestore = new GeoFirestore(firestore);
// var geocollection = geofirestore.collection('users');
// Create a new GeoFire instance at the random Firebase location
// var geoFire = new GeoFire(locationRef);

function dummy(value) {
    console.log(value.docs);
}

function addUser() {
    var username = userNameField.value;
    var latitude = parseFloat(userLatField.value);
    var longitude = parseFloat(userLongField.value);
    var newUserRef = users.doc();

    newUserRef.set({
        username: username,
        age: 41,
        location: new firebase.firestore.GeoPoint(latitude, longitude)
    }).then(function () {
                console.log("Placed " + username + " to " + latitude + ", " + longitude);
            }).catch(function(error) {
    console.error("Error adding document: ", error);
    });
}

function readData() {
    var query = users.where("age", ">", 0)
    query.get().then(dummy);
}

function queryData() {
    var lat = parseFloat(queryLatField.value);
    var lon = parseFloat(queryLongField.value);
    var radius = parseFloat(radiusField.value);

    // var query = userGeocollection.near({
    //     center: new firebase.firestore.GeoPoint(lat, lon),
    //     radius: radius
    // });

    // query.get().then(dummy);

    var query = users.where("location", "==", new firebase.firestore.GeoPoint(lat, lon));

    query.get().then(dummy);

    // userGeocollection.get().then(dummy);

}

// Bindings on load.
window.addEventListener('load', function() {
    addDataButton.addEventListener('click', addUser);
    readDataButton.addEventListener('click', readData);
    queryDataButton.addEventListener('click', queryData);
    }, false);