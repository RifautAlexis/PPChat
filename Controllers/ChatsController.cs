using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PPChat.Dtos;
using PPChat.Helpers;
using PPChat.Hubs;
using PPChat.Models;
using PPChat.Services;

namespace PPChat.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase {

        private IHubContext<ChatHub> context;
        private MessageService _messageService;
        private ThreadService _threadService;

        public ChatsController (IHubContext<ChatHub> context, MessageService messageService, ThreadService threadService) {
            this.context = context;
            this._messageService = messageService;
            this._threadService = threadService;
        }

        [HttpPost ("sendMessage")]
        public async Task SendMessage ([FromBody] NewMessageDto message) {
            this._messageService.Create(message.Message);
            this._threadService.UpdateNewMessage(message.ThreadId, message.Message.Id);

            await context.Clients.All.SendAsync("ReceiveMessage", message);
        }

        [HttpGet]
        public Message[] GetByThreadId (string threadId) {

            Thread thread = _threadService.GetThreadId (threadId);

            return _messageService.GetByThread (thread);
        }

    }
}