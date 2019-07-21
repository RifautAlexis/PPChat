using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace PPChat.Models
{
    public class Message
    {

        [JsonProperty("id")]
        [BsonId]
        [BsonRepresentation (BsonType.ObjectId)]
        public string Id { get; set; }

        [JsonProperty("sender")]
        public string Sender { get; set; }

        [JsonProperty("thread")]
        public string Thread { get; set; }

        [JsonProperty("content")]
        public string content { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("seeAt")]
        public DateTime SeeAt { get; set; }

        public Message(string id, string sender, string thread, string content, DateTime createdAt, DateTime seeAt) {

            this.Id = id;
            this.Sender = sender;
            this.Thread = thread;
            this.content = content;
            this.CreatedAt = createdAt;
            this.SeeAt = seeAt;

        }
        
    }
}