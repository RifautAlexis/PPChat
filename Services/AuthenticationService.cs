using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PPChat.Dtos;
using PPChat.Models;
using Newtonsoft.Json;

namespace PPChat.Services {

    public class AuthenticationService {

        private readonly UserService _userService;
        private readonly TokenManagement _tokenManagement;

        public AuthenticationService (UserService service, IOptions<TokenManagement> tokenManagement) {
            _userService = service;
            _tokenManagement = tokenManagement.Value;
        }

        public string CreateToken (User user) {

            string token = string.Empty;

            var claim = new [] {
                new Claim ("id", user.Id)
            };

            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (_tokenManagement.Secret));
            var credentials = new SigningCredentials (key, SecurityAlgorithms.HmacSha256);

            var jwtToken = new JwtSecurityToken (
                _tokenManagement.Issuer,
                _tokenManagement.Audience,
                claim,
                expires : DateTime.Now.AddMinutes (_tokenManagement.AccessExpiration),
                signingCredentials : credentials
            );

            token = new JwtSecurityTokenHandler ().WriteToken (jwtToken);
            return token;

        }

    }

}