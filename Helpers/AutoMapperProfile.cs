using AutoMapper;
using PPChat.Dtos;
using PPChat.Models;

namespace PPChat.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}