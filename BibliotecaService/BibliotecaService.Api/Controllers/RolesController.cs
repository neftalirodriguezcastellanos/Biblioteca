using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Business.Roles;
using BibliotecaService.Entities.Roles;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly ILogger<RolesController> _logger;
        private readonly IBusRoles _busRoles;

        public RolesController(ILogger<RolesController> logger, IBusRoles busRoles)
        {
            _logger = logger;
            _busRoles = busRoles;
        }

        [HttpGet]
        public async Task<BBTCResponse<List<EntRol>>> obtener()
        {
            BBTCResponse<List<EntRol>> response = new BBTCResponse<List<EntRol>>();
            try
            {
                response = await _busRoles.Obtener();
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