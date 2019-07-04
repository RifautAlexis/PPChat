using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using PPChat.Models;

namespace PPChat.Hubs
{
    public class ChatHub : Hub
    {
        // public async Task SendMessage(Message message) {
        //     await Clients.All.SendAsync("ReceiveMessage", message.content);
        // }
    }
}