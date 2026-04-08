using TareasAPI.Models;
using TareasAPI.Dtos;

namespace TareasAPI.Services
{
    public interface ITareaService
    {
        // Añadimos usuarioId a la lista paginada
        Task<RespuestaPaginadaDto<Tarea>> ListarTareasPaginadasAsync(int pagina, int tamaño, int usuarioId);

        Task<Tarea?> GetByIdAsync(int id);
        Task<Tarea> CreateAsync(Tarea tarea);
        Task<Tarea?> UpdateAsync(int id, Tarea tarea);
        Task<bool> DeleteAsync(int id);
    }
}