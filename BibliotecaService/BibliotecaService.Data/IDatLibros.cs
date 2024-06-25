using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Libros;

namespace BibliotecaService.Data
{
    public interface IDatLibros
    {
        Task<BBTCResponse<bool>> Agregar(EntLibro libro);
        Task<BBTCResponse<bool>> Actualizar(EntLibro libro);
        Task<BBTCResponse<bool>> Eliminar(Guid uIdLibro);
        Task<BBTCResponse<List<EntLibro>>> Obtener();
        Task<BBTCResponse<EntLibro>> Obtener(Guid uIdLibro);
    }
}