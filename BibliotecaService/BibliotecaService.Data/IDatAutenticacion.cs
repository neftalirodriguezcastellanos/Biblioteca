using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Autenticacion;
using BibliotecaService.Entities.Usuarios;

namespace BibliotecaService.Data
{
    public interface IDatAutenticacion
    {
        Task<BBTCResponse<EntUsuarioDTO>> login(EntLoginRequest entLoginRequest);
    }
}