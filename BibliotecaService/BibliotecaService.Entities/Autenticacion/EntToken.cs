namespace BibliotecaService.Entities.Autenticacion
{
    public class EntToken
    {
        public string Token { get; set; }
        public DateTime Expires { get; set; }
    }
}