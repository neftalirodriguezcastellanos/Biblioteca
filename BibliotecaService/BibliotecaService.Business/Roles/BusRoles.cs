using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Data;
using BibliotecaService.Entities.Roles;
using Microsoft.Extensions.Logging;

namespace BibliotecaService.Business.Roles
{
    public class BusRoles : IBusRoles
    {
        private readonly ILogger<BusRoles> _logger;
        private readonly IDatRoles _datRoles;

        public BusRoles(ILogger<BusRoles> logger, IDatRoles datRoles)
        {
            _logger = logger;
            _datRoles = datRoles;
        }

        public async Task<BBTCResponse<List<EntRol>>> Obtener()
        {
            BBTCResponse<List<EntRol>> response = new BBTCResponse<List<EntRol>>();
            try
            {
                response = await _datRoles.Obtener();
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