using Newtonsoft.Json;
using PPChat.Models;

namespace PPChat.Dtos {

    public class NewMessageDto {

        [JsonProperty ("message")]
        public Message Message { get; set; }

        [JsonProperty ("threadId")]
        public string ThreadId { get; set; }
    }

}
