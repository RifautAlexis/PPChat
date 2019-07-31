using System;
using Newtonsoft.Json;
using PPChat.Models;

namespace PPChat.Dtos {

    public class MessageFormDto {

        [JsonProperty ("sender")]
        public string Sender { get; set; }

        [JsonProperty ("thread")]
        public string Thread { get; set; }

        [JsonProperty ("content")]
        public string Content { get; set; }

        [JsonProperty ("creeAt")]
        public DateTime CreeAt { get; set; }

        [JsonProperty ("seeAt")]
        public DateTime SeeAt { get; set; }
    }

}
