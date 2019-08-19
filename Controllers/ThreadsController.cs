using System.Collections.Generic;
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

    }
}