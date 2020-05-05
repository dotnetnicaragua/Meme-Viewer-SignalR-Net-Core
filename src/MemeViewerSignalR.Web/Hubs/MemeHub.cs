﻿using MemeViewerSignalR.Web.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemeViewerSignalR.Web.Hubs
{
    public class MemeHub : Hub<IMemeHubClient>
    {
        private readonly string secretGroupName = "secret";
        public async Task SendMeme(Meme meme)
        {
            await Clients.All.ReceiveMeme(meme);
            //await Clients.All.SendAsync("ReceiveMeme", meme);
        }

        public async Task JoinSecretGroup()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, secretGroupName);
        }

        public async Task LeaveSecretGroup()
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, secretGroupName);
        }
    }
}
