using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace PPChat.Models {
    public class User {

        [JsonProperty("id")]
        [BsonId]
        [BsonRepresentation (BsonType.ObjectId)]
        public string Id { get; set; }

        [JsonProperty("username")]
        [BsonElement]
        public string Username { get; set; }

        // public string Password { get; set; }

        // Id from others users
        [JsonProperty("friends")]
        public int[] Friends { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }

}