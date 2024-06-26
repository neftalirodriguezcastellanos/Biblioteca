using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Usuarios;

namespace BibliotecaService.Business.Usuarios
{
    public interface IBusUsuarios
    {
        Task<BBTCResponse<bool>> Agregar(EntUsuarioDTO usuario);
        Task<BBTCResponse<bool>> Actualizar(EntUsuarioDTO usuario);
        Task<BBTCResponse<bool>> Eliminar(Guid uIdUsuario);
        Task<BBTCResponse<List<EntUsuarioLista>>> Obtener();
        Task<BBTCResponse<EntUsuarioDTO>> Obtener(Guid uIdUsuario);
    }
}