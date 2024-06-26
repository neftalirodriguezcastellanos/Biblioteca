using BibliotecaService.Entities.Libros;

namespace BibliotecaService.Data
{
    public interface IDatLibros
    {
        Task<BBTCResponse<bool>> Agregar(EntLibro libro);
        Task<BBTCResponse<bool>> Actualizar(EntLibro libro);
        Task<BBTCResponse<bool>> Eliminar(Guid uIdLibro);
        Task<BBTCResponse<List<EntLibroListaDTO>>> Obtener();
        Task<BBTCResponse<EntLibro>> Obtener(Guid uIdLibro);
        Task<BBTCResponse<List<EntLibro>>> librosDisponibles();
    }
}