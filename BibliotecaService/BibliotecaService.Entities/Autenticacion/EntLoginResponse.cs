using BibliotecaService.Entities.Usuarios;

namespace BibliotecaService.Entities.Autenticacion
{
    public class EntLoginResponse
    {
        public EntUsuarioDTO Usuario { get; set; }
        public EntToken Token { get; set; }
    }
}