using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Business.Autenticacion;
using BibliotecaService.Entities.Autenticacion;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaService.Api.Controllers
{
    [ApiController]
    [Route("api")]
    public class AutenticacionController : ControllerBase
    {
        private readonly ILogger<AutenticacionController> _logger;
        private readonly IBusAutenticacion _busAutenticacion;

        public AutenticacionController(ILogger<AutenticacionController> logger, IBusAutenticacion busAutenticacion)
        {
            _logger = logger;
            _busAutenticacion = busAutenticacion;
        }

        [HttpPost("login")]
        public async Task<BBTCResponse<EntLoginResponse>> login([FromBody] EntLoginRequest entLoginRequest)
        {
            BBTCResponse<EntLoginResponse> response = new BBTCResponse<EntLoginResponse>();
            try
            {
                response = await _busAutenticacion.login(entLoginRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError("Error al autenticar usuario");
            }

            return response;
        }
    }
}