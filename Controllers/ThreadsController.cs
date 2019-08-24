using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPChat.Dtos;
using PPChat.Models;
using PPChat.Services;

namespace PPChat.Controllers {

    [Produces ("application/json")]
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class ThreadsController : ControllerBase {

        private ThreadService _threadService;
        private UserService _userService;
        private MessageService _messageService;

        public ThreadsController (ThreadService threadService, UserService userService, MessageService messageService) {
            this._threadService = threadService;
            this._userService = userService;
            this._messageService = messageService;
        }

        [HttpGet]
        public ThreadDto[] GetByUserId (string userId) {
            Thread[] threads = _threadService.GetByUserId (userId);

            List<ThreadDto> threadDto = new List<ThreadDto> ();

            foreach (var thread in threads) {
                List<UserDto> userDto = new List<UserDto> ();

                foreach (var id in thread.Speakers) {
                    User user = _userService.GetById (id);
                    userDto.Add (new UserDto (user.Id, user.Email, user.Username, user.Contacts));
                }

                List<MessageDto> messageDto = new List<MessageDto> ();
                Message[] messages = _messageService.GetByThread (thread);
                foreach (var message in messages) {
                    messageDto.Add (new MessageDto (message.Id, message.Sender, message.Content, message.CreatedAt));
                }

                threadDto.Add (new ThreadDto (thread.Id, userDto.ToArray (), messageDto.ToArray ()));
            }
            return threadDto.ToArray ();
        }

        [HttpDelete ("removeThread/{threadToRemove}")]
        public bool RemoveThread (string threadToRemove) {

            if (string.IsNullOrEmpty (threadToRemove)) {
                return false;
            }

            string token = (Request.Headers["Authorization"]);
            string newToken = token.Replace ("Bearer ", "");

            var handler = new JwtSecurityTokenHandler ();

            string onlineUserId = "";

            if (handler.CanReadToken (newToken)) {
                var decodedToken = handler.ReadJwtToken (newToken);
                onlineUserId = ((List<Claim>) decodedToken.Claims).Find (a => a.Type.ToString () == "id").Value;
            }

            // Supprimer dans threads.speakers et dans user.threads

            bool isRemovedThread = _userService.RemoveThread (threadToRemove, onlineUserId);
            bool isRemovedSpeaker = _threadService.RemoveSpeaker (threadToRemove, onlineUserId);

            return isRemovedThread && isRemovedSpeaker; // Doit être approfondie, si l'un est false alors rearward celui à true
        }

        [HttpPost ("addThread")]
        public bool AddThread ([FromBody] Thread thread) {

            if (thread == null) {
                return false;
            }

            string token = (Request.Headers["Authorization"]);
            string newToken = token.Replace ("Bearer ", "");

            var handler = new JwtSecurityTokenHandler ();

            string onlineUserId = "";

            if (handler.CanReadToken (newToken)) {
                var decodedToken = handler.ReadJwtToken (newToken);
                onlineUserId = ((List<Claim>) decodedToken.Claims).Find (a => a.Type.ToString () == "id").Value;
            }

            // Thread thread = Models.Thread.Converter (threadDto);

            // Ajouter un nouveau thread et dans user.threads

            Thread newThread = _threadService.Create (thread);

            foreach (var userId in thread.Speakers) {
                bool isAddedInUsers = _userService.AddThread (thread.Id, userId);
            }

            return newThread != null; // Doit être approfondie, regarer aussi chaque "AddThread"
        }

    }
}