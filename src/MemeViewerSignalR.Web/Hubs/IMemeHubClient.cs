﻿using MemeViewerSignalR.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemeViewerSignalR.Web.Hubs
{
    public interface IMemeHubClient
    {
        Task ReceiveMeme(Meme meme);
    }
}
