namespace TareasAPI.Models
{
    public class Tarea
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public EstadoTarea Estado { get; set; }
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

    public enum PrioridadTarea
    {
        Baja,
        Media,
        Alta
    }
}