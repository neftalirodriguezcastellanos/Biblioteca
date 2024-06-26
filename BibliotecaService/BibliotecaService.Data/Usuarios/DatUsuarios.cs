using BibliotecaService.Entities.Usuarios;
using Microsoft.Extensions.Logging;

namespace BibliotecaService.Data
{
    public class DatUsuarios : IDatUsuarios
    {
        private readonly ILogger<DatUsuarios> _logger;
        private readonly BibliotecaContext _context;

        public DatUsuarios(ILogger<DatUsuarios> logger, BibliotecaContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<BBTCResponse<bool>> Actualizar(EntUsuarioActualizarDTO usuario)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                var user = _context.Usuarios.Where(u => u.uIdUsuario == usuario.uIdUsuario).FirstOrDefault();
                if (user != null)
                {
                    _context.Entry(user).CurrentValues.SetValues(usuario);
                    if (await _context.SaveChangesAsync() != 0)
                    {
                        response.SetSuccess(true);
                    }
                    else
                    {
                        response.SetError("No se pudo actualizar el usuario");
                    }
                }
                else
                {
                    response.SetError("Usuario no encontrado");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }
            return response;
        }

        public async Task<BBTCResponse<bool>> Agregar(EntUsuario usuario)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                var userExists = _context.Usuarios.Where(u => u.sEmail == usuario.sEmail).FirstOrDefault();
                if (userExists != null)
                {
                    response.SetError("El email " + usuario.sEmail + " está asociado a otro usuario.");
                    return response;
                }

                _context.Usuarios.Add(usuario);
                if (await _context.SaveChangesAsync() != 0)
                {
                    response.SetSuccess(true);
                }
                else
                {
                    response.SetError("No se pudo agregar el usuario");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }
            return response;
        }

        public async Task<BBTCResponse<bool>> Eliminar(Guid uIdUsuario)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();

            try
            {
                var usuario = _context.Usuarios.Where(u => u.uIdUsuario == uIdUsuario).FirstOrDefault();
                if (usuario != null)
                {
                    _context.Usuarios.Remove(usuario);
                    if (await _context.SaveChangesAsync() != 0)
                    {
                        response.SetSuccess(true);
                    }
                    else
                    {
                        response.SetError("No se pudo eliminar el usuario");
                    }
                }
                else
                {
                    response.SetError("Usuario no encontrado");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }

            return response;
        }

        public async Task<BBTCResponse<List<EntUsuarioDTO>>> Obtener()
        {
            BBTCResponse<List<EntUsuarioDTO>> response = new BBTCResponse<List<EntUsuarioDTO>>();
            try
            {
                var usuarios = from user in _context.Usuarios
                               join rol in _context.Roles on user.uIdRoles equals rol.uIdRoles
                               select new EntUsuarioDTO
                               {
                                   uIdUsuario = user.uIdUsuario,
                                   sApellidos = user.sApellidos,
                                   sPassword = user.sPassword,
                                   sEmail = user.sEmail,
                                   sNombre = user.sNombre,
                                   uIdRoles = rol.uIdRoles,
                                   Roles = rol
                               };
                response.SetSuccess(usuarios.ToList());

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }
            return response;
        }

        public async Task<BBTCResponse<EntUsuarioDTO>> Obtener(Guid uIdUsuario)
        {
            BBTCResponse<EntUsuarioDTO> response = new BBTCResponse<EntUsuarioDTO>();
            try
            {
                var usuario = from user in _context.Usuarios
                              join rol in _context.Roles on user.uIdRoles equals rol.uIdRoles
                              where user.uIdUsuario == uIdUsuario
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
                    response.SetError("Usuario no encontrado");
                }
                else
                {
                    response.SetSuccess(usuario.FirstOrDefault());
                }
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