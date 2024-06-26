using BibliotecaService.Entities.Autenticacion;
using BibliotecaService.Entities.Usuarios;

namespace BibliotecaService.Data
{
    public interface IDatAutenticacion
    {
        Task<BBTCResponse<EntUsuarioDTO>> login(EntLoginRequest entLoginRequest);
    }
}