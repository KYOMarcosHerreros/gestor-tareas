namespace TareasAPI.Dtos
{
    public class RespuestaPaginadaDto<T>
    {
        public IEnumerable<T> Datos { get; set; } = new List<T>();
        public int PaginaActual { get; set; }
        public int TamañoPagina { get; set; }
        public int TotalRegistros { get; set; }
        public int TotalPaginas { get; set; }
    }
}