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

        public UsersController (UserService userService, IMapper mapper) {
            _userService = userService;
            _mapper = mapper;
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

        [HttpDelete]
        public IActionResult Delete (string id) {
            User user = _userService.GetById (id);

            if (user == null) {
                return NotFound ();
            }

            _userService.Delete (user.Id);

            return Ok ();
        }

    }
}