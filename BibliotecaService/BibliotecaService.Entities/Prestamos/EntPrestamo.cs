using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BibliotecaService.Entities.Libros;
using BibliotecaService.Entities.Usuarios;

namespace BibliotecaService.Entities.Prestamos
{
    public class EntPrestamo
    {
        [Key]
        public Guid uIdPrestamo { get; set; }
        public Guid uIdLibros { get; set; }
        public Guid uIdUsuarios { get; set; }
        public DateTime dtFechaPrestamo { get; set; }
        public DateTime dtFechaExpiracion { get; set; }
        public DateTime? dtFechaDevolucion { get; set; }
        public bool bActivo { get; set; }
    }
}