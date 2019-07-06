using System;
using System.IdentityModel.Tokens.Jwt;
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
using PPChat.Dtos;
using PPChat.Helpers;
using PPChat.Hubs;
using PPChat.Models;
using PPChat.Services;

namespace PPChat.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase {

        private readonly AuthenticationService _authService;
        private readonly UserService _userService;

        public AuthenticationController (AuthenticationService authService, UserService userService) {
            _authService = authService;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost ("login")]
        public string Login ([FromBody] UserDto userDto) {
            
            User user = _userService.IsValidUser (userDto.Username, userDto.Password);

            if (user == null)
                return "";

            string token = _authService.CreateToken (user);

            return token;
        }

        [AllowAnonymous]
        [HttpPost ("register")]
        public string Register ([FromBody] UserDto userDto) {
            
            User user = _userService.GetByUsername (userDto.Username);

            if (user != null)
                return "";

            string token = _authService.CreateToken (user);

            return token;
        }
    }
}