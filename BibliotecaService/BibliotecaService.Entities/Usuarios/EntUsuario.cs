using System.ComponentModel.DataAnnotations;

namespace BibliotecaService.Entities.Usuarios
{
    public class EntUsuario
    {
        [Key]
        public Guid uIdUsuario { get; set; }
        public string sEmail { get; set; }
        public string sPassword { get; set; }
        public string sNombre { get; set; }
        public string sApellidos { get; set; }
        public Guid uIdRoles { get; set; }
    }
}