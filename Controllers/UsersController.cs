using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPChat.Dtos;
using PPChat.Models;
using PPChat.Services;

namespace PPChat.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {
        private UserService _userService;
        private IMapper _mapper;
        private ThreadService _threadService;

        public UsersController (UserService userService, IMapper mapper, ThreadService threadService) {
            _userService = userService;
            _mapper = mapper;
            _threadService = threadService;
        }

        [HttpGet ("{id}")]
        public UserDto GetById (string id) {

            User user = _userService.GetById (id);

            if (user == null) {
                return null;
            }

            UserDto userDto = _mapper.Map<UserDto> (user);
            return userDto;
        }

        [AllowAnonymous]
        [HttpPost ("names")]
        public string GetNamesByThreadId([FromBody] string threadId) {

            // Thread thread = _threadService.Get(threadId);

            return threadId;
        }

    }
}