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
    var reconnectBtn = $('#reconnectButton');

    var divAlertMessage = $('#alertMessage');
    var divMemesContainer = $('#memesContainer');
    var secretGroupRow = $('#secretGroupRow');

    //Signal R instance
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/memesHub")
        //Default values [0,2,10, 30]
        .withAutomaticReconnect([0, 0, 0, 0])
        .build();

    //Life cycle events
    connection.onreconnected(function (connectionId) {
        console.log(connectionId);
    });

    connection.onreconnecting(function () {
        console.log('attempting to reconnect');
    });

    //Definitely disconnected after all attempts for reconnection
    connection.onclose(function () {
        console.log('just closed');
        reconnectBtn.show();
    });

    //Signal R Client Hub Actions
    connection.on('ReceiveMeme', function (meme) {
        drawMeme(meme);
        clearForm();
    });



    //Disable send button until connection is established
    sendMemeBtn.prop('disabled', true);



    function startConnection() {
        connection.start().then(function () {
            reconnectBtn.hide();
            sendMemeBtn.prop('disabled', false);
        }).catch(function (err) {
            reconnectBtn.show();
            return console.error(err.toString());
        });
    }



    //Listeners
    sendMemeBtn.on('click', function () {
        //Send meme to signal r server
        var title = titleInput.val();
        var user = userInput.val();
        var imageLink = imageLinkInput.val();
        var onlySecret = checkBoxSecret.prop('checked');
        if (title && user && imageLink) {
            connection.invoke("SendMeme", { title, user, imageLink }, onlySecret).catch(function (error) {
                console.log(error);
            });
        }
        
    });

    joinSecretBtn.on('click', function () {
        connection.invoke('JoinSecretGroup').then(function () {
            console.log("Joined secret group");
            joinSecretBtn.hide();
            leaveSecretBtn.show();
            secretGroupRow.show();
        }).catch(function (error) {
            console.log(error);
        });
    });

    leaveSecretBtn.on('click', function () {
        connection.invoke('LeaveSecretGroup').then(function () {
            console.log("Left secret group");
            joinSecretBtn.show();
            leaveSecretBtn.hide();
            secretGroupRow.hide();
        }).catch(function (error) {
            console.log(error);
        });
    });

    //Helper functions
    function drawMeme(meme) {

        var titleEncoded = meme.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        var cardContainer = document.createElement("div");
        cardContainer.className = "card";

        var cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        var cardTitle = document.createElement("h3");
        cardTitle.textContent = titleEncoded;

        cardHeader.appendChild(cardTitle);

        var cardBody = document.createElement("div");
        cardBody.className = "card-body";

        var cardBodyCreatedBy = document.createElement("h5");
        cardBodyCreatedBy.textContent = "Created by " + meme.user;

        cardBody.appendChild(cardBodyCreatedBy);


        var cardImage = document.createElement("img");
        cardImage.src = meme.imageLink;
        cardImage.className = "card-img-top spacing"

        var cardImgContainer = document.createElement("div");
        cardImgContainer.style = "text-align:center";
        cardImgContainer.appendChild(cardImage);

        cardContainer.appendChild(cardHeader);
        cardContainer.appendChild(cardBody);
        cardContainer.appendChild(cardImgContainer);

        var wholeItemContainer = document.createElement("div");
        wholeItemContainer.className = "col-6 spacing";
        wholeItemContainer.appendChild(cardContainer);

        divMemesContainer.prepend(wholeItemContainer);
    }

    function clearForm() {
        titleInput.val('');
        imageLinkInput.val('');
        userInput.val('');
        checkBoxSecret.prop('checked', false);
    }

    startConnection();

})
