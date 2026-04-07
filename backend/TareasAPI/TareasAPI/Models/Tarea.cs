using System.ComponentModel.DataAnnotations; // Necesario para las validaciones []

namespace TareasAPI.Models
{
    public class Tarea
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El título es obligatorio")]
        [StringLength(100, ErrorMessage = "Máximo 100 caracteres")]
        public string Titulo { get; set; } = string.Empty;

        [MaxLength(500, ErrorMessage = "La descripción es demasiado larga")] 
        public string Descripcion { get; set; } = string.Empty;

        [Required]
        public EstadoTarea Estado { get; set; }

        [Required]
        public PrioridadTarea Prioridad { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaLimite { get; set; }
    }

    // Enum que define los estados posibles de una tarea
    public enum EstadoTarea
    {
        Pendiente,
        EnProgreso,
        Completada
    }

    // Enum que define los niveles de prioridad posibles de una tarea
    public enum PrioridadTarea
    {
        Baja,
        Media,
        Alta
    }
}