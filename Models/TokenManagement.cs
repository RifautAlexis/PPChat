using Newtonsoft.Json;

// Est un POCO

namespace PPChat.Models {

    [JsonObject ("tokenManagement")]
    public class TokenManagement {

        [JsonProperty ("secret")]
        public string Secret { get; set; }

        [JsonProperty ("issuer")]
        public string Issuer { get; set; }

        [JsonProperty ("audience")]
        public string Audience { get; set; }

        [JsonProperty ("accessExpiration")]
        public string AccessExpiration { get; set; }

    }
}