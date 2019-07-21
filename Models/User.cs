using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace PPChat.Models {
    public class User {

        [JsonProperty ("id")]
        [BsonId]
        [BsonRepresentation (BsonType.ObjectId)]
        public string Id { get; set; }

        [JsonProperty ("username")]
        public string Username { get; set; }

        // Id from others users
        [JsonProperty ("friends")]
        public string[] Friends { get; set; }

        [JsonProperty ("threads")]
        public string[] Threads { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public User(string id, string username, string[] friends, string[] threads, byte[] passwordHash, byte[] passwordSalt) {
            this.Id = id;
            this.Username = username;
            this.Friends = friends;
            this.Threads = threads;
            this.PasswordHash = passwordHash;
            this.PasswordSalt = passwordSalt;
        }
    }

}