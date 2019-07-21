using PPChat.Models;

namespace PPChat.Dtos {

    public class NewMessageDto {
        public Message Message { get; set; }
        public string ThreadId { get; set; }
    }

}
