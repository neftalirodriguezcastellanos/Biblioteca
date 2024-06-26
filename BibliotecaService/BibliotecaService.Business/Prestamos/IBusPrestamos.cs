using BibliotecaService.Entities.Prestamos;

namespace BibliotecaService.Business.Prestamos
{
    public interface IBusPrestamos
    {
        Task<BBTCResponse<bool>> agregar(List<EntPrestamoRequest> entPrestamo);
        Task<BBTCResponse<bool>> devolver(List<EntDevolver> entDevolver);
        Task<BBTCResponse<List<EntFilter>>> filtarUsuarios(string query);
        Task<BBTCResponse<List<EntPrestamoUsuario>>> obtenerPrestamosUsuario();
    }
}