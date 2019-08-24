using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using PPChat.Dtos;
using System.Linq;

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

        public static Thread Converter(ThreadDto threadDto) {

            string[] speakersId = threadDto.Speakers.Select(u => u.Id).ToArray();
            string[] messagesId = threadDto.Messages.Select(m => m.Id).ToArray();

            return new Thread(threadDto.Id, speakersId, messagesId);
        }
    }

}