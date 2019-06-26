using System.Collections.Generic;
using System.Diagnostics;
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

        [HttpPost]
        public ActionResult<List<User>> Register ([FromBody] User user) {
            
            _userService.Create(user);

            return CreatedAtRoute(
                routeName: "GetUser", 
                routeValues: new { id = user.Id },
                value: user);
        }

        [HttpGet]
        public void print () {
            System.Console.WriteLine ("AZERTY");
        }

        // [HttpGet]
        // public ActionResult<List<User>> Get() =>
        //     _userService.Get();

        [HttpGet(Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // [HttpPost]
        // public ActionResult<User> Create(User user)
        // {
        //     _userService.Create(user);

        //     return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        // }

        // [HttpPut("{id:length(24)}")]
        // public IActionResult Update(string id, User userIn)
        // {
        //     var user = _userService.Get(id);

        //     if (user == null)
        //     {
        //         return NotFound();
        //     }

        //     _userService.Update(id, userIn);

        //     return NoContent();
        // }

        // [HttpDelete("{id:length(24)}")]
        // public IActionResult Delete(string id)
        // {
        //     var user = _userService.Get(id);

        //     if (user == null)
        //     {
        //         return NotFound();
        //     }

        //     _userService.Remove(user.Id);

        //     return NoContent();
        // }
    }
}