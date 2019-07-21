using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPChat.Models;
using PPChat.Services;

namespace PPChat.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class ThreadsController : ControllerBase {

        private ThreadService _threadService;

        public ThreadsController (ThreadService threadService) {
            this._threadService = threadService;
        }

        [HttpGet]
        public Thread[] GetByUserId (string userId) {
            return _threadService.GetByUserId (userId);
        }

    }
}