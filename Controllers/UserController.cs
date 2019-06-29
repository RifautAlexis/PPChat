using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPChat.Models;
using PPChat.Services;

namespace PPChat.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private readonly UserService _userService;

        public UserController (UserService userService) {
            _userService = userService;
        }

        [HttpPost ("register")]
        public ActionResult<List<User>> Register (User user) {

            _userService.Create (user);

            return CreatedAtRoute (
                routeName: "GetUser",
                routeValues : new { id = user.Id },
                value : user);
        }

        [HttpPost ("login")]
        public ActionResult<User> Login ([FromBody]User content) {
            var userToLogin = _userService.Login (content.Username, content.Password);
            
            if (userToLogin == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(userToLogin);
        }

        [HttpGet ("{id}", Name = "GetUser")]
        public ActionResult<User> Get (string id) {

            var user = _userService.Get (id);

            if (user == null) {
                return NotFound ();
            }

            return user;
        }

        [HttpDelete]
        public IActionResult Delete (string id) {
            var user = _userService.Get (id);

            if (user == null) {
                return NotFound ();
            }

            _userService.Remove (user.Id);

            return NoContent ();
        }

    }
}