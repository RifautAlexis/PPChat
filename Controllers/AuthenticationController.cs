using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPChat.Dtos;
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

            if (userLogin == null || string.IsNullOrEmpty (userLogin.Email) || string.IsNullOrEmpty (userLogin.Password)) {
                return new JsonResult (new { StatusCode = 400, Result = "Invalid client request" });
            }

            User user = _userService.GetByEmail (userLogin.Email);

            if (user == null) {
                return new JsonResult (new { StatusCode = 400, Result = "No such user" });
            }

            if (!user.IsValidPassword(userLogin.Password)) {
                return new JsonResult (new { StatusCode = 400, Result = "Incorrect password" });
            }

            string token = _authService.CreateToken (user);

            return new JsonResult (new { StatusCode = 200, Result = token });
        }

        [AllowAnonymous]
        [HttpPost ("register")]
        public JsonResult Register ([FromBody] UserRegisterDto userRegister) {

            if (userRegister == null || string.IsNullOrEmpty (userRegister.Email) || string.IsNullOrEmpty (userRegister.Username) || string.IsNullOrEmpty (userRegister.Password)) {
                return new JsonResult (new { StatusCode = 400, Result = "Invalid client request" });
            }

            User user = Models.User.Converter(userRegister);

            if (!user.IsValid())
            {
                return new JsonResult (new { StatusCode = 400, Result = "Invalid user" });
            }
            
            _userService.Create (user);

            string token = _authService.CreateToken (user);

            return new JsonResult (new { StatusCode = 200, Result = token });
        }
    }
}