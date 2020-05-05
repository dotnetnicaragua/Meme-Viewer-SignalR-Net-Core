"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/memesHub")
    .build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;



function startConnection() {
    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
        console.log('connected');
    }).catch(function (err) {
        return console.error(err.toString());
    });
}

startConnection();