using Microsoft.EntityFrameworkCore;
using TareasAPI.Models;



using Microsoft.EntityFrameworkCore;
using TareasAPI.Models;

namespace TareasAPI.Data
{
    public class TareasContext : DbContext
    {
        public TareasContext(DbContextOptions<TareasContext> options) : base(options)
        {
        }

        public DbSet<Tarea> Tareas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}



/*namespace TareasAPI.Data
{
    // DbContext es la clase de EF Core que gestiona la conexión con la base de datos
    public class TareasContext : DbContext
    {
        // Constructor que recibe la configuración de la base de datos
        public TareasContext(DbContextOptions<TareasContext> options) : base(options)
        {
        }

        // DbSet representa la tabla "Tareas" en la base de datos
        // Cada objeto Tarea en esta lista será una fila en la tabla
        public DbSet<Tarea> Tareas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}*/