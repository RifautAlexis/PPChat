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

    [Produces ("application/json")]
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

        // [HttpPost ("sendMessage")]
        // public async Task SendMessage ([FromBody] MessageFormDto message) {

        //     Message newMessage = Message.Convert (message);

        //     Message messageCreated = this._messageService.Create (newMessage);
        //     this._threadService.UpdateNewMessage (messageCreated.Thread, messageCreated.Id);

        //     await context.Clients.All.SendAsync ("ReceiveMessage", messageCreated);
        // }

        // [HttpGet]
        // public Message[] GetByThreadId (string threadId) {

        //     Thread thread = _threadService.Get (threadId);

        //     return _messageService.GetByThread (thread);
        // }

    }
}