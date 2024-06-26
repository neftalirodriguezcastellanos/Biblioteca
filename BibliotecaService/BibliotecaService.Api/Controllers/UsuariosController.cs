using BibliotecaService.Business.Usuarios;
using BibliotecaService.Entities.Usuarios;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaService.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly ILogger<UsuariosController> _logger;
        private readonly IBusUsuarios _busUsuarios;

        public UsuariosController(ILogger<UsuariosController> logger, IBusUsuarios busUsuarios)
        {
            _logger = logger;
            _busUsuarios = busUsuarios;
        }

        [Authorize]
        [HttpGet]
        public async Task<BBTCResponse<List<EntUsuarioLista>>> obtener()
        {
            BBTCResponse<List<EntUsuarioLista>> response = new BBTCResponse<List<EntUsuarioLista>>();
            try
            {
                response = await _busUsuarios.Obtener();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        [Authorize]
        [HttpGet("{uIdUsuario}")]
        public async Task<BBTCResponse<EntUsuarioDTO>> obtener(Guid uIdUsuario)
        {
            BBTCResponse<EntUsuarioDTO> response = new BBTCResponse<EntUsuarioDTO>();
            try
            {
                response = await _busUsuarios.Obtener(uIdUsuario);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        [HttpPost]
        public async Task<BBTCResponse<bool>> agregar([FromBody] EntUsuarioDTO usuario)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                response = await _busUsuarios.Agregar(usuario);
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
        public async Task<BBTCResponse<bool>> actualizar([FromBody] EntUsuarioDTO usuario)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                response = await _busUsuarios.Actualizar(usuario);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        [Authorize]
        [HttpDelete("{uIdUsuario}")]
        public async Task<BBTCResponse<bool>> eliminar(Guid uIdUsuario)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                response = await _busUsuarios.Eliminar(uIdUsuario);
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