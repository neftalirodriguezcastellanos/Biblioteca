using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Libros;

namespace BibliotecaService.Business.Libros
{
    public interface IBusLibros
    {
        Task<BBTCResponse<bool>> Agregar(EntLibroDTO libro);
        Task<BBTCResponse<bool>> Actualizar(EntLibroDTO libro);
        Task<BBTCResponse<bool>> Eliminar(Guid uIdLibro);
        Task<BBTCResponse<List<EntLibroListaDTO>>> Obtener();
        Task<BBTCResponse<EntLibro>> Obtener(Guid uIdLibro);
        Task<BBTCResponse<List<EntLibro>>> librosDisponibles();
    }
}