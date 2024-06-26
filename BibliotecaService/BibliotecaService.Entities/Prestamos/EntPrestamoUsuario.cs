namespace BibliotecaService.Entities.Prestamos
{
    public class EntPrestamoUsuario
    {
        public Guid uIdPrestamo { get; set; }
        public string sCodigo { get; set; }
        public string sTitulo { get; set; }
        public string sAutor { get; set; }
        public DateTime dtFechaPrestamo { get; set; }
        public DateTime dtFechaExpiracion { get; set; }
        public DateTime? dtFechaDevolucion { get; set; }
        public string sEmail { get; set; }
        public string sNombre { get; set; }


    }
}