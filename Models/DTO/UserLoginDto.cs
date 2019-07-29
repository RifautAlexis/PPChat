using Newtonsoft.Json;

namespace PPChat.Dtos {

    public class UserLoginDto {

        [JsonProperty ("email")]
        public string Email { get; set; }

        [JsonProperty ("password")]
        public string Password { get; set; }
    }

}
