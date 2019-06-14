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
        public string Pseudo { get; set; }

        //public decimal password { get; set; }

        //public string Birthdate { get; set; }

        //public string Friends { get; set; }
    }

}
