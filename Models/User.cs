using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PPChat.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement]
        public string Username { get; set; }

        public string Password { get; set; }

        public string Token { get; set; }

        //Id from others users
        public int[] Friends { get; set; }
    }

}
