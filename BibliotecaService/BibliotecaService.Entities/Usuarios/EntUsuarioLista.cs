using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaService.Entities.Usuarios
{
    public class EntUsuarioLista
    {
        public Guid? uIdUsuario { get; set; }
        public string sEmail { get; set; }
        public string? sPassword { get; set; }
        public string sNombre { get; set; }
        public string sApellidos { get; set; }
        public string sRol { get; set; }
    }
}