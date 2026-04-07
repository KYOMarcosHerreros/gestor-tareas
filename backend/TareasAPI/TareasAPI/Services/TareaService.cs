using TareasAPI.Models;
using TareasAPI.Repositories;

namespace TareasAPI.Services
{
    public class TareaService : ITareaService
    {
        private readonly ITareaRepository _repository;

        // El servicio recibe el repositorio por el constructor
        public TareaService(ITareaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Tarea>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Tarea?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Tarea> CreateAsync(Tarea tarea)
        {
            // LÓGICA DE NEGOCIO: 
            // 1. Asignamos la fecha de creación automáticamente al momento actual
            tarea.FechaCreacion = DateTime.Now;

            // 2. Si la tarea viene sin estado (o queremos forzarlo), 
            // nos aseguramos de que empiece como 'Pendiente'
            tarea.Estado = EstadoTarea.Pendiente;

            // Ahora sí, enviamos la tarea ya preparada al repositorio
            return await _repository.CreateAsync(tarea);
        }

        public async Task<Tarea?> UpdateAsync(int id, Tarea tarea)
        {
            return await _repository.UpdateAsync(id, tarea);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}