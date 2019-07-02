namespace PPChat.Dtos {

    public class UserDto {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int[] Friends { get; set; }
    }

}
