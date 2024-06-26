using BibliotecaService.Business.Libros;
using BibliotecaService.Entities.Libros;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibrosController : ControllerBase
    {
        private readonly ILogger<LibrosController> _logger;
        private readonly IBusLibros _busLibros;

        public LibrosController(ILogger<LibrosController> logger, IBusLibros busLibros)
        {
            _logger = logger;
            _busLibros = busLibros;
        }

        [Authorize]
        [HttpPost]
        public async Task<BBTCResponse<bool>> agregar([FromBody] EntLibroDTO libro)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                response = await _busLibros.Agregar(libro);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }
            return response;
        }

        [HttpGet]
        public async Task<BBTCResponse<List<EntLibroListaDTO>>> obtener()
        {
            BBTCResponse<List<EntLibroListaDTO>> response = new BBTCResponse<List<EntLibroListaDTO>>();
            try
            {
                response = await _busLibros.Obtener();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        [Authorize]
        [HttpPut]
        public async Task<BBTCResponse<bool>> actualizar([FromBody] EntLibroDTO libro)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                response = await _busLibros.Actualizar(libro);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }
            return response;
        }

        [Authorize]
        [HttpDelete("{uIdLibro}")]
        public async Task<BBTCResponse<bool>> eliminar(Guid uIdLibro)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                response = await _busLibros.Eliminar(uIdLibro);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }
    }
}