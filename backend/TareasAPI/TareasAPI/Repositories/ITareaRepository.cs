using TareasAPI.Models;

namespace TareasAPI.Repositories
{
    // Interfaz que define las operaciones disponibles con la base de datos
    // Usar una interfaz nos permite cambiar la implementación sin tocar el resto del código
    public interface ITareaRepository
    {
        Task<(IEnumerable<Tarea> datos, int total)> ObtenerPaginadoAsync(int numeroPagina, int tamañoPagina);
        Task<Tarea?> GetByIdAsync(int id);
        Task<Tarea> CreateAsync(Tarea tarea);
        Task<Tarea?> UpdateAsync(int id, Tarea tarea);
        Task<bool> DeleteAsync(int id);
        
    }
}