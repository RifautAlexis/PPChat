using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PPChat.Helpers;
using PPChat.Hubs;
using PPChat.Models;
using PPChat.Services;

namespace PPChat {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.Configure<PPChatDatabaseSettings> (
                Configuration.GetSection (nameof (PPChatDatabaseSettings)));

            services.AddSingleton<IPPChatDatabaseSettings> (sp =>
                sp.GetRequiredService<IOptions<PPChatDatabaseSettings>> ().Value);

            services.AddSingleton<UserService> ();
            services.AddSingleton<AuthenticationService> ();

            services.AddMvc ()
                .AddJsonOptions (options => options.UseMemberCasing ())
                .SetCompatibilityVersion (CompatibilityVersion.Version_2_2);

            services.AddAutoMapper ();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles (configuration => {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddCors (o => o.AddPolicy ("CorsPolicy", options => {
                options
                    // .AllowAnyOrigin()
                    .AllowAnyMethod ()
                    .AllowAnyHeader ()
                    .WithOrigins ("http://localhost:5000")
                    .AllowCredentials ();
            }));

            services.Configure<TokenManagement> (Configuration.GetSection ("tokenManagement"));
            var token = Configuration.GetSection ("tokenManagement").Get<TokenManagement> ();
            var secret = Encoding.ASCII.GetBytes (token.Secret);

            services.AddAuthentication (x => {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (x => {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey (secret),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection ("AppSettings");
            services.Configure<AppSettings> (appSettingsSection);

            services.AddSignalR ();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseExceptionHandler ("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts ();
            }

            app.UseDefaultFiles ();

            app.UseStaticFiles ();
            app.UseSpaStaticFiles ();

            // app.UseCors("CorsPolicy");
            app.UseCors (x => x
                .AllowAnyOrigin ()
                .AllowAnyMethod ()
                .AllowAnyHeader ());

            app.UseAuthentication ();

            app.UseHttpsRedirection ();

            app.UseSignalR (routes => {
                routes.MapHub<ChatHub> ("/hub/chatHub");
            });

            app.UseMvc (routes => {
                routes.MapRoute (
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa (spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment ()) {
                    spa.UseAngularCliServer (npmScript: "start");
                }
            });
        }
    }
}