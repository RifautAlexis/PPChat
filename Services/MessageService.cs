using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using PPChat.Models;
using PPChat.Helpers;

namespace PPChat.Services {

    public class MessageService {

        private readonly IMongoCollection<Message> _messages;

        public MessageService (IPPChatDatabaseSettings settings) {

            var client = new MongoClient (settings.ConnectionString);
            var database = client.GetDatabase (settings.DatabaseName);

            _messages = database.GetCollection<Message> (settings.UsersCollectionName);
        }

        public Message Create(Message message) {

            _messages.InsertOne(message);

            return message;
        }

    }
}