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

    //Signal R Client Hub Actions
    connection.on('ReceiveMeme', function (meme) {
        drawMeme(meme);
        clearForm();
    });


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
        if (title && user && imageLink) {
            connection.invoke("SendMeme", { title, user, imageLink }).catch(function (error) {
                console.log(error);
            });
        }
        
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
