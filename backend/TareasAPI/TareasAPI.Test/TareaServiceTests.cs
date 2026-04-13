using Moq;
using TareasAPI.Models;
using TareasAPI.Repositories;
using TareasAPI.Services;
using TareasAPI.Dtos;

namespace TareasAPI.Tests
{
    public class TareaServiceTests
    {
        // Mock del repositorio, simula la base de datos sin necesitarla
        private readonly Mock<ITareaRepository> _repositorioMock;
        private readonly TareaService _servicio;

        public TareaServiceTests()
        {
            _repositorioMock = new Mock<ITareaRepository>();
            // Creamos el servicio real pero con el repositorio falso
            _servicio = new TareaService(_repositorioMock.Object);
        }

        // TEST 1: Crear una tarea devuelve la tarea creada
        [Fact]
        public async Task CreateAsync_DebeDevolver_TareaCreada()
        {
            // Preparamos los datos de prueba
            var tarea = new Tarea
            {
                Titulo = "Tarea de prueba",
                Descripcion = "Descripción de prueba",
                Estado = EstadoTarea.Pendiente,
                Prioridad = PrioridadTarea.Alta,
                FechaLimite = DateTime.Now.AddDays(7),
                UsuarioId = 1
            };

            // Le decimos al mock que cuando llamen a CreateAsync devuelva la misma tarea
            _repositorioMock
                .Setup(r => r.CreateAsync(It.IsAny<Tarea>()))
                .ReturnsAsync(tarea);

            // Ejecutamos el método que queremos testear
            var resultado = await _servicio.CreateAsync(tarea);

            // Comprobamos que el resultado es correcto
            Assert.NotNull(resultado);
            Assert.Equal("Tarea de prueba", resultado.Titulo);
            Assert.Equal(EstadoTarea.Pendiente, resultado.Estado);
        }

        // TEST 2: GetByIdAsync devuelve null si la tarea no existe
        [Fact]
        public async Task GetByIdAsync_DebeDevolver_Null_SiNoExiste()
        {
            // El mock devuelve null cuando buscan por id 99
            _repositorioMock
                .Setup(r => r.GetByIdAsync(99))
                .ReturnsAsync((Tarea?)null);

            var resultado = await _servicio.GetByIdAsync(99);

            Assert.Null(resultado);
        }

        // TEST 3: GetByIdAsync devuelve la tarea si existe
        [Fact]
        public async Task GetByIdAsync_DebeDevolver_Tarea_SiExiste()
        {
            var tarea = new Tarea { Id = 1, Titulo = "Tarea existente", UsuarioId = 1 };

            _repositorioMock
                .Setup(r => r.GetByIdAsync(1))
                .ReturnsAsync(tarea);

            var resultado = await _servicio.GetByIdAsync(1);

            Assert.NotNull(resultado);
            Assert.Equal(1, resultado.Id);
            Assert.Equal("Tarea existente", resultado.Titulo);
        }

        // TEST 4: DeleteAsync devuelve true si la tarea existe
        [Fact]
        public async Task DeleteAsync_DebeDevolver_True_SiExiste()
        {
            _repositorioMock
                .Setup(r => r.DeleteAsync(1))
                .ReturnsAsync(true);

            var resultado = await _servicio.DeleteAsync(1);

            Assert.True(resultado);
        }

        // TEST 5: DeleteAsync devuelve false si la tarea no existe
        [Fact]
        public async Task DeleteAsync_DebeDevolver_False_SiNoExiste()
        {
            _repositorioMock
                .Setup(r => r.DeleteAsync(99))
                .ReturnsAsync(false);

            var resultado = await _servicio.DeleteAsync(99);

            Assert.False(resultado);
        }

        // TEST 6: ListarTareasPaginadasAsync calcula correctamente el total de páginas
        [Fact]
        public async Task ListarPaginadas_DebeCalcular_TotalPaginasCorrectamente()
        {
            // Simulamos 25 tareas con páginas de 10 = 3 páginas
            var tareas = Enumerable.Range(1, 10).Select(i => new Tarea
            {
                Id = i,
                Titulo = $"Tarea {i}",
                UsuarioId = 1
            });

            _repositorioMock
                .Setup(r => r.ObtenerPaginadoAsync(1, 10, 1))
                .ReturnsAsync((tareas, 25));

            var resultado = await _servicio.ListarTareasPaginadasAsync(1, 10, 1);

            Assert.Equal(3, resultado.TotalPaginas);
            Assert.Equal(25, resultado.TotalRegistros);
            Assert.Equal(1, resultado.PaginaActual);
        }

        // TEST 7: UpdateAsync devuelve null si la tarea no existe
        [Fact]
        public async Task UpdateAsync_DebeDevolver_Null_SiNoExiste()
        {
            _repositorioMock
                .Setup(r => r.UpdateAsync(99, It.IsAny<Tarea>()))
                .ReturnsAsync((Tarea?)null);

            var resultado = await _servicio.UpdateAsync(99, new Tarea());

            Assert.Null(resultado);
        }
    }
}