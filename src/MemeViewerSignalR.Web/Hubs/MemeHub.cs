using MemeViewerSignalR.Web.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemeViewerSignalR.Web.Hubs
{
    public class MemeHub : Hub<IMemeHubClient>
    {
        public async Task SendMeme(Meme meme)
        {
            await Clients.All.ReceiveMeme(meme);
            //await Clients.All.SendAsync("ReceiveMeme", meme);
        }
    }
}
