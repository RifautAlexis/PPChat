using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Driver.Core.Clusters;
using PPChat.Models;

namespace PPChat.Models {
    public static class DbInitializer {
        public static void Initialize (IPPChatDatabaseSettings settings) {

            var client = new MongoClient (settings.ConnectionString);
            
            // if (!checkConnection (settings.ConnectionString)) {
            //     client.DropDatabase (settings.DatabaseName);
            //     System.Console.WriteLine("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            // }

            client.DropDatabase (settings.DatabaseName);
            // System.Console.WriteLine("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

            var database = client.GetDatabase (settings.DatabaseName);

            IMongoCollection<User> _users = database.GetCollection<User> (settings.UsersCollectionName);

            var users = new User[] {
                new User ("111111111111111111111111", "admin@gmail.com", "admin", new string[] { "222222222222222222222222", "333333333333333333333333", "444444444444444444444444", "555555555555555555555555" }, new string[] { "718293644973158256545823", "794613164978254623125158", "012030506080902050216122", "651488656507997864056123" }, "123"),
                new User ("222222222222222222222222", "member@gmail.com", "member", new string[] { "111111111111111111111111", "444444444444444444444444" }, new string[] { "794613164978254623125158", "651488656507997864056123" }, "123"),
                new User ("333333333333333333333333", "azerty@gmail.com", "azerty", new string[] { "111111111111111111111111", "555555555555555555555555" }, new string[] { "012030506080902050216122", "021568486415287025514458" }, "123"),
                new User ("444444444444444444444444", "liza@gmail.com", "liza", new string[] { "111111111111111111111111", "222222222222222222222222", "555555555555555555555555" }, new string[] { "794613164978254623125158", "024051054612491472164208" }, "123"),
                new User ("555555555555555555555555", "Manuel@gmail.com", "Manuel", new string[] { "111111111111111111111111", "333333333333333333333333", "444444444444444444444444" }, new string[] { "718293644973158256545823", "024051054612491472164208", "021568486415287025514458" }, "123")
            };

            _users.InsertMany (users);

            IMongoCollection<Message> _messages = database.GetCollection<Message> (settings.MessagesCollectionName);

            var messages = new Message[] {
                new Message ("963852741096385274109638", "111111111111111111111111", "718293644973158256545823", "Salut", new DateTime (2019, 8, 17, 10, 0, 0)),
                new Message ("753421869986241357753159", "555555555555555555555555", "718293644973158256545823", "Hey, ça fait longtemps :)", new DateTime (2019, 8, 17, 10, 3, 0)),
                new Message ("753951598741236548978523", "111111111111111111111111", "718293644973158256545823", "c'est vrai, comment vas-tu ?", new DateTime (2019, 8, 17, 10, 5, 0)),
                new Message ("256887412563200152014589", "555555555555555555555555", "718293644973158256545823", "bien et toi ?", new DateTime (2019, 8, 17, 10, 11, 0)),
                new Message ("012543698475201525625412", "222222222222222222222222", "794613164978254623125158", "Yo", new DateTime (2019, 8, 17, 9, 15, 0)),
                new Message ("201523036504852010450561", "444444444444444444444444", "794613164978254623125158", "Yo, comment va ?", new DateTime (2019, 8, 21, 0, 10, 0)),
                new Message ("201536809082070136558420", "333333333333333333333333", "012030506080902050216122", "Coucou, tu veux voir ma bite ?", new DateTime (2019, 10, 23, 11, 24, 0)),
                new Message ("021540125415478464581894", "333333333333333333333333", "024051054612491472164208", "Tu sais que tu as de beaux yeux toi ?", new DateTime (2019, 7, 6, 22, 17, 0)),
                new Message ("025184945120845128468656", "444444444444444444444444", "024051054612491472164208", "Tu veux me aiser ?", new DateTime (2019, 7, 6, 22, 19, 0)),
                new Message ("012345678912345678901234", "333333333333333333333333", "024051054612491472164208", "Oui !", new DateTime (2019, 7, 6, 22, 28, 0)),
                new Message ("567890123456789012345678", "111111111111111111111111", "651488656507997864056123", "Hey, salut !", new DateTime (2019, 6, 25, 14, 35, 0)),
                new Message ("901234567890123456789012", "333333333333333333333333", "651488656507997864056123", "Salut, tu deviens quoi ?", new DateTime (2019, 6, 25, 14, 39, 0)),
                new Message ("345678901234567890123456", "111111111111111111111111", "651488656507997864056123", "Je suis proxènete, je voudrais te recruter. Tu deviendrais riche avec moi !", new DateTime (2019, 6, 25, 15, 28, 0)),
                new Message ("789012345678901234567890", "333333333333333333333333", "651488656507997864056123", "Oui, bien sûr ! Tu viens me prendre quand ?", new DateTime (2019, 6, 25, 17, 2, 0)),
                new Message ("123456789012345678901234", "555555555555555555555555", "021568486415287025514458", "Je ne sais plus quoi inventer", new DateTime (2019, 8, 29, 4, 12, 0)),
                new Message ("987654321098765432109876", "333333333333333333333333", "021568486415287025514458", "Inventer pour ce seed", new DateTime (2019, 8, 29, 6, 4, 0)),
                new Message ("543210987654321098765432", "555555555555555555555555", "021568486415287025514458", ":(", new DateTime (2019, 9, 2, 23, 33, 0))
            };

            _messages.InsertMany (messages);

            IMongoCollection<Thread> _threads = database.GetCollection<Thread> (settings.ThreadsCollectionName);

            var threads = new Thread[] {
                new Thread ("718293644973158256545823", new string[] { "111111111111111111111111", "555555555555555555555555" }, new string[] { "963852741096385274109638", "753421869986241357753159", "753951598741236548978523", "256887412563200152014589",}),
                new Thread ("794613164978254623125158", new string[] { "111111111111111111111111", "222222222222222222222222", "444444444444444444444444" }, new string[] { "012543698475201525625412", "201523036504852010450561" }),
                new Thread ("012030506080902050216122", new string[] { "333333333333333333333333", "111111111111111111111111" }, new string[] { "201536809082070136558420" }),
                new Thread ("024051054612491472164208", new string[] { "444444444444444444444444", "333333333333333333333333" }, new string[] { "021540125415478464581894", "025184945120845128468656", "012345678912345678901234" }),
                new Thread ("651488656507997864056123", new string[] { "111111111111111111111111", "333333333333333333333333" }, new string[] { "567890123456789012345678", "901234567890123456789012", "345678901234567890123456", "789012345678901234567890" }),
                new Thread ("021568486415287025514458", new string[] { "333333333333333333333333", "555555555555555555555555" }, new string[] { "123456789012345678901234", "987654321098765432109876", "543210987654321098765432" })
            };

            _threads.InsertMany (threads);
        }

        private static bool checkConnection (string connection_string) {
            var client = new MongoClient (connection_string);

            try {
                client.ListDatabaseNames ();
            } catch (Exception) { }

            return client.Cluster.Description.State == ClusterState.Connected;
        }
    }
}