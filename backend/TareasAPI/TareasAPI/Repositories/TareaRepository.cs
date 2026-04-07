using Microsoft.EntityFrameworkCore;
using TareasAPI.Data;
using TareasAPI.Models;

namespace TareasAPI.Repositories
{
    // Implementación concreta que accede a la base de datos usando EF Core
    public class TareaRepository : ITareaRepository
    {
        private readonly TareasContext _context;

        // El contexto se inyecta automáticamente gracias a la inyección de dependencias
        public TareaRepository(TareasContext context)
        {
            _context = context;
        }

        // Obtener todas las tareas
        public async Task<IEnumerable<Tarea>> GetAllAsync()
        {
            return await _context.Tareas.ToListAsync();
        }

        // Obtener una tarea por su id, devuelve null si no existe
        public async Task<Tarea?> GetByIdAsync(int id)
        {
            return await _context.Tareas.FindAsync(id);
        }

        // Crear una nueva tarea
        public async Task<Tarea> CreateAsync(Tarea tarea)
        {
            tarea.FechaCreacion = DateTime.UtcNow;
            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();
            return tarea;
        }

        // Actualizar una tarea existente, devuelve null si no existe
        public async Task<Tarea?> UpdateAsync(int id, Tarea tarea)
        {
            var tareaExistente = await _context.Tareas.FindAsync(id);
            if (tareaExistente == null) return null;

            tareaExistente.Titulo = tarea.Titulo;
            tareaExistente.Descripcion = tarea.Descripcion;
            tareaExistente.Estado = tarea.Estado;
            tareaExistente.Prioridad = tarea.Prioridad;
            tareaExistente.FechaLimite = tarea.FechaLimite;

            await _context.SaveChangesAsync();
            return tareaExistente;
        }

        // Eliminar una tarea, devuelve false si no existe
        public async Task<bool> DeleteAsync(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null) return false;

            _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}