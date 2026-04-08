using Microsoft.AspNetCore.Mvc;
using TareasAPI.Models;
using TareasAPI.Services;
using Microsoft.AspNetCore.Authorization;
using TareasAPI.Dtos;
using System.Security.Claims; // Necesario para leer el ID del Token

namespace TareasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Solo usuarios con Token pueden entrar
    public class TareasController : ControllerBase
    {
        private readonly ITareaService _service;

        public TareasController(ITareaService service)
        {
            _service = service;
        }

        // Método auxiliar para obtener el ID del usuario desde el Token JWT
        private int ObtenerUsuarioId()
        {
            // Buscamos el claim que guardamos como NameIdentifier o "id" en el AuthService
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        }

        [HttpGet]
        public async Task<ActionResult<RespuestaPaginadaDto<Tarea>>> GetTareas([FromQuery] int pagina = 1, [FromQuery] int tamaño = 10)
        {
            if (pagina < 1) pagina = 1;
            if (tamaño < 1) tamaño = 10;

            // Pasamos el ID del usuario al servicio para filtrar
            var respuesta = await _service.ListarTareasPaginadasAsync(pagina, tamaño, ObtenerUsuarioId());
            return Ok(respuesta);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTarea(int id)
        {
            var tarea = await _service.GetByIdAsync(id);

            // Verificamos que la tarea exista Y pertenezca al usuario
            if (tarea == null || tarea.UsuarioId != ObtenerUsuarioId()) return NotFound();

            return Ok(tarea);
        }

        [HttpPost]
        public async Task<ActionResult<Tarea>> PostTarea(Tarea tarea)
        {
            // Asignamos el ID del usuario logueado antes de guardar
            tarea.UsuarioId = ObtenerUsuarioId();

            var nuevaTarea = await _service.CreateAsync(tarea);
            return CreatedAtAction(nameof(GetTarea), new { id = nuevaTarea.Id }, nuevaTarea);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarea(int id, Tarea tarea)
        {
            // Seguridad: Primero comprobamos si la tarea le pertenece
            var tareaExistente = await _service.GetByIdAsync(id);
            if (tareaExistente == null || tareaExistente.UsuarioId != ObtenerUsuarioId()) return NotFound();

            var actualizada = await _service.UpdateAsync(id, tarea);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarea(int id)
        {
            // Seguridad: Primero comprobamos si la tarea le pertenece
            var tareaExistente = await _service.GetByIdAsync(id);
            if (tareaExistente == null || tareaExistente.UsuarioId != ObtenerUsuarioId()) return NotFound();

            var eliminado = await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}