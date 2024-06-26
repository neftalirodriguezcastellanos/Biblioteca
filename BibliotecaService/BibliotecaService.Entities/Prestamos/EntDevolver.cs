using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibliotecaService.Entities.Prestamos
{
    public class EntDevolver
    {
        public Guid uIdPrestamo { get; set; }
        public DateTime? dtFechaDevolucion { get; set; }
        public bool bActivo { get; set; }
    }
}