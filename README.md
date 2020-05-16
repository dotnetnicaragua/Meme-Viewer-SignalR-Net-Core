# Meme-Viewer-SignalR-Net-Core
Demo project for Tech talk about Signal R given on May 7th,2020 along with .NET NI community and used on Tech talk on May 15th with Latino .NET Community.

This app exemplifies a Meme Viewer where you can submit a image link for creating a new post, join a secret group for sending memes to people that belongs to this group, and also you will learn how to integrate into controller actions logic that communicates to your connected clients on your signal R app.

# Setup for Signal R Azure Service

  - You need to have an Azure Account
  - You can access  this [link](https://docs.microsoft.com/en-us/azure/azure-signalr/signalr-quickstart-dotnet-core) and follow the **Create an Azure Signal R resource** to setup your own resource for azure to connect your apps to a Signal R instance.
  - After that, go to your created resource and on the **Keys** section lookup for your Connection string, you will need to replace it on the **appsettings.json** on the nested object with Path **"Azure:SignalR:ConnectionString"**, that way you will be able to reach your signal r instance and see the difference on the Network tab on the browser.
