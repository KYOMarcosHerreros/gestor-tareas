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

        public async Task<(IEnumerable<Tarea> datos, int total)> ObtenerPaginadoAsync(int numeroPagina, int tamañoPagina, int usuarioId)
        {
            var consulta = _context.Tareas
                .Where(t => t.UsuarioId == usuarioId)
                .AsQueryable();

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
            // Buscamos la tarea real que está en la base de datos
            var tareaExistente = await _context.Tareas.FindAsync(id);

            if (tareaExistente == null) return null;

            // Actualizamos solo los campos que pueden cambiar.
            // Ignoramos el UsuarioId que viene del Front para evitar errores 500
            // si el cliente no lo envía o envía un 0.
            tareaExistente.Titulo = tarea.Titulo;
            tareaExistente.Descripcion = tarea.Descripcion;
            tareaExistente.Estado = tarea.Estado;
            tareaExistente.Prioridad = tarea.Prioridad;
            tareaExistente.FechaLimite = tarea.FechaLimite;
            tareaExistente.FechaModificada = tarea.FechaModificada;

            // Mantenemos el UsuarioId original por seguridad
            // tareaExistente.UsuarioId = tareaExistente.UsuarioId;

            await _context.SaveChangesAsync();
            return tareaExistente;
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