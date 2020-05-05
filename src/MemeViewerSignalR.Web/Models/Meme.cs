using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
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
