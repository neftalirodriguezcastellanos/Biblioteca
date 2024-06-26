using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Autenticacion;
using BibliotecaService.Entities.Usuarios;

namespace BibliotecaService.Business.Autenticacion
{
    public interface IBusAutenticacion
    {
        Task<BBTCResponse<EntLoginResponse>> login(EntLoginRequest entLoginRequest);
    }
}