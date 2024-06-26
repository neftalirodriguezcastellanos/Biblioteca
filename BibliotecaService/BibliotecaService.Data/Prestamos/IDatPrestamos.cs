using BibliotecaService.Entities.Prestamos;

namespace BibliotecaService.Data
{
    public interface IDatPrestamos
    {
        Task<BBTCResponse<bool>> agregar(EntPrestamo entPrestamo);
        Task<BBTCResponse<bool>> devolver(EntDevolver entDevolver);
        Task<BBTCResponse<List<EntFilter>>> filtarUsuarios(string query);
        Task<BBTCResponse<List<EntPrestamoUsuario>>> obtenerPrestamosUsuario();
    }
}