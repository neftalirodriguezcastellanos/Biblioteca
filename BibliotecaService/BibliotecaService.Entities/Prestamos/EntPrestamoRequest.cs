namespace BibliotecaService.Entities.Prestamos
{
    public class EntPrestamoRequest
    {
        public Guid uIdLibro { get; set; }
        public Guid uIdUsuario { get; set; }
        public bool bActivo { get; set; }
    }
}