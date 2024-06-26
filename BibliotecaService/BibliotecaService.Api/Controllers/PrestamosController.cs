using BibliotecaService.Business.Libros;
using BibliotecaService.Business.Prestamos;
using BibliotecaService.Entities.Libros;
using BibliotecaService.Entities.Prestamos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaService.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class PrestamosController : ControllerBase
    {
        private readonly ILogger<PrestamosController> _logger;
        private readonly IBusPrestamos _busPrestamos;
        private readonly IBusLibros _busLibros;

        public PrestamosController(ILogger<PrestamosController> logger, IBusPrestamos busPrestamos, IBusLibros busLibros)
        {
            _logger = logger;
            _busPrestamos = busPrestamos;
            _busLibros = busLibros;
        }

        [HttpGet("filtrar-usuarios/{query}")]
        public async Task<BBTCResponse<List<EntFilter>>> filtrarUsuarios(string query)
        {
            BBTCResponse<List<EntFilter>> response = new BBTCResponse<List<EntFilter>>();
            try
            {
                return await _busPrestamos.filtarUsuarios(query);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en filtrar usuarios");
                response.SetError(ex.Message);
            }

            return response;
        }

        [HttpGet("libros-disponibles")]
        public async Task<BBTCResponse<List<EntLibro>>> librosDisponibles()
        {
            BBTCResponse<List<EntLibro>> response = new BBTCResponse<List<EntLibro>>();
            try
            {
                response = await _busLibros.librosDisponibles();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en obtener libros disponibles");
                response.SetError(ex.Message);
            }
            return response;
        }

        [HttpPost("prestar")]
        public async Task<BBTCResponse<bool>> prestar([FromBody] List<EntPrestamoRequest> entPrestamo)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                return await _busPrestamos.agregar(entPrestamo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en prestar libros");
                response.SetError(ex.Message);
            }

            return response;
        }

        [HttpGet("prestamos-usuario")]
        public async Task<BBTCResponse<List<EntPrestamoUsuario>>> prestamosUsuario()
        {
            BBTCResponse<List<EntPrestamoUsuario>> response = new BBTCResponse<List<EntPrestamoUsuario>>();
            try
            {
                return await _busPrestamos.obtenerPrestamosUsuario();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener prestamos de usuario");
                response.SetError(ex.Message);
            }

            return response;
        }

        [HttpPost("devolver")]
        public async Task<BBTCResponse<bool>> devolver([FromBody] List<EntDevolver> entDevolver)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                return await _busPrestamos.devolver(entDevolver);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en devolver prestamo");
                response.SetError(ex.Message);
            }

            return response;
        }
    }
}