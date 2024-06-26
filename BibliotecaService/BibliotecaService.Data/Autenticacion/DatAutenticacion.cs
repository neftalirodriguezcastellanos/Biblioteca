using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Autenticacion;
using BibliotecaService.Entities.Usuarios;
using Microsoft.Extensions.Logging;

namespace BibliotecaService.Data
{
    public class DatAutenticacion : IDatAutenticacion
    {
        private readonly ILogger<DatAutenticacion> _logger;
        private readonly BibliotecaContext _context;

        public DatAutenticacion(ILogger<DatAutenticacion> logger, BibliotecaContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<BBTCResponse<EntUsuarioDTO>> login(EntLoginRequest entLoginRequest)
        {
            BBTCResponse<EntUsuarioDTO> response = new BBTCResponse<EntUsuarioDTO>();
            try
            {
                var usuario = from user in _context.Usuarios
                              join rol in _context.Roles on user.uIdRoles equals rol.uIdRoles
                              where user.sEmail == entLoginRequest.sEmail && user.sPassword == entLoginRequest.sPassword
                              select new EntUsuarioDTO
                              {
                                  uIdUsuario = user.uIdUsuario,
                                  sApellidos = user.sApellidos,
                                  sEmail = user.sEmail,
                                  sNombre = user.sNombre,
                                  uIdRoles = rol.uIdRoles,
                                  Roles = rol
                              };
                if (usuario == null)
                {
                    response.SetError("Verifique sus credenciales");
                }
                else
                {
                    response.SetSuccess(usuario.FirstOrDefault());
                }
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