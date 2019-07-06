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
        private MessageService _messageService;

        public ChatsController (IHubContext<ChatHub> context, MessageService messageService) {
            this.context = context;
            this._messageService = messageService;
        }

        [HttpPost ("sendMessage")]
        public async Task SendMessage ([FromBody] Message message) {

            _messageService.Create(message);

            await context.Clients.All.SendAsync("ReceiveMessage", message);
        }

    }
}