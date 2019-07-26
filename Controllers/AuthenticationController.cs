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
        public JsonResult Login ([FromBody] UserLoginDto userLogin) {

            if (userLogin == null) {
                return new JsonResult( new {StatusCode = 400, Result = "Invalid client request"} );
            }

            User user = _userService.IsValidUser (userLogin);

            if (user == null) {
                return new JsonResult( new {StatusCode = 400, Result = "No such user"} );
            }

            string token = _authService.CreateToken (user);

            return new JsonResult( new {StatusCode = 200, Result = token} );
        }

        [AllowAnonymous]
        [HttpPost ("register")]
        public string Register () {

            JObject bodyParsed;

            using (var reader = new StreamReader (Request.Body)) {

                var body = reader.ReadToEnd ().ToString ();
                bodyParsed = JObject.Parse (body);

            };

            var username = bodyParsed["Username"].ToString ();
            var password = bodyParsed["Password"].ToString ();

            User user = _userService.Create (username, password);

            if (user == null)
                return "";

            string token = _authService.CreateToken (user);

            return token;
        }
    }
}