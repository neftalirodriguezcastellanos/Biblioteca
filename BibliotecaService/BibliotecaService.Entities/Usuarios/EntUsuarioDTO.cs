using BibliotecaService.Entities.Roles;
using System.ComponentModel.DataAnnotations;

namespace BibliotecaService.Entities.Usuarios
{
    public class EntUsuarioDTO
    {
        public Guid? uIdUsuario { get; set; }
        [Required]
        public string sEmail { get; set; }
        public string? sPassword { get; set; }
        [Required]
        public string sNombre { get; set; }
        [Required]
        public string sApellidos { get; set; }
        [Required]
        public Guid uIdRoles { get; set; }
        public EntRol? Roles { get; set; }
    }
}