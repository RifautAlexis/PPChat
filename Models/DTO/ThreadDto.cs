using Newtonsoft.Json;
using PPChat.Models;

namespace PPChat.Dtos {

    public class ThreadDto {

        [JsonProperty ("id")]
        public string Id { get; set; }

        [JsonProperty ("speakers")]
        public UserDto[] Speakers { get; set; }

        public ThreadDto(string id, UserDto[] speakers) {
            this.Id = id;
            this.Speakers = speakers;
        }
    }

}
