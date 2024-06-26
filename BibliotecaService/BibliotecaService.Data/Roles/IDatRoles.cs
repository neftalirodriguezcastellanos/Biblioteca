using BibliotecaService.Entities.Roles;

namespace BibliotecaService.Data
{
    public interface IDatRoles
    {
        Task<BBTCResponse<List<EntRol>>> Obtener();
    }
}