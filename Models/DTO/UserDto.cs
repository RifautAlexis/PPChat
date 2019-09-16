using Newtonsoft.Json;
using PPChat.Models;

namespace PPChat.Dtos {

    public class UserDto {

        [JsonProperty ("id")]
        public string Id { get; set; }

        [JsonProperty ("email")]
        public string Email { get; set; }

        [JsonProperty ("username")]
        public string Username { get; set; }

        [JsonProperty ("contacts")]
        public string[] Contacts { get; set; }

        public UserDto(string id, string email, string username, string[] contacts) {
            this.Id = id;
            this.Email = email;
            this.Username = username;
            this.Contacts = contacts;
        }

        // public static UserDto Converter (User user) {
        //     return new UserDto (user.Id, user.Email, user.Username, user.Contacts);
        // }
    }

}
