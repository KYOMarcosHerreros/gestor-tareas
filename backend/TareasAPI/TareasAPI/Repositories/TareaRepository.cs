using Microsoft.EntityFrameworkCore;
using TareasAPI.Data;
using TareasAPI.Models;

namespace TareasAPI.Repositories
{
    public class TareaRepository : ITareaRepository
    {
        private readonly TareasContext _context;

        public TareaRepository(TareasContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tarea>> GetAllAsync()
        {
            return await _context.Tareas.ToListAsync();
        }

        public async Task<Tarea?> GetByIdAsync(int id)
        {
            // Usamos FindAsync para que sea rápido buscar por ID
            return await _context.Tareas.FindAsync(id);
        }

        public async Task<Tarea> CreateAsync(Tarea tarea)
        {
            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();
            return tarea;
        }

        public async Task<Tarea?> UpdateAsync(int id, Tarea tarea)
        {
            _context.Entry(tarea).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return tarea;
        }

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