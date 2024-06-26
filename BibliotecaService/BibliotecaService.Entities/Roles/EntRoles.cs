using System.ComponentModel.DataAnnotations;

namespace BibliotecaService.Entities.Roles
{
    public class EntRol
    {
        [Key]
        public Guid uIdRoles { get; set; }
        public string sNombre { get; set; }
    }
}