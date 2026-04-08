using Microsoft.AspNetCore.Mvc;
using TareasAPI.Dtos;
using TareasAPI.Services;

namespace TareasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(UsuarioDto request)
        {
            var user = await _authService.Registrar(request);
            return Ok("Usuario registrado correctamente");
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UsuarioDto request)
        {
            var token = await _authService.Login(request);
            if (token == null) return BadRequest("Usuario o contraseña incorrectos");

            return Ok(token);
        }
    }
}