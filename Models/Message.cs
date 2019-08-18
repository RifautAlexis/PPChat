using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using PPChat.Dtos;

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
        public string Content { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        public Message(string id, string sender, string thread, string content, DateTime createdAt) {

            this.Id = id;
            this.Sender = sender;
            this.Thread = thread;
            this.Content = content;
            this.CreatedAt = createdAt;

        }
        
        public static Message Convert(MessageFormDto messageForm) {
            return new Message(null, messageForm.Sender, messageForm.Thread, messageForm.Content, messageForm.CreeAt);
        }

        
    }
}