using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        //[Authorize]
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
        public async Task<BBTCResponse<List<EntLibro>>> obtener()
        {
            BBTCResponse<List<EntLibro>> response = new BBTCResponse<List<EntLibro>>();
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

        //[Authorize]
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

        //[Authorize]
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