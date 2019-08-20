using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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

            if (string.IsNullOrEmpty (username)) {
                return new UserDto[0];
            }

            User[] users = _userService.GetByUsername (username);

            List<UserDto> usersToReturn = new List<UserDto> ();
            foreach (var user in users) {
                usersToReturn.Add (Dtos.UserDto.Converter (user));
            }

            return usersToReturn.ToArray ();
        }

        [HttpGet ("getContacts/{userId}")]
        public UserDto[] GetContacts (string userId) {

            if (string.IsNullOrEmpty (userId)) {
                return new UserDto[0];
            }

            User[] users = _userService.GetContacts (userId);

            List<UserDto> usersToReturn = new List<UserDto> ();
            foreach (var user in users) {
                usersToReturn.Add (Dtos.UserDto.Converter (user));
            }

            return usersToReturn.ToArray ();
        }

        [HttpDelete ("removeContact/{contactToRemove}")]
        public bool RemoveContact (string contactToRemove) {

            if (string.IsNullOrEmpty (contactToRemove)) {
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

            return _userService.RemoveContact (contactToRemove, onlineUserId);
        }

        [HttpPut ("addContact/{contactToAdd}")]
        public bool AddContact (string contactToAdd) {

            if (string.IsNullOrEmpty (contactToAdd)) {
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

            return _userService.AddContact (contactToAdd, onlineUserId);
        }

    }
}