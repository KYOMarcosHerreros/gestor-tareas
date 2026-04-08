using System;
using System.Collections.Generic;

namespace TareasAPI.Models
{
    public class RespuestaPaginadaDto<T>
    {
        // La lista de datos (tareas, usuarios, etc.)
        public IEnumerable<T> Datos { get; set; } = new List<T>();

        // Metadatos de la paginación
        public int TotalRegistros { get; set; }
        public int PaginaActual { get; set; }
        public int TotalPaginas { get; set; }
        public int TamañoPagina { get; set; }

        // Propiedades calculadas para ayudar al Front (compañero)
        public bool TienePaginaAnterior => PaginaActual > 1;
        public bool TienePaginaSiguiente => PaginaActual < TotalPaginas;
    }
}