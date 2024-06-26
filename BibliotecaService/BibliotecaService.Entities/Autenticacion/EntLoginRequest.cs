using System.ComponentModel.DataAnnotations;

namespace BibliotecaService.Entities.Autenticacion
{
    public class EntLoginRequest
    {
        [Required]
        public string sEmail { get; set; }
        [Required]
        public string sPassword { get; set; }

    }
}