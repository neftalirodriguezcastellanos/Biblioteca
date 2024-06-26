using BibliotecaService.Entities.Autenticacion;

namespace BibliotecaService.Business.Autenticacion
{
    public interface IBusAutenticacion
    {
        Task<BBTCResponse<EntLoginResponse>> login(EntLoginRequest entLoginRequest);
    }
}