using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using PPChat.Helpers;
using PPChat.Models;

namespace PPChat.Services {

    public class ThreadService {

        private readonly IMongoCollection<Thread> _threads;
        private readonly IMongoCollection<User> _users;

        public ThreadService (IPPChatDatabaseSettings settings) {

            var client = new MongoClient (settings.ConnectionString);
            var database = client.GetDatabase (settings.DatabaseName);

            _threads = database.GetCollection<Thread> (settings.ThreadsCollectionName);
            _users = database.GetCollection<User> (settings.UsersCollectionName);
        }

        public Thread Create (Thread thread) {

            _threads.InsertOne (thread);

            return thread;
        }

        public void UpdateNewMessage (string threadId, string messageId) {

            var filter = Builders<Thread>.Filter.And(
                Builders<Thread>.Filter.Where(x => x.Id == threadId));
            var update = Builders<Thread>.Update.Push("Messages", messageId);
            _threads.FindOneAndUpdate (filter, update);

        }

        public Thread Get (string threadId) {
            return _threads.AsQueryable<Thread> ().Where(t => t.Id == threadId).FirstOrDefault();
        }

        public Thread[] GetByUserId (string userId) {

            User user = _users.Find<User> (u => u.Id == userId).FirstOrDefault ();
            
            return _threads.AsQueryable<Thread> ().Where(t => t.Speakers.Contains(user.Id)).ToArray();
        }

    }
}