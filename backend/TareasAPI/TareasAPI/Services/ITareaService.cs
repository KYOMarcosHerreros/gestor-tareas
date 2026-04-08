using TareasAPI.Dtos;
using TareasAPI.Models;

namespace TareasAPI.Services
{
    // Definimos qué puede hacer nuestro servicio de tareas
    public interface ITareaService
    {
        Task<RespuestaPaginadaDto<Tarea>> ListarTareasPaginadasAsync(int pagina, int tamaño);
        Task<Tarea?> GetByIdAsync(int id);
        Task<Tarea> CreateAsync(Tarea tarea);
        Task<Tarea?> UpdateAsync(int id, Tarea tarea);
        Task<bool> DeleteAsync(int id);
    }
}