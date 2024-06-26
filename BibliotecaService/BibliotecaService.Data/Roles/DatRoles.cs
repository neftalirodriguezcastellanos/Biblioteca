using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Roles;
using Microsoft.Extensions.Logging;

namespace BibliotecaService.Data
{
    public class DatRoles : IDatRoles
    {
        private readonly ILogger<DatRoles> _logger;
        private readonly BibliotecaContext _context;

        public DatRoles(ILogger<DatRoles> logger, BibliotecaContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<BBTCResponse<List<EntRol>>> Obtener()
        {
            BBTCResponse<List<EntRol>> response = new BBTCResponse<List<EntRol>>();

            try
            {
                response.SetSuccess(_context.Roles.ToList());
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