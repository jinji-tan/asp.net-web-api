using api.DTOs.User;
using api.Models;

namespace api.Helpers.interfaces
{
    public interface IAuthHelper
    {
        Task<bool> Register(RegisterDto registerDto);
        public bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt);
        Task<bool> UserExists(string email);
        Task<User?> GetUserByEmail(string email);
        Task<User?> Login(LoginDto loginDto);
        Task<bool> DeleteUser(int id);
    }
}