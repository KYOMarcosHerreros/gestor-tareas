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
            // Aquí podrías añadir lógica extra, como validar datos
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