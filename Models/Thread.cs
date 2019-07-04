using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace PPChat.Models {
    public class Thread {

        [JsonProperty("id")]
        [BsonId]
        [BsonRepresentation (BsonType.ObjectId)]
        public string Id { get; set; }

        [JsonProperty("speakers")]
        public string[] Speakers { get; set; }

        [JsonProperty("idMessages")]
        public string[] IdMessages { get; set; }
        
        [JsonProperty("createdAt")]
        public byte[] CreatedAt { get; set; }
        
        [JsonProperty("lastMessageAt")]
        public byte[] LastMessageAt { get; set; }
    }

}