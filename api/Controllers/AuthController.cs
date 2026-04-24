using api.DTOs.User;
using api.Helpers.interfaces;
using api.Service.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _token;
        private readonly IAuthHelper _auth;

        public AuthController(ITokenService token, IAuthHelper auth)
        {
            _token = token;
            _auth = auth;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (await _auth.UserExists(registerDto.Email))
                return BadRequest("Email already exists");

            bool registered = await _auth.Register(registerDto);
            if (!registered)
                return StatusCode(500, "Failed to register");

            var user = await _auth.GetUserByEmail(registerDto.Email);
            if (user == null) return BadRequest("User created but could not be retrieved");

            return Ok(new
            {
                message = "User registered successfully",
                id = user.Id,
                email = user.Email,
                firstName = user.FirstName,
                lastName = user.LastName,
                token = _token.CreateToken(user.Id, user.Email)
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _auth.Login(loginDto);

            if (user == null)
                return Unauthorized("Invalid credentials");

            return Ok(new
            {
                message = "User logged in successfully",
                id = user.Id,
                email = user.Email,
                firstName = user.FirstName,
                lastName = user.LastName,
                token = _token.CreateToken(user.Id, user.Email)
            });
        }
    }
}