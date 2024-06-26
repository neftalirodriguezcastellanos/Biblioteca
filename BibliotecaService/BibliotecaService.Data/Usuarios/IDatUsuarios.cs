using BibliotecaService.Entities.Usuarios;

namespace BibliotecaService.Data
{
    public interface IDatUsuarios
    {
        Task<BBTCResponse<bool>> Agregar(EntUsuario usuario);
        Task<BBTCResponse<bool>> Actualizar(EntUsuarioActualizarDTO usuario);
        Task<BBTCResponse<bool>> Eliminar(Guid uIdUsuario);
        Task<BBTCResponse<List<EntUsuarioDTO>>> Obtener();
        Task<BBTCResponse<EntUsuarioDTO>> Obtener(Guid uIdUsuario);
    }
}