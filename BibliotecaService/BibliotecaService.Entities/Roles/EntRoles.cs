using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Usuarios;

namespace BibliotecaService.Entities.Roles
{
    public class EntRol
    {
        [Key]
        public Guid uIdRoles { get; set; }
        public string sNombre { get; set; }
    }
}