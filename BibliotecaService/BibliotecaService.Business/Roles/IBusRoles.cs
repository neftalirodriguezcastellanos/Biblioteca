using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Roles;

namespace BibliotecaService.Business.Roles
{
    public interface IBusRoles
    {
        Task<BBTCResponse<List<EntRol>>> Obtener();
    }
}