using System.ComponentModel.DataAnnotations;

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