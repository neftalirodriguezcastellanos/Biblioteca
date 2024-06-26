using BibliotecaService.Entities.Roles;

namespace BibliotecaService.Business.Roles
{
    public interface IBusRoles
    {
        Task<BBTCResponse<List<EntRol>>> Obtener();
    }
}