using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Data;
using BibliotecaService.Entities.Usuarios;
using Microsoft.Extensions.Logging;

namespace BibliotecaService.Business.Usuarios
{
    public class BusUsuarios : IBusUsuarios
    {
        private readonly ILogger<BusUsuarios> _logger;
        private readonly IDatUsuarios _datUsuarios;

        public BusUsuarios(ILogger<BusUsuarios> logger, IDatUsuarios datUsuarios)
        {
            _logger = logger;
            _datUsuarios = datUsuarios;
        }

        public async Task<BBTCResponse<bool>> Actualizar(EntUsuarioDTO usuario)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                if (string.IsNullOrEmpty(usuario.sNombre))
                {
                    response.SetError("El nombre es requerido");
                    return response;
                }

                if (string.IsNullOrEmpty(usuario.sApellidos))
                {
                    response.SetError("Los apellidos son requeridos");
                    return response;
                }

                var usuarioActualizar = new EntUsuarioActualizarDTO
                {
                    uIdUsuario = (Guid)usuario.uIdUsuario,
                    sNombre = usuario.sNombre,
                    sApellidos = usuario.sApellidos,
                    uIdRoles = usuario.uIdRoles
                };
                response = await _datUsuarios.Actualizar(usuarioActualizar);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                response.SetError(ex.Message);
            }
            return response;
        }

        public async Task<BBTCResponse<bool>> Agregar(EntUsuarioDTO usuario)
        {
            BBTCResponse<bool> response = new BBTCResponse<bool>();
            try
            {
                if (string.IsNullOrEmpty(usuario.sEmail))
                {
                    response.SetError("El email es requerido");
                    return response;
                }

                if (string.IsNullOrEmpty(usuario.sNombre))
                {
                    response.SetError("El nombre es requerido");
                    return response;
                }

                if (string.IsNullOrEmpty(usuario.sApellidos))
                {
                    response.SetError("Los apellidos son requeridos");
                    return response;
                }

                if (string.IsNullOrEmpty(usuario.sPassword))
                {
                    response.SetError("La contraseña es requerida");
                    return response;
                }

                var newUsuario = new EntUsuario
                {
                    uIdUsuario = Guid.NewGuid(),
                    sEmail = usuario.sEmail,
                    sNombre = usuario.sNombre,
                    sApellidos = usuario.sApellidos,
                    sPassword = usuario.sPassword,
                    uIdRoles = usuario.uIdRoles
                };

                response = await _datUsuarios.Agregar(newUsuario);
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
                response = await _datUsuarios.Eliminar(uIdUsuario);
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
                response = await _datUsuarios.Obtener();
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
                response = await _datUsuarios.Obtener(uIdUsuario);
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