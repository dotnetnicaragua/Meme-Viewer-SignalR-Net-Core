$(function () {

    "use strict";
    //UI elements
    var userInput = $('#userInput');
    var titleInput = $('#titleInput');
    var imageLinkInput = $('#imageLinkInput');
    var checkBoxSecret = $('#checkBoxSecret');

    var sendMemeBtn = $('#sendButton');
    var joinSecretBtn = $('#joinSecretButton');
    var leaveSecretBtn = $('#leaveSecretButton');
    var reconnectBtn = $('#reconnectBtn');

    var divAlertMessage = $('#alertMessage');
    var divMemesContainer = $('#memesContainer');

    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/memesHub")
        .build();

    //Disable send button until connection is established
    sendMemeBtn.prop('disabled', true);



    function startConnection() {
        connection.start().then(function () {
            sendMemeBtn.prop('disabled', false);
        }).catch(function (err) {
            return console.error(err.toString());
        });
    }



    //Listeners
    sendMemeBtn.on('click', function () {
        //Send meme to signal r server
        var title = titleInput.val();
        var user = userInput.val();
        var imageLink = imageLinkInput.val();
        connection.invoke("SendMeme", {title, user, imageLink});
    });

    startConnection();

})
