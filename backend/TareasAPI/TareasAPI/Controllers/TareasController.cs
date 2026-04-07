using Microsoft.AspNetCore.Mvc;
using TareasAPI.Models;
using TareasAPI.Services;

namespace TareasAPI.Controllers
{
    [ApiController] // Indica que esta clase es un controlador de API
    [Route("api/[controller]")] // La ruta será api/tareas
    public class TareasController : ControllerBase
    {
        private readonly ITareaService _service;

        public TareasController(ITareaService service)
        {
            _service = service;
        }

        // GET: api/tareas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetTareas()
        {
            var tareas = await _service.GetAllAsync();
            return Ok(tareas);
        }

        // GET: api/tareas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTarea(int id)
        {
            var tarea = await _service.GetByIdAsync(id);
            if (tarea == null) return NotFound();
            return Ok(tarea);
        }

        // POST: api/tareas
        [HttpPost]
        public async Task<ActionResult<Tarea>> PostTarea(Tarea tarea)
        {
            var nuevaTarea = await _service.CreateAsync(tarea);
            return CreatedAtAction(nameof(GetTarea), new { id = nuevaTarea.Id }, nuevaTarea);
        }

        // PUT: api/tareas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarea(int id, Tarea tarea)
        {
            var actualizada = await _service.UpdateAsync(id, tarea);
            if (actualizada == null) return NotFound();
            return NoContent();
        }

        // DELETE: api/tareas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarea(int id)
        {
            var eliminado = await _service.DeleteAsync(id);
            if (!eliminado) return NotFound();
            return NoContent();
        }
    }
}