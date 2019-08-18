using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using PPChat.Dtos;
using System.Globalization;
using System.Text.RegularExpressions;

namespace PPChat.Models {
    public class User {

        [JsonProperty ("id")]
        [BsonId]
        [BsonRepresentation (BsonType.ObjectId)]
        public string Id { get; set; }

        [JsonProperty ("email")]
        public string Email { get; set; }

        [JsonProperty ("username")]
        public string Username { get; set; }

        // Id from others users
        [JsonProperty ("friends")]
        public string[] Friends { get; set; }

        [JsonProperty ("threads")]
        public string[] Threads { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public User (string id, string email, string username, string[] friends, string[] threads, byte[] passwordHash, byte[] passwordSalt) {
            this.Id = id;
            this.Email = email;
            this.Username = username;
            this.Friends = friends;
            this.Threads = threads;
            this.PasswordHash = passwordHash;
            this.PasswordSalt = passwordSalt;
        }

        /*
            Used for easier seed
        */
        public User (string id, string email, string username, string[] friends, string[] threads, string password) {
            this.Id = id;
            this.Email = email;
            this.Username = username;
            this.Friends = friends;
            this.Threads = threads;

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            
            this.PasswordHash = passwordHash;
            this.PasswordSalt = passwordSalt;
        }

        public static User Converter (UserRegisterDto userRegister) {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash (userRegister.Password, out passwordHash, out passwordSalt);

            return new User (null, userRegister.Email, userRegister.Username, null, null, passwordHash, passwordSalt);
        }

        public static void CreatePasswordHash (string password, out byte[] passwordHash, out byte[] passwordSalt) {

            if (password == null) throw new ArgumentNullException ("password");

            if (string.IsNullOrWhiteSpace (password)) throw new ArgumentException ("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512 ()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
            }
        }

        public bool IsValidPassword (string password) {

            using (var hmac = new System.Security.Cryptography.HMACSHA512 (this.PasswordSalt)) {

                Byte[] computedHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));

                for (int i = 0; i < computedHash.Length; i++) {

                    if (computedHash[i] != this.PasswordHash[i])
                        return false;
                }
            }

            return true;
        }

        public bool IsValid () {

            if (!IsValidEmail(this.Email)) {
                return false;
            }

            if (string.IsNullOrWhiteSpace(this.Username))
            {
                return false;
            }

            return true;
        }

        // Merci à Microsoft :D
        private bool IsValidEmail (string email) {
            if (string.IsNullOrWhiteSpace (email))
                return false;

            try {
                // Normalize the domain
                email = Regex.Replace (email, @"(@)(.+)$", DomainMapper,
                    RegexOptions.None, TimeSpan.FromMilliseconds (200));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper (Match match) {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping ();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    var domainName = idn.GetAscii (match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            } catch (RegexMatchTimeoutException e) {
                return false;
            } catch (ArgumentException e) {
                return false;
            }

            try {
                return Regex.IsMatch (email,
                    @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                    @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds (250));
            } catch (RegexMatchTimeoutException) {
                return false;
            }
        }
    }

}