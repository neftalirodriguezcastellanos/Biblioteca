using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Roles;

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