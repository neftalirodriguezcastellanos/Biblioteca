using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Roles;

namespace BibliotecaService.Data
{
    public interface IDatRoles
    {
        Task<BBTCResponse<List<EntRol>>> Obtener();
    }
}