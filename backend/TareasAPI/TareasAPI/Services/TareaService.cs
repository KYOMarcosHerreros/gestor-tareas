using TareasAPI.Models;
using TareasAPI.Repositories;
using TareasAPI.Dtos;

namespace TareasAPI.Services
{
    public class TareaService : ITareaService
    {
        private readonly ITareaRepository _repository;

        public TareaService(ITareaRepository repository)
        {
            _repository = repository;
        }

        // Ahora recibe el usuarioId
        public async Task<RespuestaPaginadaDto<Tarea>> ListarTareasPaginadasAsync(int pagina, int tamaño, int usuarioId)
        {
            // Pasamos el usuarioId al repositorio (aquí es donde se hará el .Where en la DB)
            var (datos, total) = await _repository.ObtenerPaginadoAsync(pagina, tamaño, usuarioId);

            var totalPaginas = (int)Math.Ceiling((double)total / tamaño);

            return new RespuestaPaginadaDto<Tarea>
            {
                Datos = datos,
                PaginaActual = pagina,
                TamañoPagina = tamaño,
                TotalRegistros = total,
                TotalPaginas = totalPaginas
            };
        }

        // Estos se mantienen igual porque la seguridad (verificar dueño) 
        // ya la hemos puesto en el TareasController que te pasé antes.
        public async Task<Tarea?> GetByIdAsync(int id) => await _repository.GetByIdAsync(id);
        public async Task<Tarea> CreateAsync(Tarea tarea) => await _repository.CreateAsync(tarea);
        public async Task<Tarea?> UpdateAsync(int id, Tarea tarea) => await _repository.UpdateAsync(id, tarea);
        public async Task<bool> DeleteAsync(int id) => await _repository.DeleteAsync(id);
    }
}