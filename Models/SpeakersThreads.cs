using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using PPChat.Dtos;
using System.Linq;
using System.Collections.Generic;

namespace PPChat.Models {
    public class SpeakersThreads {

        public string SpeakerId { get; set; }
        public string ThreadId { get; set; }
        public User Speaker { get; set; }
        public Thread Thread { get; set; }

    }

}