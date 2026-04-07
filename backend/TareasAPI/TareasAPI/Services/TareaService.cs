using TareasAPI.Models;
using TareasAPI.Repositories;
using System.Linq;

namespace TareasAPI.Services
{
    public class TareaService : ITareaService
    {
        private readonly ITareaRepository _repository;

        public TareaService(ITareaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Tarea>> GetAllAsync()
        {
            // Obtenemos todas las tareas del repositorio
            var tareas = await _repository.GetAllAsync();

            // Ordenamos para que las tareas más recientes (por FechaCreacion) salgan primero
            return tareas.OrderByDescending(t => t.FechaCreacion);
        }

        public async Task<Tarea?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Tarea> CreateAsync(Tarea tarea)
        {
            tarea.FechaCreacion = DateTime.Now;

            tarea.Estado = EstadoTarea.Pendiente;

            // Enviamos la tarea ya preparada al repositorio
            return await _repository.CreateAsync(tarea);
        }

        public async Task<Tarea?> UpdateAsync(int id, Tarea tareaEditada)
        {
            var tareaEnDb = await _repository.GetByIdAsync(id);

            if (tareaEnDb == null) return null;

            tareaEnDb.Titulo = tareaEditada.Titulo;
            tareaEnDb.Descripcion = tareaEditada.Descripcion;
            tareaEnDb.Estado = tareaEditada.Estado;
            tareaEnDb.Prioridad = tareaEditada.Prioridad;
            tareaEnDb.FechaLimite = tareaEditada.FechaLimite;

            return await _repository.UpdateAsync(id, tareaEnDb);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}