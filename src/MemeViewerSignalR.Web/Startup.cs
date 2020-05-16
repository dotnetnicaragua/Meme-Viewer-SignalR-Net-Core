using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MemeViewerSignalR.Web.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MemeViewerSignalR.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //If the config is empty or not set, then just configure it self hosted, so that way by default it works this way and optionally configure it with Azure Signal R Service
            if (string.IsNullOrEmpty(Configuration.GetValue<string>("Azure:SignalR:ConnectionString"))) {
                services.AddSignalR();
            } else
            {
                services.AddSignalR()
                    //This looks for the Configuration "Azure:SignalR:ConnectionString", you can also use overrides to pass the connection string directly or an Action object to configure it
                    .AddAzureSignalR();
            }

            services.AddControllersWithViews()
                .AddRazorRuntimeCompilation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapHub<MemeHub>("/memesHub");
            });
        }
    }
}
