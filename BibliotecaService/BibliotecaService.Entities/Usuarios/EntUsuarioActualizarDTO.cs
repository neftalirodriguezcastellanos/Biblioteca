using System.ComponentModel.DataAnnotations;

namespace BibliotecaService.Entities.Usuarios
{
    public class EntUsuarioActualizarDTO
    {
        [Required]
        public Guid uIdUsuario { get; set; }
        [Required]
        public string sNombre { get; set; }
        [Required]
        public string sApellidos { get; set; }
        [Required]
        public Guid uIdRoles { get; set; }
    }
}