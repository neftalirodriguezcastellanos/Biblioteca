using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Roles;

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