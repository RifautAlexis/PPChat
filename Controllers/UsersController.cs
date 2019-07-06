using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PPChat.Dtos;
using PPChat.Helpers;
using PPChat.Models;
using PPChat.Services;
using Newtonsoft.Json;

namespace PPChat.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {
        private UserService _userService;
        private readonly AppSettings _appSettings;
        private IMapper _mapper;

        public UsersController (UserService userService, IOptions<AppSettings> appSettings, IMapper mapper) {
            _userService = userService;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        // [AllowAnonymous]
        // [HttpPost ("register")]
        // public string Register ([FromBody] UserDto userDto) {

        //     User user = _mapper.Map<User> (userDto);

        //     _userService.Create (user, userDto.Password);

        //     string token = CreateToken (user);

        //     return token;
        // }

        [HttpGet ("{id}", Name = "GetUser")]
        public ActionResult<UserDto> GetById (string id) {

            User user = _userService.GetById (id);

            if (user == null) {
                return NotFound ();
            }

            UserDto userDto = _mapper.Map<UserDto> (user);
            return Ok (userDto);
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

        [HttpPut ("{id}")]
        public IActionResult Update (int id, [FromBody] UserDto userDto) {

            var user = _mapper.Map<User> (userDto);

            try {

                _userService.Update (user, userDto.Password);
                return Ok ();

            } catch (AppException ex) {

                return BadRequest (new { message = ex.Message });
            }
        }

        // private string CreateToken (User user) {
        //     JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler ();
        //     byte[] key = Encoding.ASCII.GetBytes (_appSettings.Secret);

        //     SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor {
        //         Subject = new ClaimsIdentity (new Claim[] {
        //         new Claim ("id", user.Id.ToString ()),
        //         new Claim ("username", user.Username.ToString ()),
        //         new Claim ("friends", user.Friends.ToString ())
        //         }),
        //         Expires = DateTime.UtcNow.AddDays (7),
        //         SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
        //     };

        //     SecurityToken token = tokenHandler.CreateToken (tokenDescriptor);
        //     string tokenString = tokenHandler.WriteToken (token);

        //     System.Console.WriteLine (tokenString);

        //     return JsonConvert.SerializeObject(tokenString);
        // }

    }
}