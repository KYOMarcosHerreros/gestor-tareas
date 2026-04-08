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

        // Este es el método que suele dar error si la interfaz no coincide
        public async Task<(IEnumerable<Tarea> datos, int total)> ObtenerPaginadoAsync(int numeroPagina, int tamañoPagina)
        {
            var consulta = _context.Tareas.AsQueryable();

            int total = await consulta.CountAsync();

            var datos = await consulta
                .Skip((numeroPagina - 1) * tamañoPagina)
                .Take(tamañoPagina)
                .ToListAsync();

            return (datos, total);
        }

        public async Task<Tarea?> GetByIdAsync(int id)
        {
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
            // Aquí usamos TryUpdate para evitar errores de rastreo si es necesario, 

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