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

        public User GetByEmail(string email) {
            return _users.Find<User> (user => user.Email == email).FirstOrDefault();
        }

        public User Create (User user) {
            
            if (_users.Find (x => x.Username == user.Username).FirstOrDefault () != null)
                throw new AppException ("Username \"" + user.Username + "\" is already taken");

            _users.InsertOne (user);

            return user;
        }

        // public void Update (User userParam, string password = null) {

        //     User user = _users.Find (userParam.Id).FirstOrDefault ();

        //     if (user == null)
        //         throw new AppException ("User not found");

        //     if (userParam.Username != user.Username) {
        //         if (_users.Find (x => x.Username == userParam.Username).FirstOrDefault () != null)
        //             throw new AppException ("Username " + userParam.Username + " is already taken");
        //     }

        //     // update user properties
        //     user.Username = userParam.Username;
        //     user.Friends = userParam.Friends;

        //     // update password if it was entered
        //     if (!string.IsNullOrWhiteSpace (password)) {
        //         byte[] passwordHash, passwordSalt;
        //         User.CreatePasswordHash (password, out passwordHash, out passwordSalt);

        //         user.PasswordHash = passwordHash;
        //         user.PasswordSalt = passwordSalt;
        //     }

        //     _users.ReplaceOne (x => x.Id == user.Id, user);
        // }
            
    }
}