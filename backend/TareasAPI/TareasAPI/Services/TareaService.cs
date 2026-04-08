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

        public async Task<RespuestaPaginadaDto<Tarea>> ListarTareasPaginadasAsync(int pagina, int tamaño)
        {
            // Llamamos a tu nuevo repositorio
            var (datos, total) = await _repository.ObtenerPaginadoAsync(pagina, tamaño);

            // Calculamos cuántas páginas hay en total
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

        // Estos se quedan igual, solo llaman al repositorio
        public async Task<Tarea?> GetByIdAsync(int id) => await _repository.GetByIdAsync(id);
        public async Task<Tarea> CreateAsync(Tarea tarea) => await _repository.CreateAsync(tarea);
        public async Task<Tarea?> UpdateAsync(int id, Tarea tarea) => await _repository.UpdateAsync(id, tarea);
        public async Task<bool> DeleteAsync(int id) => await _repository.DeleteAsync(id);
    }
}