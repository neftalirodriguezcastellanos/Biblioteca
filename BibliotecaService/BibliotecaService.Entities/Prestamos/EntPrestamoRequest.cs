using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaService.Entities.Prestamos
{
    public class EntPrestamoRequest
    {
        public Guid uIdLibro { get; set; }
        public Guid uIdUsuario { get; set; }
        public bool bActivo { get; set; }
    }
}