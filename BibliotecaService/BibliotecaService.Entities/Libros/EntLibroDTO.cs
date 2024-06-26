using System.ComponentModel.DataAnnotations;

namespace BibliotecaService.Entities.Libros
{
    public class EntLibroDTO
    {
        public Guid? uIdLibro { get; set; }
        [Required]
        public string sCodigo { get; set; }
        [Required]
        public string sTitulo { get; set; }
        [Required]
        public string sAutor { get; set; }
        [Required]
        public string sISBN { get; set; }
        [Required]
        public string sEditorial { get; set; }
        [Required]
        public int iAnio { get; set; }
    }
}