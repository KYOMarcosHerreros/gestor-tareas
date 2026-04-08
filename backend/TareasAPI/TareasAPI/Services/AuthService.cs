using System.Security.Cryptography;
using System.Text;
using TareasAPI.Data;
using TareasAPI.Models;
using TareasAPI.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace TareasAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly TareasContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(TareasContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<Usuario> Registrar(UsuarioDto request)
        {
            using var hmac = new HMACSHA512(); // Aquí se genera un Salt nuevo
            var usuario = new Usuario
            {
                Username = request.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password)),
                PasswordSalt = hmac.Key // Guardamos el Salt para el login
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<string?> Login(UsuarioDto request)
        {
            // 1. Buscamos al usuario por nombre
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Username == request.Username);

            // Si no existe, fuera
            if (usuario == null) return null;

            // 2. Usamos el "Salt" que guardamos en el registro para verificar la contraseña
            using var hmac = new HMACSHA512(usuario.PasswordSalt);

            // 3. Calculamos el hash de la contraseña que nos acaban de pasar
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password));

            // 4. Comparamos byte a byte
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != usuario.PasswordHash[i]) return null;
            }

            // Si todo coincide, generamos el token
            return CrearToken(usuario);
        }

        private string CrearToken(Usuario usuario)
        {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, usuario.Username)
            };

            // Sacaremos la clave secreta del appsettings.json
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}