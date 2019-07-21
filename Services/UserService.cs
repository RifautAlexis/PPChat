using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
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

        public List<User> Get () =>
            _users.Find (user => true).ToList ();

        public User GetById (string id) =>
            _users.Find<User> (user => user.Id == id).FirstOrDefault ();

        public User GetByUsername (string username) =>
            _users.Find<User> (user => user.Username == username).FirstOrDefault ();

        public User IsValidUser (string username, string password) {

            if (string.IsNullOrEmpty (username) || string.IsNullOrEmpty (password))
                return null;

            var user = _users.Find (x => x.Username == username).FirstOrDefault ();

            if (user == null)
                return null;

            if (!VerifyPasswordHash (password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        public User Create (string username, string password) {

            if (string.IsNullOrWhiteSpace (password))
                throw new AppException ("Password is required");

            if (_users.Find (x => x.Username == username).FirstOrDefault () != null)
                throw new AppException ("Username \"" + username + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash (password, out passwordHash, out passwordSalt);

            User user = new User(null, username, null, null, passwordHash, passwordSalt);

            _users.InsertOne (user);

            return user;
        }

        public void Update (User userParam, string password = null) {

            User user = _users.Find (userParam.Id).FirstOrDefault ();

            if (user == null)
                throw new AppException ("User not found");

            if (userParam.Username != user.Username) {
                if (_users.Find (x => x.Username == userParam.Username).FirstOrDefault () != null)
                    throw new AppException ("Username " + userParam.Username + " is already taken");
            }

            // update user properties
            user.Username = userParam.Username;
            user.Friends = userParam.Friends;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace (password)) {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash (password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _users.ReplaceOne (x => x.Id == user.Id, user);
        }

        public void Remove (User userIn) =>
            _users.DeleteOne (user => user.Id == userIn.Id);

        public void Delete (string id) =>
            _users.DeleteOne (user => user.Id == id);

        /*=========================
            private helper methods
         =========================*/
        private static void CreatePasswordHash (string password, out byte[] passwordHash, out byte[] passwordSalt) {

            if (password == null) throw new ArgumentNullException ("password");

            if (string.IsNullOrWhiteSpace (password)) throw new ArgumentException ("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512 ()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
            }
        }

        private static bool VerifyPasswordHash (string password, byte[] storedHash, byte[] storedSalt) {

            if (password == null)
                throw new ArgumentNullException ("password");

            if (string.IsNullOrWhiteSpace (password))
                throw new ArgumentException ("Value cannot be empty or whitespace only string.", "password");

            if (storedHash.Length != 64)
                throw new ArgumentException ("Invalid length of password hash (64 bytes expected).", "passwordHash");

            if (storedSalt.Length != 128)
                throw new ArgumentException ("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512 (storedSalt)) {

                Byte[] computedHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));

                for (int i = 0; i < computedHash.Length; i++) {

                    if (computedHash[i] != storedHash[i])
                        return false;
                }
            }

            return true;
        }
    }
}