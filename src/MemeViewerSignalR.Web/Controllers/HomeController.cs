using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MemeViewerSignalR.Web.Models;
using Microsoft.AspNetCore.SignalR;
using MemeViewerSignalR.Web.Hubs;

namespace MemeViewerSignalR.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<MemeHub, IMemeHubClient> memeHubContext;
        public HomeController(ILogger<HomeController> logger,
            IHubContext<MemeHub, IMemeHubClient> memeHubContext)
        {
            _logger = logger;
            this.memeHubContext = memeHubContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CustomAdd([FromBody] Meme meme)
        {
            await memeHubContext.Clients.All.ReceiveMeme(meme);
            return Ok();

        }
        [HttpPost]
        public async Task<IActionResult> CustomAddSecret([FromBody] Meme meme)
        {
            await memeHubContext.Clients.Group("secret").ReceiveMeme(meme);
            return Ok();

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
