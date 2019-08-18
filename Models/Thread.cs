using System;
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

        [JsonProperty("messages")]
        public string[] Messages { get; set; }

        public Thread(string id, string[] speakers, string[] messages) {
            this.Id = id;
            this.Speakers = speakers;
            this.Messages = messages;
        }
    }

}