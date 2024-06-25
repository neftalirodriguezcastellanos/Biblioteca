using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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