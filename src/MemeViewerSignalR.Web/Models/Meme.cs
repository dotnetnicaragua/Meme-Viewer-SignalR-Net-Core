using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemeViewerSignalR.Web.Models
{
    public class Meme
    {
        public string User { get; set; }
        public string Title { get; set; }
        public string ImageLink { get; set; }
    }
}
