using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using PPChat.Dtos;
using PPChat.Helpers;
using PPChat.Hubs;
using PPChat.Models;
using PPChat.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace PPChat.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase {

        private IHubContext<ChatHub> context;

        public ChatsController (IHubContext<ChatHub> context) {
            this.context = context;
        }

        [HttpPost ("sendMessage")]
        public async Task SendMessage ([FromBody] Message message) {

            await context.Clients.All.SendAsync("ReceiveMessage", message);
        }

    }
}