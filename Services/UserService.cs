using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using PPChat.Dtos;
using PPChat.Helpers;
using PPChat.Models;

namespace PPChat.Services {

    public class UserService {

        private readonly IMongoCollection<User> _users;

        public UserService (IPPChatDatabaseSettings settings) {

            var client = new MongoClient (settings.ConnectionString);
            var database = client.GetDatabase (settings.DatabaseName);

            _users = database.GetCollection<User> (settings.UsersCollectionName);
        }

        public User GetById (string id) =>
            _users.Find<User> (user => user.Id == id).FirstOrDefault ();

        public User GetByEmail (string email) {
            return _users.Find<User> (user => user.Email == email).FirstOrDefault ();
        }

        public User Create (User user) {

            if (_users.Find (x => x.Username == user.Username).FirstOrDefault () != null)
                throw new AppException ("Username \"" + user.Username + "\" is already taken");

            _users.InsertOne (user);

            return user;
        }

        public User[] GetByUsername (string username) {
            return _users.AsQueryable<User> ().Where (user => user.Username.Contains (username)).ToArray ();
        }

        // public User[] GetContacts (string userId) {
        //     User loggedUser = _users.Find (u => u.Id == userId).FirstOrDefault ();

        //     if (loggedUser == null) {
        //         return null;
        //     }

        //     return _users.AsQueryable<User> ().Where (user => loggedUser.Contacts.Contains (user.Id)).ToArray ();
        // }

        // public bool RemoveContact (string contactToRemove, string userId) {
        //     User user = _users.Find (u => u.Id == userId).FirstOrDefault ();

        //     if (user == null) {
        //         return false;
        //     }

        //     string[] contacts = user.Contacts.Except (new string[] { contactToRemove }).ToArray ();

        //     user.Contacts = contacts;
        //     _users.ReplaceOne (u => u.Id == user.Id, user);

        //     return true;
        // }

        // public bool AddContact (string contactToAdd, string userId) {
        //     User user = _users.Find (u => u.Id == userId).FirstOrDefault ();

        //     if (user == null) {
        //         return false;
        //     }

        //     List<string> newContacts = new List<string> (user.Contacts);
        //     newContacts.Add (contactToAdd);

        //     user.Contacts = newContacts.ToArray ();

        //     _users.ReplaceOne (u => u.Id == user.Id, user);

        //     return true;
        // }

        // public bool RemoveThread (string threadToRemove, string userId) {
        //     User user = _users.Find (u => u.Id == userId).FirstOrDefault ();

        //     if (user == null) {
        //         return false;
        //     }

        //     string[] threads = user.Threads.Except (new string[] { threadToRemove }).ToArray ();

        //     user.Threads = threads;
        //     _users.ReplaceOne (u => u.Id == user.Id, user);

        //     return true;
        // }

        // public bool AddThread(string ThreadId, string userId) {
        //     User user = _users.Find (u => u.Id == userId).FirstOrDefault ();

        //     if (user == null) {
        //         return false;
        //     }

        //     List<string> threads = user.Threads.ToList();
        //     threads.Add(ThreadId);

        //     user.Threads = threads.ToArray();
        //     _users.ReplaceOne (u => u.Id == user.Id, user);

        //     return true;
        // }

    }
}