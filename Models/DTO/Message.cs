using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace PPChat.Models
{
    public class MessageDto
    {

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("sender")]
        public string Sender { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        public MessageDto(string id, string sender, string content, DateTime createdAt) {

            this.Id = id;
            this.Sender = sender;
            this.Content = content;
            this.CreatedAt = createdAt;

        }
        
    }
}