using System.ComponentModel.DataAnnotations;

namespace BibliotecaService.Entities.Libros
{
    public class EntLibro
    {
        [Key]
        public Guid uIdLibro { get; set; }
        public string sCodigo { get; set; }
        public string sTitulo { get; set; }
        public string sAutor { get; set; }
        public string sISBN { get; set; }
        public string sEditorial { get; set; }
        public int iAnio { get; set; }
        public bool bDisponible { get; set; }
    }
}