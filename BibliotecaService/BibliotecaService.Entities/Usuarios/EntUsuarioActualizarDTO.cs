using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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