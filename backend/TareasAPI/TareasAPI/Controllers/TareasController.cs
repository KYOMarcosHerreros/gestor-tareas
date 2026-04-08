using Microsoft.AspNetCore.Mvc;
using TareasAPI.Models;
using TareasAPI.Services;
using Microsoft.AspNetCore.Authorization;
using TareasAPI.Dtos;

namespace TareasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TareasController : ControllerBase
    {
        private readonly ITareaService _service;

        public TareasController(ITareaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<RespuestaPaginadaDto<Tarea>>> GetTareas([FromQuery] int pagina = 1, [FromQuery] int tamaño = 10)
        {
            // Validaciones sencillas
            if (pagina < 1) pagina = 1;
            if (tamaño < 1) tamaño = 10;

            var respuesta = await _service.ListarTareasPaginadasAsync(pagina, tamaño);
            return Ok(respuesta);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTarea(int id)
        {
            var tarea = await _service.GetByIdAsync(id);
            if (tarea == null) return NotFound();
            return Ok(tarea);
        }

        [HttpPost]
        public async Task<ActionResult<Tarea>> PostTarea(Tarea tarea)
        {
            var nuevaTarea = await _service.CreateAsync(tarea);
            return CreatedAtAction(nameof(GetTarea), new { id = nuevaTarea.Id }, nuevaTarea);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarea(int id, Tarea tarea)
        {
            var actualizada = await _service.UpdateAsync(id, tarea);
            if (actualizada == null) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarea(int id)
        {
            var eliminado = await _service.DeleteAsync(id);
            if (!eliminado) return NotFound();
            return NoContent();
        }
    }
}