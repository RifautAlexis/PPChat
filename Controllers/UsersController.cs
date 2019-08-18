using System.Collections.Generic;
using AutoMapper;
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

        [HttpGet ("findUsers/{username}")]
        public UserDto[] FindUsers (string username) {

            if (string.IsNullOrEmpty(username))
            {
                return new UserDto[0];    
            }

            User[] users = _userService.GetByUsername (username);

            List<UserDto> usersToReturn = new List<UserDto>();
            foreach (var user in users)
            {
                usersToReturn.Add(Dtos.UserDto.Converter(user));
            }

            return usersToReturn.ToArray();
        }

    }
}