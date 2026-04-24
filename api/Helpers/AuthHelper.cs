using System.Security.Cryptography;
using System.Text;
using api.Data;
using api.DTOs.User;
using api.Helpers.interfaces;
using api.Models;
using Dapper;

namespace api.Helpers
{
    public class AuthHelper : IAuthHelper
    {
        private readonly MyAppContext _context;
        public AuthHelper(MyAppContext context)
        {
            _context = context;
        }

        public async Task<bool> Register(RegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();

            byte[] passwordSalt = hmac.Key;
            byte[] passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));

            var sql = @"INSERT INTO MyAppSchema.Users (FirstName, LastName, Email, PasswordHash, PasswordSalt) 
                        VALUES (@FirstName, @LastName, @Email, @PasswordHash, @PasswordSalt);";

            return await _context.ExecuteSqlAsync(sql, new
            {
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
            });
        }

        public bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            using var hmac = new HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(storedHash);
        }

        public async Task<bool> UserExists(string email) =>
            await _context.LoadDataSingleAsync<string>("SELECT Email FROM MyAppSchema.Users WHERE Email = @Email", new { Email = email }) != null;
        public async Task<User?> GetUserByEmail(string email) =>
            await _context.LoadDataSingleAsync<User>(@"SELECT Id, FirstName, LastName, Email, PasswordHash, PasswordSalt 
                                                FROM MyAppSchema.Users WHERE Email = @Email", new { Email = email });

        public async Task<User?> Login(LoginDto loginDto)
        {
            var user = await GetUserByEmail(loginDto.Email);

            if (user != null && VerifyPassword(loginDto.Password, user.PasswordHash, user.PasswordSalt))
                return user;

            return null;
        }

        public async Task<bool> DeleteUser(int id) =>
            await _context.ExecuteSqlAsync("DELETE FROM MyAppSchema.Users WHERE Id = @Id", new { Id = id });
    }
}