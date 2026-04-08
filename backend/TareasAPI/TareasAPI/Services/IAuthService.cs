using TareasAPI.Dtos;
using TareasAPI.Models;

namespace TareasAPI.Services
{
    public interface IAuthService
    {
        Task<Usuario> Registrar(UsuarioDto request);
        Task<string?> Login(UsuarioDto request);
    }
}